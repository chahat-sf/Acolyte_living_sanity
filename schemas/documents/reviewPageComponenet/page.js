    /* ================= SECTION 2 ================= */


export default defineType(

    {
      name: "section2",
      title: "Section 2",
      type: "object",
      group: "main",
      fields: [
        { name: "heading", title: "Heading", type: "string" },
        { name: "subheading", title: "Subheading", type: "string" },
        { name: "description", title: "Description", type: "text" },

        {
          name: "cards",
          title: "Cards",
          type: "array",
          of: [

            /* -------- CARD 1 -------- */

            {
              type: "object",
              name: "card1",
              title: "Card 1",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                { name: "subheading", title: "Subheading", type: "string" },

                {
                  name: "smallCards",
                  title: "Small Cards",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        { name: "icon", title: "Icon", type: "image" },
                        { name: "heading", type: "string" },
                        { name: "subheading", type: "string" },
                        { name: "description", type: "text" }
                      ]
                    }
                  ]
                }
              ]
            },

            /* -------- CARD 2 -------- */

            {
              type: "object",
              name: "card2",
              title: "Card 2",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                { name: "subheading", title: "Subheading", type: "string" },

                {
                  name: "smallCards",
                  title: "Small Cards",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        { name: "icon", type: "image" },
                        { name: "heading", type: "string" },
                        { name: "subheading", type: "string" },
                        { name: "description", type: "text" }
                      ]
                    }
                  ]
                }
              ]
            },

            /* -------- CARD 3 -------- */

            {
              type: "object",
              name: "card3",
              title: "Card 3",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                { name: "subheading", title: "Subheading", type: "string" },

                {
                  name: "description",
                  title: "Description",
                    type: 'array',
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
                                 name: 'blogReference',
                                 title: 'blog Reference',
                                 icon: BsQuote,
                                 fields: [
                                   {
                                     name: 'blogItems',
                                     title: 'Select News Items',
                                     type: 'array',
                                     of: [{type: 'reference', to: [{type: 'blog'}]}],
                                     validation: (Rule) => Rule.required().min(1),
                                   },
                                 ],
                                 preview: {
                                   select: {
                                     news: 'blogItems',
                                   },
                                   prepare({news}) {
                                     const count = news?.length || 0
                                     return {
                                       title: count > 0 ? `${count} bloh Selected` : 'No Blog Selected',
                                       subtitle:
                                         count > 0
                                           ? `${count} linked blog item${count > 1 ? 's' : ''}`
                                           : 'Select at least one blog item',
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
                }
              ]
            },
            /* -----------card 4 -------*/
               {
  name: "card4",
  title: "Card 4",
  type: "object",
  description: 'this is for university listing near by',
  group: "main",
  fields: [
    { name: "heading", title: "Heading", type: "string" },
    { name: "subheading", title: "Subheading", type: "string" },

    {
      name: "listItems",
      title: "List Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
             { name: "icon", title: "Icon", type: "image" },
            { name: "heading", type: "string" },
            { name: "subheading", type: "string" },
 {
                      name: "link",
                      title: "Optional Link",
                      type: "object",
                      fields: [
                        {
                          name: "internalLink",
                          title: "Internal Link",
                          type: "reference",
                          to: [{ type: "reviewPage" }]
                        },
                        {
                          name: "externalLink",
                          title: "External Link",
                          type: "url"
                        }
                      ]
                    },
            /* 🔥 Description as List Array */
            {
              name: "description",
              title: "Description List",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "text",
                      title: "Text",
                      type: "text"
                    },
                    {
                      name: "link",
                      title: "Optional Link",
                      type: "object",
                      fields: [
                        {
                          name: "internalLink",
                          title: "Internal Link",
                          type: "reference",
                          to: [{ type: "reviewPage" }]
                        },
                        {
                          name: "externalLink",
                          title: "External Link",
                          type: "url"
                        }
                      ]
                    }
                  ]
                }
              ]
            }

          ]
        }
      ]
    }
  ]
},

          ]
        }
      ]
    },
    /* ================= SECTION 3 ================= */

   {
  name: "section3",
  title: "Section 3",
  type: "object",
  group: "main",
  fields: [
    { name: "heading", title: "Heading", type: "string" },
    { name: "subheading", title: "Subheading", type: "string" },

    {
      name: "listItems",
      title: "List Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", type: "string" },
            { name: "subheading", type: "string" },
 {
                      name: "link",
                      title: "Optional Link",
                      type: "object",
                      fields: [
                        {
                          name: "internalLink",
                          title: "Internal Link",
                          type: "reference",
                          to: [{ type: "reviewPage" }]
                        },
                        {
                          name: "externalLink",
                          title: "External Link",
                          type: "url"
                        }
                      ]
                    },
            /* 🔥 Description as List Array */
            {
              name: "description",
              title: "Description List",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "text",
                      title: "Text",
                      type: "text"
                    },
                    {
                      name: "link",
                      title: "Optional Link",
                      type: "object",
                      fields: [
                        {
                          name: "internalLink",
                          title: "Internal Link",
                          type: "reference",
                          to: [{ type: "reviewPage" }]
                        },
                        {
                          name: "externalLink",
                          title: "External Link",
                          type: "url"
                        }
                      ]
                    }
                  ]
                }
              ]
            }

          ]
        }
      ]
    }
  ]
}
,

/* ================= NEAR BY LOCATION SECTION ================= */

{
  name: "nearByLocationSection",
  title: "Near By Location Section",
  type: "object",
  group: "main",
  fields: [

    {
      name: "heading",
      title: "Main Heading",
      type: "string"
    },

    {
      name: "subheading",
      title: "Subheading",
      type: "string"
    },

    /* -------- Optional CTA -------- */

    {
      name: "cta",
      title: "Optional CTA",
      type: "object",
      fields: [
        {
          name: "buttonText",
          title: "Button Text",
          type: "string"
        },
        {
          name: "internalLink",
          title: "Internal Link",
          type: "reference",
          to: [{ type: "reviewPage" }]
        },
        {
          name: "externalLink",
          title: "External Link",
          type: "url"
        }
      ]
    },

    /* -------- Location Cards -------- */

    {
      name: "cards",
      title: "Location Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [

            {
              name: "image",
              title: "Location Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "alt",
                  title: "Alt Text",
                  type: "string"
                }
              ]
            },

            {
              name: "heading",
              title: "Heading",
              type: "string"
            },

            {
              name: "subheading",
              title: "Subheading",
              type: "string"
            },

            {
              name: "distance",
              title: "Distance (Optional)",
              type: "string",
              description: "Example: 2 km, 5 mins drive"
            },

            {
              name: "description",
              title: "Description",
              type: "text"
            },

            {
              name: "link",
              title: "Optional Card Link",
              type: "object",
              fields: [
                {
                  name: "internalLink",
                  title: "Internal Link",
                  type: "reference",
                  to: [{ type: "reviewPage" }]
                },
                {
                  name: "externalLink",
                  title: "External Link",
                  type: "url"
                }
              ]
            }

          ]
        }
      ]
    }

  ]
})