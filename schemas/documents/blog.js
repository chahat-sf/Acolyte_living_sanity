import {BiTable} from 'react-icons/bi'
import {BsImage, BsQuote, BsYoutube} from 'react-icons/bs'
import {
  CiTextAlignCenter,
  CiTextAlignJustify,
  CiTextAlignLeft,
  CiTextAlignRight,
} from 'react-icons/ci'
import {FiExternalLink} from 'react-icons/fi'
import {ImImage, ImTextColor} from 'react-icons/im'
import {defineField, defineType} from 'sanity'
import {TextAlign} from './TextAlign'
import {TextColor} from './TextColor'

export const Blog = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  groups: [
    {
      title: 'Main',
      name: 'main',
      default: true,
    },
    {
      title: 'SEO',
      name: 'seo',
    },
  ],
  fields: [
    defineField({
      title: 'SEO',
      name: 'seo',
      type: 'seoMetaFields',
      group: 'seo',
    }),
    defineField({
      name: 'blogHeading',
      title: 'Blog Heading',
      type: 'string',
      description: 'Main heading for the hero section',
      group: 'main',
    }),

    defineField({
      name: 'featuredBlog',
      title: 'Featured Blog ',
      description: 'Main heading for the hero section',
      type: 'boolean',
      default:false,
      group: 'main',
    }),
    defineField({
      name: 'blogCategory',
      title: 'Blog Category',
      type: 'string',
      options: {
        list: [
          {title: 'Accommodation guide blogs', value: 'accommodation-guide-blogs'},
          {title: 'University blogs', value: 'university-blogs'},
          {title: 'Property blogs', value: 'property-blogs'},
          {title: 'Property reviews blog', value: 'property-reviews-blog'},
        ],
        layout: 'dropdown',
      },
      group: 'main',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'blogHeading',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'blogBannerImage',
      title: 'Blog Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'main',
    }),
    defineField({
      name: 'blogBannerImageAlt',
      title: 'Blog Banner Image Alt',
      type: 'string',
      group: 'main',
    }),
    defineField({
      name: 'blogSubHeading',
      title: 'Blog Subheading',
      type: 'string',
      description: 'Subheading for the hero section',
      group: 'main',
    }),
    defineField({
      name: 'blogDetail',
      title: 'Blog Detail',
      type: 'array',
      group: 'main',
      of: [
        {
          type: 'block',
          title: 'Text',

          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
              {
                title: 'Left',
                value: 'left',
                icon: CiTextAlignLeft,
                component: (props) => TextAlign(props),
              },
              {
                title: 'Center',
                value: 'center',
                icon: CiTextAlignCenter,
                component: (props) => TextAlign(props),
              },
              {
                title: 'Justify',
                value: 'justify',
                icon: CiTextAlignJustify,
                component: (props) => TextAlign(props),
              },
              {
                title: 'Right',
                value: 'right',
                icon: CiTextAlignRight,
                component: (props) => TextAlign(props),
              },
            ],
            annotations: [
              {
                name: 'textColor',
                title: 'Text color',
                type: 'textColor',
                icon: ImTextColor,
                component: (props) => TextColor(props),
              },
              {
                name: 'link',
                type: 'object',
                title: 'link',
                fields: [
                  {
                    name: 'Externel_Link',
                    type: 'url',
                    to: [{type: 'url'}],
                  },
                  {
                    name: 'Internal_link',
                    type: 'reference',
                    to: [
                      {type: 'blog'},
                      // other types you may want to link to
                    ],
                  },
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Link URL',
                    validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
                    // hidden:true,
                  },
                ],
              },
            ],
          },
        },

        {
          type: 'object',
          name: 'newsReference',
          title: 'News Reference',
          icon: BsQuote,
          fields: [
            {
              name: 'newsItems',
              title: 'Select News Items',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'news'}]}],
              validation: (Rule) => Rule.required().min(1),
            },
          ],
          preview: {
            select: {
              news: 'newsItems',
            },
            prepare({news}) {
              const count = news?.length || 0
              return {
                title: count > 0 ? `${count} News Selected` : 'No News Selected',
                subtitle:
                  count > 0
                    ? `${count} linked news item${count > 1 ? 's' : ''}`
                    : 'Select at least one news item',
                media: BsQuote,
              }
            },
          },
        },

        {
          type: 'image',
          title: 'Image',
          icon: ImImage,
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Important for SEO and accessibility',
            },
            {
              name: 'customWidth',
              type: 'number',
              title: 'Image Width (%)',
              description: 'Adjust image width as a percentage (e.g., 100 = full width)',
              initialValue: 100,
              validation: (Rule) => Rule.min(10).max(100),
              options: {
                layout: 'slider',
                min: 10,
                max: 100,
                step: 5,
              },
            },
            {
              name: 'alignment',
              type: 'string',
              title: 'Image Alignment',
              initialValue: 'center',
              options: {
                list: [
                  {title: 'Left', value: 'left'},
                  {title: 'Center', value: 'center'},
                  {title: 'Right', value: 'right'},
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
            },
          ],
        },
        {
          type: 'object',
          name: 'table',
          title: 'Table',
          icon: BiTable,
          fields: [
            {
              name: 'rows',
              type: 'array',
              title: 'Rows',
              of: [
                {
                  type: 'object',
                  title: 'Row',
                  fields: [
                    {
                      name: 'cells',
                      type: 'array',
                      title: 'Cells',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            {name: 'text', type: 'string', title: 'Cell Content'},
                            {
                              name: 'bold',
                              type: 'boolean',
                              title: 'Bold Text',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              rows: 'rows',
            },
            prepare({rows}) {
              return {
                title: 'Table',
                subtitle: `${rows?.length || 0} row(s)`,
                media: () => '📊',
              }
            },
          },
        },
        {
          type: 'object',
          name: 'video',
          title: 'YouTube Video',
          icon: BsYoutube,
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'YouTube URL',
              validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
            },
          ],
          preview: {
            select: {
              url: 'url',
            },
            prepare({url}) {
              return {
                title: 'YouTube Video',
                subtitle: url,
                media: () => '🎥', // optional: use an emoji or custom icon
              }
            },
          },
        },
        {
          type: 'object',
          name: 'quote',
          title: 'Quote',
          icon: BsQuote,
          fields: [
            {
              name: 'text',
              type: 'text',
              title: 'Quote Text',
            },
            {
              name: 'author',
              type: 'string',
              title: 'Author',
            },
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'author',
            },
            prepare({title, subtitle}) {
              return {
                title: `${title?.substring(0, 40)}${title?.length > 40 ? '…' : ''}`,
                subtitle: subtitle ? `— ${subtitle}` : 'Quote',
                media: () => '💬',
              }
            },
          },
        },
        {
          type: 'object',
          name: 'externalLink',
          title: 'External Link',
          icon: FiExternalLink,
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Link Label',
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
              validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'External Link',
                subtitle: subtitle,
                media: () => '🔗',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'main',
    }),
    defineField({
      name: 'callToActionbtn',
      title: 'Call To Action Button',
      type: 'object',
      group: 'main',
      fields: [
        {
          name: 'buttonLabel',
          title: 'Button Label',
          type: 'string',
        },
        {
          name: 'buttonPath',
          title: 'Button Path',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'customScript',
      title: 'Head Script (injected into <head>)',
      type: 'text',
      description: 'For analytics or schema injected in the <head>',
      group: 'seo',
    }),
    defineField({
      name: 'bodyEndScript',
      title: 'Body-End Script (injected before </body>)',
      type: 'text',
      description: 'For chat widgets, trackers, or JS to load at end of page',
      group: 'seo',
    }),
    // author name default value acolyte Living 
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      initialValue: 'acolyte Living',
      group: 'main',
    }),
    // update / created date 
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      group: 'main',
    })

  ],
})
