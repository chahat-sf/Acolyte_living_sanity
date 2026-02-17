import { defineType } from "sanity";


export default defineType({
  name: "reviewPage",
  title: "Review Page",
  type: "document",

  /* ================= GROUPS ================= */

  groups: [
    { name: "main", title: "Main Content", default: true },
    { name: "seo", title: "SEO Settings" },
  ],

  fields: [
    // add a slug genrate and id
    {
      name: "reviewId",
      title: "review page ID",
      type: "string",
      description: "Main heading and id for particular property review",
      group: "main",
    },
    {
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "reviewId",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: "main",
    },

    /* ================= SECTION 1 ================= */

    {
      name: "section1",
      title: "Section 1",
      type: "object",
      group: "main",
      fields: [
        { name: "heading", title: "Heading", type: "string" },
        { name: "subheading", title: "Subheading", type: "string" },
        { name: "description", title: "Description", type: "textEditor" },
        { name: "address", title: "Address", type: "string" },

        {
          name: "images",
          title: "Images",
          type: "array",
          of: [
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                },
              ],
            },
          ],
        },

        {
          name: "cta",
          title: "CTA",
          type: "object",
          fields: [
            {
              name: "buttonText",
              title: "Button Text",
              type: "string",
            },
            {
              name: "internalLink",
              title: "Internal Link",
              type: "reference",
              to: [{ type: "blog" }],
            },
            {
              name: "externalLink",
              title: "External Link",
              type: "url",
            },
          ],
          validation: (Rule) =>
            Rule.custom((fields) => {
              if (!fields?.internalLink && !fields?.externalLink) {
                return "Either Internal Link or External Link is required";
              }
              return true;
            }),
        },
      ],
    },

    /* ================= multiple SECTION  ================= */
    {
      name: "multipleSection",
      title: "multiple section (Repeatable)",
      type: "array",
      description: "Optional — fill only when required",
      group: "main",
      of: [
        {
          type: "object",
          name: "section2",
          title: "Section 2",
          fields: [
            { name: "heading", type: "string" },
            { name: "subheading", type: "string" },
            { name: "description", type: "textEditor" },

            {
              name: "cards",
              type: "array",
              of: [
                /* -----------card 1 -------*/

                {
                  type: "object",
                  name: "card1",
                  title: "Card 1",
                  fields: [
                    { name: "icon", type: "image" },
                    { name: "heading", type: "string" },
                    { name: "subheading", type: "string" },
                    {
                      name: "smallCards",
                      type: "array",
                      of: [
                        {
                          type: "object",
                          fields: [
                            { name: "icon", title: "Icon", type: "image" },
                            { name: "heading", type: "string" },
                            { name: "subheading", type: "string" },
                            { name: "description", type: "textEditor" },
                          ],
                        },
                      ],
                    },
                  ],
                },
                /* -----------card 2 -------*/

                {
                  type: "object",
                  name: "card2",
                  title: "Card 2",
                  fields: [
                    { name: "icon", type: "image" },
                    { name: "heading", type: "string" },
                    { name: "subheading", type: "string" },
                    {
                      name: "smallCards",
                      type: "array",
                      of: [
                        {
                          type: "object",
                          fields: [
                            { name: "icon", type: "image" },
                            { name: "heading", type: "string" },
                            { name: "subheading", type: "string" },
                            { name: "description", type: "textEditor" },
                          ],
                        },
                      ],
                    },
                  ],
                },
                /* -----------card 3 -------*/

                {
                  type: "object",
                  name: "card3",
                  title: "Card 3",
                  fields: [
                    { name: "icon", type: "image" },
                    { name: "heading", type: "string" },
                    { name: "subheading", type: "string" },
                    {
                      name: "description",
                      type: "textEditor",
                    },
                  ],
                },
                /* -----------card 4 -------*/
                {
                  name: "card4",
                  title: "Card 4",
                  type: "object",
                  description: "this is for university listing near by",
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
                                  to: [{ type: "reviewPage" }],
                                },
                                {
                                  name: "externalLink",
                                  title: "External Link",
                                  type: "url",
                                },
                              ],
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
                                      type: "textEditor",
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
                                          to: [{ type: "reviewPage" }],
                                        },
                                        {
                                          name: "externalLink",
                                          title: "External Link",
                                          type: "url",
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
                    },
                  ],
                },
                  /* -----------card 5 -------*/
                {
                  name: "card5",
                  title: "Card 5",
                  type: "object",
                  description: "this is for  heading subheading",
                  group: "main",
                  fields: [
                    // { name: "heading", title: "Heading", type: "string" },
                    // { name: "subheading", title: "Subheading", type: "string" },

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
                              name: "description",
                              title: "Description List",
                              type: "textEditor",
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
                                  to: [{ type: "reviewPage" }],
                                },
                                {
                                  name: "externalLink",
                                  title: "External Link",
                                  type: "url",
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
            },
          ],
        },
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
                          to: [{ type: "reviewPage" }],
                        },
                        {
                          name: "externalLink",
                          title: "External Link",
                          type: "url",
                        },
                      ],
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
                              type: "text",
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
                                  to: [{ type: "reviewPage" }],
                                },
                                {
                                  name: "externalLink",
                                  title: "External Link",
                                  type: "url",
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
            },
          ],
        },
        {
          name: "nearByLocationSection",
          title: "Near By Location Section",
          type: "object",
          group: "main",
          fields: [
            {
              name: "heading",
              title: "Main Heading",
              type: "string",
            },

            {
              name: "subheading",
              title: "Subheading",
              type: "string",
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
                  type: "string",
                },
                {
                  name: "internalLink",
                  title: "Internal Link",
                  type: "reference",
                  to: [{ type: "reviewPage" }],
                },
                {
                  name: "externalLink",
                  title: "External Link",
                  type: "url",
                },
              ],
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
                          type: "string",
                        },
                      ],
                    },

                    {
                      name: "heading",
                      title: "Heading",
                      type: "string",
                    },

                    {
                      name: "subheading",
                      title: "Subheading",
                      type: "string",
                    },

                    {
                      name: "distance",
                      title: "Distance (Optional)",
                      type: "string",
                      description: "Example: 2 km, 5 mins drive",
                    },

                    {
                      name: "description",
                      title: "Description",
                      type: "text",
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
                          to: [{ type: "reviewPage" }],
                        },
                        {
                          name: "externalLink",
                          title: "External Link",
                          type: "url",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "othersectioin",
          title: "other Section",
          type: "object",
          group: "main",
          fields: [
            {
              name: "heading",
              title: "Main Heading",
              type: "string",
            },

            {
              name: "subheading",
              title: "Subheading",
              type: "string",
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
                  type: "string",
                },
                {
                  name: "internalLink",
                  title: "Internal Link",
                  type: "reference",
                  to: [{ type: "reviewPage" }],
                },
                {
                  name: "externalLink",
                  title: "External Link",
                  type: "url",
                },
              ],
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
                    // {
                    //   name: "image",
                    //   title: "Location Image",
                    //   type: "image",
                    //   options: { hotspot: true },
                    //   fields: [
                    //     {
                    //       name: "alt",
                    //       title: "Alt Text",
                    //       type: "string"
                    //     }
                    //   ]
                    // },

                    {
                      name: "heading",
                      title: "Heading",
                      type: "string",
                    },

                    {
                      name: "subheading",
                      title: "Subheading",
                      type: "string",
                    },

                    {
                      name: "distance",
                      title: "Distance (Optional)",
                      type: "string",
                      description: "Example: 2 km, 5 mins drive",
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
                          to: [{ type: "reviewPage" }],
                        },
                        {
                          name: "externalLink",
                          title: "External Link",
                          type: "url",
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
    },

    // more content text editor
    {
      name: "reviewDetail",
      title: "Review Detail",
      type: "textEditor",
      group: "main",
    },

    /* ================= SEO SECTION ================= */

    {
      name: "seo",
      title: "SEO Settings",
      type: "object",
      group: "seo",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          validation: (Rule) =>
            Rule.max(60).warning("Recommended max 60 characters"),
        },

        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          validation: (Rule) =>
            Rule.max(160).warning("Recommended max 160 characters"),
        },

        {
          name: "keywords",
          title: "SEO Keywords",
          type: "array",
          of: [{ type: "string" }],
        },

        {
          name: "metaImage",
          title: "Meta Image (Open Graph)",
          type: "image",
          options: { hotspot: true },
        },

        {
          name: "noIndex",
          title: "No Index",
          type: "boolean",
          description:
            "Enable to prevent search engines from indexing this page",
        },
      ],
    },
     {
      name: 'customScript',
      title: 'Head Script (injected into <head>)',
      type: 'text',
      description: 'For analytics or schema injected in the <head>',
      group: 'seo',
    },
    {
      name: 'bodyEndScript',
      title: 'Body-End Script (injected before </body>)',
      type: 'text',
      description: 'For chat widgets, trackers, or JS to load at end of page',
      group: 'seo',
    },
  ],
});
