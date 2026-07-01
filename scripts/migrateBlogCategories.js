/* eslint-disable no-console */
const { createClient } = require('@sanity/client')
const path = require('path')
const fs = require('fs')

const DEFAULT_CATEGORIES = [
  { title: 'Property Blog', slug: 'property-blog', order: 1 },
  { title: 'University', slug: 'university', order: 2 },
  { title: 'Information Guide', slug: 'information-guide', order: 3 },
  { title: 'Others', slug: 'others', order: 4 },
]

const LEGACY_STRING_FILTER = `defined(blogCategory) && !defined(blogCategory._ref)`

function loadDotEnv() {
  const envPath = path.join(__dirname, '..', '.env')
  if (!fs.existsSync(envPath)) return

  const lines = fs.readFileSync(envPath, 'utf8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '')
    if (!(key in process.env)) process.env[key] = value
  }
}

function titleFromSlug(slug) {
  return String(slug || '')
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function getSanityEnv() {
  loadDotEnv()

  return {
    projectId:
      process.env.SANITY_STUDIO_PROJECTID ||
      process.env.SANITY_PROJECT_ID ||
      process.env.SANITY_PROJECTID,
    dataset: process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || 'production',
    token:
      process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN || process.env.SANITY_TOKEN,
  }
}

function createStandaloneClient() {
  const { projectId, dataset, token } = getSanityEnv()

  if (!projectId) {
    throw new Error('Missing SANITY_STUDIO_PROJECTID (or SANITY_PROJECT_ID)')
  }

  if (!token) {
    throw new Error(
      'Missing write token. Set SANITY_API_TOKEN in .env or run: npm run migrate:blog-categories',
    )
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-06-01',
    token,
    useCdn: false,
  })
}

async function ensureCategories(client) {
  const existing = await client.fetch(`*[_type == "blogCategory"]{_id, title, "slug": slug.current}`)
  const allBySlug = new Map(existing.map((c) => [String(c.slug || '').toLowerCase(), c]))
  const created = []

  for (const cat of DEFAULT_CATEGORIES) {
    const key = cat.slug.toLowerCase()
    if (allBySlug.has(key)) continue

    const doc = await client.create({
      _type: 'blogCategory',
      title: cat.title,
      slug: { current: cat.slug },
      order: cat.order ?? 0,
      active: true,
    })
    allBySlug.set(key, { _id: doc._id, title: cat.title, slug: cat.slug })
    created.push({ slug: cat.slug, _id: doc._id })
  }

  return { created, allBySlug }
}

async function ensureCategoryForSlug(client, allBySlug, rawSlug) {
  const key = String(rawSlug || '').trim().toLowerCase()
  if (!key) return null

  const existing = allBySlug.get(key)
  if (existing?._id) return existing

  const doc = await client.create({
    _type: 'blogCategory',
    title: titleFromSlug(key) || key,
    slug: { current: key },
    order: 99,
    active: true,
  })

  const created = { _id: doc._id, title: titleFromSlug(key), slug: key }
  allBySlug.set(key, created)
  console.log(`Created category for legacy slug "${key}" -> ${doc._id}`)
  return created
}

async function migrateType(client, type, allBySlug) {
  const docs = await client.fetch(
    `*[_type == $type && ${LEGACY_STRING_FILTER}]{ _id, blogCategory }`,
    { type },
  )

  if (!docs.length) {
    console.log(`No ${type} docs need migration.`)
    return { updated: 0, skipped: 0 }
  }

  let updated = 0
  let skipped = 0

  for (const doc of docs) {
    const raw = String(doc.blogCategory || '').trim()
    const match = await ensureCategoryForSlug(client, allBySlug, raw)

    if (!match?._id) {
      console.warn(`Skipping ${type} ${doc._id}: empty category value`)
      skipped += 1
      continue
    }

    await client
      .patch(doc._id)
      .set({
        blogCategory: {
          _type: 'reference',
          _ref: match._id,
        },
      })
      .commit({ autoGenerateArrayKeys: true })

    updated += 1
  }

  console.log(`Migrated ${updated} ${type} docs. Skipped: ${skipped}.`)
  return { updated, skipped }
}

async function migrate(client) {
  const projectId = client.config().projectId
  const dataset = client.config().dataset
  console.log(`Using projectId=${projectId} dataset=${dataset}`)

  const { created, allBySlug } = await ensureCategories(client)
  if (created.length) console.log('Created default categories:', created)

  const blog = await migrateType(client, 'blog', allBySlug)
  const review = await migrateType(client, 'reviewPage', allBySlug)

  const remaining = await client.fetch(
    `{
      "blogs": count(*[_type == "blog" && ${LEGACY_STRING_FILTER}]),
      "reviews": count(*[_type == "reviewPage" && ${LEGACY_STRING_FILTER}])
    }`,
  )

  console.log('Done:', { blog, review, remaining })
  return { blog, review, remaining }
}

module.exports = async function migrateBlogCategories() {
  loadDotEnv()
  const hasExplicitToken = Boolean(
    process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN || process.env.SANITY_TOKEN,
  )

  let client
  if (require.main === module || hasExplicitToken) {
    client = createStandaloneClient()
  } else {
    const { getCliClient } = require('sanity/cli')
    client = getCliClient({ apiVersion: '2024-06-01' })
  }

  return migrate(client)
}

if (require.main === module) {
  loadDotEnv()
  module
    .exports()
    .catch((err) => {
      console.error('Migration failed:', err.message || err)
      process.exitCode = 1
    })
}
