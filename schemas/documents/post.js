import { defineField, defineType } from 'sanity'

const richTextBlock = {
    type: 'block',
    styles: [],
    lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
    ],
    marks: {
        decorators: [
            { title: 'Bold', value: 'strong' },
        ],
        annotations: [
            {
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                    { name: 'href', type: 'url', title: 'URL' },
                ],
            },
        ],
    },
}

export const Post = defineType({
    name: 'post',
    title: 'Post',
    type: 'document',

    groups: [
        { title: 'Main', name: 'main', default: true },
        { title: 'SEO', name: 'seo' },
    ],

    fields: [
        // ================= SEO =================
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seoMetaFields',
            group: 'seo',
        }),

        defineField({
            name: 'customScript',
            title: 'Head Script',
            type: 'text',
            group: 'seo',
        }),

        defineField({
            name: 'bodyEndScript',
            title: 'Body-End Script',
            type: 'text',
            group: 'seo',
        }),

        // ================= BASIC INFO =================
        defineField({
            name: 'title',
            title: 'Post Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
            group: 'main',
        }),

        defineField({
            name: 'slug',
            title: 'URL Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
            group: 'main',
        }),

        defineField({
            name: 'featuredPost',
            title: 'Featured Post',
            type: 'boolean',
            initialValue: false,
            group: 'main',
        }),

        // ================= MEDIA =================
        defineField({
            name: 'bannerImages',
            title: 'Banner Images (up to 5)',
            type: 'array',
            group: 'main',
            validation: (Rule) => Rule.max(5),
            of: [
                {
                    type: 'object',
                    name: 'bannerImageItem',
                    title: 'Banner Image',
                    fields: [
                        {
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: { hotspot: true },
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                        },
                        {
                            name: 'link',
                            title: 'Tap-through Link (external URL)',
                            type: 'url',
                            description: 'Where tapping/clicking this image should redirect to',
                        },
                    ],
                    preview: {
                        select: {
                            media: 'image',
                            title: 'alt',
                            subtitle: 'link',
                        },
                    },
                },
            ],
        }),

        // ================= PROPERTY HEADER =================
        defineField({
    name: 'propertyHeader',
    title: 'Property Header',
    type: 'object',
    group: 'main',
    fields: [
        { name: 'rating', title: 'Rating (out of 5)', type: 'number' },
        { name: 'reviewCount', title: 'Number of Reviews', type: 'number' },
        { name: 'address', title: 'Full Address', type: 'string' },
        { name: 'distance', title: 'Distance Info', type: 'string' },
        {
            name: 'bookNowLink',
            title: 'Book Now Button Link',
            type: 'url',
            description: 'Book now link for property.',
        },
    ],
}),

        // ================= PROPERTY DESCRIPTION =================
        defineField({
            name: 'propertyDescription',
            title: 'Property Description',
            type: 'array',
            group: 'main',
            of: [richTextBlock],
        }),

        defineField({
            name: 'topStrip',
            title: 'Top Promo Strip',
            type: 'object',
            group: 'main',
            options: { collapsible: true, collapsed: true },
            fields: [
                {
                    name: 'enabled',
                    title: 'Enable strip',
                    type: 'boolean',
                    initialValue: true,
                },
                {
                    name: 'items',
                    title: 'Strip items',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                {
                                    name: 'text',
                                    title: 'Text',
                                    type: 'string',
                                    validation: (Rule) => Rule.required(),
                                },
                                {
                                    name: 'highlight',
                                    title: 'Highlight item',
                                    type: 'boolean',
                                    initialValue: false,
                                },
                            ],
                        },
                    ],
                },
            ],
        }),

        // ================= ABOUT SECTIONS (FIXED CARDS) =================
        defineField({
            name: 'aboutSections',
            title: 'About Section Cards',
            type: 'object',
            group: 'main',
            options: {
                collapsible: false,
            },
            fields: [
                // ---------------- THIS IS FOR ----------------
                {
                    name: 'thisIsFor',
                    title: 'This is for',
                    type: 'object',
                    options: { collapsible: true, collapsed: true },
                    fields: [
                        { name: 'enabled', title: 'Show this section?', type: 'boolean', initialValue: true },
                        { name: 'title', title: 'Custom Title', type: 'string' },
                        {
                            name: 'goodFor',
                            title: 'Book it if you are...',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    name: 'goodForItem',
                                    fields: [
                                        {
                                            name: 'content',
                                            title: 'Content',
                                            type: 'array',
                                            of: [richTextBlock],
                                        },
                                    ],
                                    preview: {
                                        select: { title: 'title', subtitle: 'description' },
                                    },
                                },
                            ],
                        },
                        {
                            name: 'notFor',
                            title: 'Look elsewhere if you are...',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    name: 'notForItem',
                                    fields: [
                                        {
                                            name: 'content',
                                            title: 'Content',
                                            type: 'array',
                                            of: [richTextBlock],
                                        },
                                    ],
                                    preview: {
                                        select: { title: 'title', subtitle: 'description' },
                                    },
                                },
                            ],
                        },
                    ],
                },

                // ---------------- REVIEWS ----------------
                {
                    name: 'reviews',
                    title: 'Reviews',
                    type: 'object',
                    options: { collapsible: true, collapsed: true },
                    fields: [
                        { name: 'enabled', title: 'Show this section?', type: 'boolean', initialValue: true },
                        { name: 'title', title: 'Custom Title', type: 'string' },
                        {
                            name: 'mostPraised',
                            title: '👍 Most Praised (max 3)',
                            type: 'array',
                            of: [{ type: 'string' }],
                            validation: (Rule) => Rule.max(3),
                        },
                        {
                            name: 'mostCriticized',
                            title: '👎 Most Criticized (max 3)',
                            type: 'array',
                            of: [{ type: 'string' }],
                            validation: (Rule) => Rule.max(3),
                        },
                    ],
                },

                // ---------------- NEARBY HOTSPOTS ----------------
                {
                    name: 'nearbyHotspots',
                    title: 'Nearby Hotspots',
                    type: 'object',
                    options: { collapsible: true, collapsed: true },
                    fields: [
                        { name: 'enabled', title: 'Show this section?', type: 'boolean', initialValue: true },
                        { name: 'title', title: 'Custom Title', type: 'string' },
                        {
                            name: 'content',
                            title: 'Content',
                            type: 'array',
                            of: [richTextBlock],
                        },
                    ],
                },

                // ---------------- COMMUTE REALITY ----------------
                {
                    name: 'commuteReality',
                    title: 'Commute Reality',
                    type: 'object',
                    options: { collapsible: true, collapsed: true },
                    fields: [
                        { name: 'enabled', title: 'Show this section?', type: 'boolean', initialValue: true },
                        { name: 'title', title: 'Custom Title', type: 'string' },
                        {
                            name: 'routes',
                            title: 'Commute Routes',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    name: 'route',
                                    title: 'Route',
                                    fields: [
                                        { name: 'campus', title: 'Campus', type: 'string' },
                                        { name: 'time', title: 'Time', type: 'string', description: 'e.g. "~8 min"' },
                                        { name: 'how', title: 'How', type: 'string', description: 'e.g. "Walk via Granary Sq"' },
                                    ],
                                    preview: {
                                        select: { campus: 'campus', time: 'time', how: 'how' },
                                        prepare({ campus, time, how }) {
                                            return { title: `${campus} — ${time}`, subtitle: how }
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            name: 'footnote',
                            title: 'Footnote',
                            type: 'text',
                            rows: 2,
                            description: 'description one liner.',
                        },
                    ],
                },

                // ---------------- FOOD & ESSENTIALS ----------------
                {
                    name: 'foodEssentials',
                    title: 'Foods & Essentials',
                    type: 'object',
                    options: { collapsible: true, collapsed: true },
                    fields: [
                        { name: 'enabled', title: 'Show this section?', type: 'boolean', initialValue: true },
                        { name: 'title', title: 'Custom Title', type: 'string' },
                        {
                            name: 'content',
                            title: 'Content',
                            type: 'array',
                            of: [richTextBlock],
                        },
                    ],
                },

                // ---------------- PAYMENT TERMS ----------------
                {
                    name: 'paymentTerms',
                    title: 'Payment Terms',
                    type: 'object',
                    options: { collapsible: true, collapsed: true },
                    fields: [
                        { name: 'enabled', title: 'Show this section?', type: 'boolean', initialValue: true },
                        { name: 'title', title: 'Custom Title', type: 'string' },
                        {
                            name: 'content',
                            title: 'Content',
                            type: 'array',
                            of: [richTextBlock],
                        },
                    ],
                },

                // ---------------- MOVE-IN GUIDE ----------------
                {
                    name: 'moveInGuide',
                    title: 'Move-in Guide',
                    type: 'object',
                    options: { collapsible: true, collapsed: true },
                    fields: [
                        { name: 'enabled', title: 'Show this section?', type: 'boolean', initialValue: true },
                        { name: 'title', title: 'Custom Title', type: 'string' },
                        {
                            name: 'content',
                            title: 'Content',
                            type: 'array',
                            of: [richTextBlock],
                        },
                    ],
                },

                // ---------------- DOCS & BOOKING ----------------
                {
                    name: 'docsBooking',
                    title: 'Docs & Booking',
                    type: 'object',
                    options: { collapsible: true, collapsed: true },
                    fields: [
                        { name: 'enabled', title: 'Show this section?', type: 'boolean', initialValue: true },
                        { name: 'title', title: 'Custom Title', type: 'string' },
                        {
                            name: 'highlightContent',
                            title: 'Highlight Box Content',
                            type: 'array',
                            description: 'Bulleted points inside the highlighted card',
                            of: [richTextBlock],
                        },
                        {
                            name: 'content',
                            title: 'Content',
                            type: 'array',
                            description: 'Regular paragraphs below the highlight box',
                            of: [richTextBlock],
                        },
                        {
                            name: 'cta',
                            title: 'Call To Action',
                            type: 'object',
                            options: { collapsible: true, collapsed: false },
                            fields: [
                                { name: 'label', title: 'Button Label', type: 'string' },
                                { name: 'link', title: 'Button Link', type: 'string' },
                            ],
                        },
                    ],
                },

                // ---------------- NEARBY UNIVERSITY ----------------
                {
                    name: 'nearbyUniversity',
                    title: 'Nearby University',
                    type: 'object',
                    options: { collapsible: true, collapsed: true },
                    fields: [
                        { name: 'enabled', title: 'Show this section?', type: 'boolean', initialValue: true },
                        { name: 'title', title: 'Custom Title', type: 'string' },
                        {
                            name: 'content',
                            title: 'Content',
                            type: 'array',
                            of: [richTextBlock],
                        },
                    ],
                },

                // ---------------- COMPARE NEARBY ----------------
                {
                    name: 'compareNearby',
                    title: 'Compare Nearby',
                    type: 'object',
                    options: { collapsible: true, collapsed: true },
                    fields: [
                        { name: 'enabled', title: 'Show this section?', type: 'boolean', initialValue: true },
                        { name: 'title', title: 'Custom Title', type: 'string' },
                        {
                            name: 'heading',
                            title: 'Section Heading',
                            type: 'string',
                            description: 'e.g. "Chapter Kings Cross vs. alternatives"',
                        },
                        {
                            name: 'columns',
                            title: 'Table Columns',
                            type: 'array',
                            of: [{ type: 'string' }],
                            description: 'Column headers, e.g. "Chapter KX", "Other Zone 1", "Outer Zone"',
                        },
                        {
                            name: 'rows',
                            title: 'Table Rows',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    name: 'row',
                                    title: 'Row',
                                    fields: [
                                        {
                                            name: 'label',
                                            title: 'Row Label',
                                            type: 'string',
                                            description: 'e.g. "Location", "Room per £", "Cleaning incl."',
                                        },
                                        {
                                            name: 'cells',
                                            title: 'Cell Values (in column order)',
                                            type: 'array',
                                            of: [
                                                {
                                                    type: 'object',
                                                    name: 'cell',
                                                    fields: [
                                                        {
                                                            name: 'value',
                                                            title: 'Value',
                                                            type: 'string',
                                                            description: 'e.g. "Zone 1", "Compact", "Yes"',
                                                        },
                                                        {
                                                            name: 'isBest',
                                                            title: 'Highlight as best? (bold + ★)',
                                                            type: 'boolean',
                                                            initialValue: false,
                                                        },
                                                    ],
                                                    preview: {
                                                        select: { title: 'value', isBest: 'isBest' },
                                                        prepare({ title, isBest }) {
                                                            return { title: isBest ? `${title} ★` : title }
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                    preview: {
                                        select: { title: 'label' },
                                    },
                                },
                            ],
                        },
                        {
                            name: 'footnote',
                            title: 'Footnote',
                            type: 'array',
                            of: [
                                {
                                    type: 'block',
                                    styles: [],
                                    lists: [],
                                    marks: {
                                        decorators: [
                                            { title: 'Bold', value: 'strong' },
                                        ],
                                    },
                                },
                            ],
                        },
                    ],
                },

                // ---------------- MOSTLY ASKED QUESTIONS ----------------
                {
                    name: 'mostlyAskedQuestions',
                    title: 'Mostly Asked Questions',
                    type: 'object',
                    options: { collapsible: true, collapsed: true },
                    fields: [
                        { name: 'enabled', title: 'Show this section?', type: 'boolean', initialValue: true },
                        { name: 'title', title: 'Custom Title', type: 'string' },
                        {
                            name: 'content',
                            title: 'Content',
                            type: 'array',
                            of: [richTextBlock],
                        },
                    ],
                },

                // ---------------- PHOTOS HONESTLY ----------------
                {
                    name: 'photosHonestly',
                    title: 'Photos Honestly',
                    type: 'object',
                    options: { collapsible: true, collapsed: true },
                    fields: [
                        { name: 'enabled', title: 'Show this section?', type: 'boolean', initialValue: true },
                        { name: 'title', title: 'Custom Title', type: 'string' },
                        {
                            name: 'description',
                            title: 'Intro Description',
                            type: 'text',
                            rows: 2,
                            description: 'e.g. "Our own shots, not wide-angle marketing..."',
                        },
                        {
                            name: 'photos',
                            title: 'Photos',
                            type: 'array',
                            validation: (Rule) => Rule.max(3),
                            of: [
                                {
                                    type: 'object',
                                    name: 'photoItem',
                                    title: 'Photo',
                                    fields: [
                                        {
                                            name: 'image',
                                            title: 'Image',
                                            type: 'image',
                                            options: { hotspot: true },
                                            validation: (Rule) => Rule.required(),
                                        },
                                        {
                                            name: 'caption',
                                            title: 'Caption',
                                            type: 'string',
                                            description: 'e.g. "Sky lounge on the 18th floor — city skyline views"',
                                        },
                                    ],
                                    preview: {
                                        select: { title: 'caption', media: 'image' },
                                    },
                                },
                            ],
                        },
                        {
                            name: 'viewAllLink',
                            title: 'View All Photos Link',
                            type: 'object',
                            options: { collapsible: true, collapsed: false },
                            fields: [
                                { name: 'label', title: 'Link Label', type: 'string' },
                                { name: 'href', title: 'Link URL', type: 'url' },
                            ],
                        },
                    ],
                },

                // ---------------- FOR PARENTS ----------------
                {
                    name: 'forParents',
                    title: 'For Parents',
                    type: 'object',
                    options: { collapsible: true, collapsed: true },
                    fields: [
                        { name: 'enabled', title: 'Show this section?', type: 'boolean', initialValue: true },
                        { name: 'title', title: 'Custom Title', type: 'string' },
                        {
                            name: 'content',
                            title: 'Content',
                            type: 'array',
                            of: [richTextBlock],
                        },
                    ],
                },

                // ---------------- QUICK ANSWERS ----------------
                {
                    name: 'quickAnswers',
                    title: 'Quick Answers',
                    type: 'object',
                    options: { collapsible: true, collapsed: true },
                    fields: [
                        { name: 'enabled', title: 'Show this section?', type: 'boolean', initialValue: true },
                        { name: 'title', title: 'Custom Title', type: 'string' },
                        {
                            name: 'items',
                            title: 'Questions',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    name: 'qaItem',
                                    title: 'Q&A',
                                    fields: [
                                        {
                                            name: 'question',
                                            title: 'Question',
                                            type: 'string',
                                            description: 'e.g. "What room types are there?"',
                                        },
                                        {
                                            name: 'answer',
                                            title: 'Answer',
                                            type: 'array',
                                            of: [richTextBlock],
                                        },
                                    ],
                                    preview: {
                                        select: { title: 'question' },
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        }),

        // ================= CONTENT =================
        defineField({
            name: 'content',
            title: 'Main Content',
            type: 'array',
            group: 'main',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        { name: 'alt', title: 'Alt Text', type: 'string' },
                    ],
                },
                {
                    type: 'object',
                    name: 'video',
                    title: 'YouTube Video',
                    fields: [
                        { name: 'url', title: 'YouTube URL', type: 'url' },
                    ],
                },
            ],
        }),

        // ================= META =================
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
            group: 'main',
        }),

        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            group: 'main',
        }), 
    ],
})