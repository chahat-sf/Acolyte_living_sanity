import { BsImage } from 'react-icons/bs'
import { defineField, defineType } from 'sanity'

export const BlogPromoBanners = defineType({
  name: 'blogPromoBanners',
  title: 'Blog Promo Banners',
  type: 'document',
  fields: [
    defineField({
      name: 'slides',
      title: 'Banner Slides',
      type: 'array',
      description: 'Drag slides using the handle on the left to set display order.',
      of: [
        {
          type: 'object',
          name: 'promoBannerSlide',
          title: 'Banner Slide',
          icon: BsImage,
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Internal label for Sanity preview only',
            }),
            defineField({
              name: 'desktopImage',
              title: 'Desktop Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'mobileImage',
              title: 'Mobile Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'altText',
              title: 'Alt Text',
              type: 'string',
              description: 'Accessibility text for the banner image',
            }),
            defineField({
              name: 'actionType',
              title: 'Click Action',
              type: 'string',
              options: {
                list: [
                  { title: 'Open lead form', value: 'leadForm' },
                  { title: 'External link', value: 'externalLink' },
                  { title: 'No action', value: 'none' },
                ],
                layout: 'radio',
              },
              initialValue: 'leadForm',
            }),
            defineField({
              name: 'linkUrl',
              title: 'Link URL',
              type: 'url',
              description: 'Required when click action is External link',
              hidden: ({ parent }) => parent?.actionType !== 'externalLink',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  if (context.parent?.actionType === 'externalLink' && !value) {
                    return 'Link URL is required for external link action'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'desktopImage',
              actionType: 'actionType',
              isActive: 'isActive',
            },
            prepare({ title, media, actionType, isActive }) {
              const actionLabels = {
                leadForm: 'Lead form',
                externalLink: 'External link',
                none: 'No action',
              }
              return {
                title: title || 'Banner slide',
                subtitle: `${actionLabels[actionType] || actionType}${isActive === false ? ' (inactive)' : ''}`,
                media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Blog Promo Banners',
      }
    },
  },
})
