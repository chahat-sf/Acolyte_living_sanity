import { defineType } from "sanity";
import { countryOptions } from "./locations";
import { CitySelect } from "./CitySelect";


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
    }, {
      name: "externelslug",
      title: "externel Slug",
      description: "for listing page url",
      type: "slug",
      options: {
        // source: "reviewId",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: "main",
    },
    {
      name: 'blogCategory',
      title: 'Blog Category',
      type: 'reference',
      to: [{ type: 'blogCategory' }],
      options: {
        disableNew: false,
      },
      group: 'main',
    },
    {
      name: 'countryCode',
      title: 'Country',
      type: 'string',
      options: {
        list: countryOptions,
        layout: 'dropdown',
      },
      group: 'main',
    },
    {
      name: 'cityName',
      title: 'City',
      type: 'string',
      components: {
        input: CitySelect,
      },
      group: 'main',
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

    /* ================= LEGACY: multipleSection (keeps old data intact) ================= */
    {
      name: "multipleSection",
      title: "Multiple Section (Legacy — existing records)",
      type: "array",
      description: "Legacy field — existing filled data lives here. Do not delete. New records use the 9 fixed sections below.",
      group: "main",
      of: [
        /* ---------- section2 ---------- */
        {
          type: "object",
          name: "section2",
          title: "Section 2",
          preview: {
            select: { title: "heading" },
            prepare({ title }) { return { title: title || "Section 2" }; },
          },
          fields: [
            { name: "heading", title: "Heading", type: "string" },
            { name: "subheading", title: "Subheading", type: "string" },
            { name: "review", title: "Review Score", type: "number" },
            { name: "description", title: "Description", type: "textEditor" },
            {
              name: "cards",
              title: "Cards",
              type: "array",
              of: [
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
                            { name: "heading", title: "Heading", type: "string" },
                            { name: "subheading", title: "Subheading", type: "string" },
                            { name: "description", title: "Description", type: "textEditor" },
                          ],
                        },
                      ],
                    },
                  ],
                },
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
                            { name: "icon", title: "Icon", type: "image" },
                            { name: "heading", title: "Heading", type: "string" },
                            { name: "subheading", title: "Subheading", type: "string" },
                            { name: "description", title: "Description", type: "textEditor" },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "object",
                  name: "card3",
                  title: "Card 3",
                  fields: [
                    { name: "icon", title: "Icon", type: "image" },
                    { name: "heading", title: "Heading", type: "string" },
                    { name: "subheading", title: "Subheading", type: "string" },
                    { name: "description", title: "Description", type: "textEditor" },
                  ],
                },
                {
                  type: "object",
                  name: "card4",
                  title: "Card 4",
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
                            { name: "heading", title: "Heading", type: "string" },
                            { name: "subheading", title: "Subheading", type: "string" },
                            {
                              name: "link",
                              title: "Optional Link",
                              type: "object",
                              fields: [
                                { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                                { name: "externalLink", title: "External Link", type: "url" },
                              ],
                            },
                            {
                              name: "description",
                              title: "Description List",
                              type: "array",
                              of: [
                                {
                                  type: "object",
                                  fields: [
                                    { name: "text", title: "Text", type: "textEditor" },
                                    {
                                      name: "link",
                                      title: "Optional Link",
                                      type: "object",
                                      fields: [
                                        { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                                        { name: "externalLink", title: "External Link", type: "url" },
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
                  type: "object",
                  name: "card5",
                  title: "Card 5",
                  fields: [
                    {
                      name: "listItems",
                      title: "List Items",
                      type: "array",
                      of: [
                        {
                          type: "object",
                          fields: [
                            { name: "icon", title: "Icon", type: "image" },
                            { name: "heading", title: "Heading", type: "string" },
                            { name: "subheading", title: "Subheading", type: "string" },
                            { name: "description", title: "Description", type: "textEditor" },
                            {
                              name: "link",
                              title: "Optional Link",
                              type: "object",
                              fields: [
                                { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                                { name: "externalLink", title: "External Link", type: "url" },
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

        /* ---------- bigcardSection ---------- */
        {
          type: "object",
          name: "bigcardSection",
          title: "Big Card Section",
          preview: {
            select: { title: "heading" },
            prepare({ title }) { return { title: title || "Big Card Section" }; },
          },
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
                    { name: "heading", title: "Heading", type: "string" },
                    { name: "subheading", title: "Subheading", type: "string" },
                    {
                      name: "image",
                      title: "Image",
                      type: "image",
                      options: { hotspot: true },
                      fields: [{ name: "alt", title: "Alt Text", type: "string" }],
                    },
                    {
                      name: "link",
                      title: "Optional Link",
                      type: "object",
                      fields: [
                        { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                        { name: "externalLink", title: "External Link", type: "url" },
                      ],
                    },
                    {
                      name: "description",
                      title: "Description List",
                      type: "array",
                      of: [
                        {
                          type: "object",
                          fields: [
                            { name: "text", title: "Text", type: "text" },
                            {
                              name: "link",
                              title: "Optional Link",
                              type: "object",
                              fields: [
                                { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                                { name: "externalLink", title: "External Link", type: "url" },
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

        /* ---------- smallCardSection ---------- */
        {
          type: "object",
          name: "smallCardSection",
          title: "Small Card Section",
          preview: {
            select: { title: "heading" },
            prepare({ title }) { return { title: title || "Small Card Section" }; },
          },
          fields: [
            { name: "heading", title: "Main Heading", type: "string" },
            { name: "subheading", title: "Subheading", type: "string" },
            {
              name: "cta",
              title: "Optional CTA",
              type: "object",
              fields: [
                { name: "buttonText", title: "Button Text", type: "string" },
                { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                { name: "externalLink", title: "External Link", type: "url" },
              ],
            },
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
                      fields: [{ name: "alt", title: "Alt Text", type: "string" }],
                    },
                    { name: "heading", title: "Heading", type: "string" },
                    { name: "subheading", title: "Subheading", type: "string" },
                    { name: "distance", title: "Distance (Optional)", type: "string", description: "Example: 2 km, 5 mins drive" },
                    { name: "description", title: "Description", type: "text" },
                    {
                      name: "link",
                      title: "Optional Card Link",
                      type: "object",
                      fields: [
                        { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                        { name: "externalLink", title: "External Link", type: "url" },
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

    /* ================= 9 FIXED SECTIONS ================= */

    /* ----- 1. Everything you want to know about ----- */
    {
      name: "sec_everythingToKnow",
      title: "Everything you want to know about...",
      type: "object",
      group: "main",
      fields: [
        {
          name: "propertyName",
          title: "Property Name (e.g. The Pavilion)",
          type: "string",
          description: "This text completes the heading: 'Everything you want to know about [property name]'",
        },
        // { name: "subheading", title: "Subheading", type: "string" },
        { name: "review", title: "Review Score", type: "number" },
        { name: "description", title: "Description", type: "textEditor" },
        {
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            /* --- Card 1 --- */
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
                        { name: "heading", title: "Heading", type: "string" },
                        { name: "subheading", title: "Subheading", type: "string" },
                        { name: "description", title: "Description", type: "textEditor" },
                      ],
                    },
                  ],
                },
              ],
            },
            /* --- Card 2 --- */
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
                        { name: "icon", title: "Icon", type: "image" },
                        { name: "heading", title: "Heading", type: "string" },
                        { name: "subheading", title: "Subheading", type: "string" },
                        { name: "description", title: "Description", type: "textEditor" },
                      ],
                    },
                  ],
                },
              ],
            },
            /* --- Card 3 --- */
            {
              type: "object",
              name: "card3",
              title: "Card 3",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                { name: "subheading", title: "Subheading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
              ],
            },
            /* --- Card 4 --- */
            {
              type: "object",
              name: "card4",
              title: "Card 4",
              description: "University listing nearby",
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
                        { name: "heading", title: "Heading", type: "string" },
                        { name: "subheading", title: "Subheading", type: "string" },
                        {
                          name: "link",
                          title: "Optional Link",
                          type: "object",
                          fields: [
                            { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                            { name: "externalLink", title: "External Link", type: "url" },
                          ],
                        },
                        {
                          name: "description",
                          title: "Description List",
                          type: "array",
                          of: [
                            {
                              type: "object",
                              fields: [
                                { name: "text", title: "Text", type: "textEditor" },
                                {
                                  name: "link",
                                  title: "Optional Link",
                                  type: "object",
                                  fields: [
                                    { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                                    { name: "externalLink", title: "External Link", type: "url" },
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
            /* --- Card 5 --- */
            {
              type: "object",
              name: "card5",
              title: "Card 5",
              fields: [
                {
                  name: "listItems",
                  title: "List Items",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        { name: "icon", title: "Icon", type: "image" },
                        { name: "heading", title: "Heading", type: "string" },
                        { name: "subheading", title: "Subheading", type: "string" },
                        { name: "description", title: "Description", type: "textEditor" },
                        {
                          name: "link",
                          title: "Optional Link",
                          type: "object",
                          fields: [
                            { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                            { name: "externalLink", title: "External Link", type: "url" },
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

    /* ----- 2. Immediate fit assessment ----- */
    {
      name: "sec_immediateFitAssessment",
      title: "Immediate fit assessment",
      type: "object",
      group: "main",
      fields: [
        // { name: "subheading", title: "Subheading", type: "string" },
        // { name: "review", title: "Review Score", type: "number" },
        // { name: "description", title: "Description", type: "textEditor" },
        {
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "card1",
              title: "Card 1",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                // { name: "subheading", title: "Subheading", type: "string" },
                { name: "description", title: "Description", type: "textEditor"},
                // {
                //   name: "smallCards",
                //   title: "Small Cards",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         { name: "description", title: "Description", type: "textEditor" },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            {
              type: "object",
              name: "card2",
              title: "Card 2",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                // { name: "subheading", title: "Subheading", type: "string" },
                 { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "smallCards",
                //   title: "Small Cards",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         { name: "description", title: "Description", type: "textEditor" },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            {
              type: "object",
              name: "card3",
              title: "Card 3",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                // { name: "subheading", title: "Subheading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
              ],
            },
            {
              type: "object",
              name: "card4",
              title: "Card 4",
              fields: [
                { name: "heading", title: "Heading", type: "string" },
                // { name: "subheading", title: "Subheading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "listItems",
                //   title: "List Items",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         {
                //           name: "link",
                //           title: "Optional Link",
                //           type: "object",
                //           fields: [
                //             { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                //             { name: "externalLink", title: "External Link", type: "url" },
                //           ],
                //         },
                //         {
                //           name: "description",
                //           title: "Description List",
                //           type: "array",
                //           of: [
                //             {
                //               type: "object",
                //               fields: [
                //                 { name: "text", title: "Text", type: "textEditor" },
                //                 {
                //                   name: "link",
                //                   title: "Optional Link",
                //                   type: "object",
                //                   fields: [
                //                     { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                //                     { name: "externalLink", title: "External Link", type: "url" },
                //                   ],
                //                 },
                //               ],
                //             },
                //           ],
                //         },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
           {
  type: "object",
  name: "card5",
  title: "Card 5",
  fields: [
    { name: "heading", title: "Heading", type: "string" },
    { name: "description", title: "Description", type: "textEditor" },
  ],
},
          ],
        },
      ],
    },

    /* ----- 3. Overview ----- */
    {
      name: "sec_overview",
      title: "Overview",
      type: "object",
      group: "main",
      fields: [
        {
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "card1",
              title: "Card 1",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "smallCards",
                //   title: "Small Cards",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         { name: "description", title: "Description", type: "textEditor" },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            {
              type: "object",
              name: "card2",
              title: "Card 2",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "smallCards",
                //   title: "Small Cards",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         { name: "description", title: "Description", type: "textEditor" },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            {
              type: "object",
              name: "card3",
              title: "Card 3",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                // { name: "subheading", title: "Subheading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
              ],
            },
            {
              type: "object",
              name: "card4",
              title: "Card 4",
              fields: [
                { name: "heading", title: "Heading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "listItems",
                //   title: "List Items",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         {
                //           name: "link",
                //           title: "Optional Link",
                //           type: "object",
                //           fields: [
                //             { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                //             { name: "externalLink", title: "External Link", type: "url" },
                //           ],
                //         },
                //         {
                //           name: "description",
                //           title: "Description List",
                //           type: "array",
                //           of: [
                //             {
                //               type: "object",
                //               fields: [
                //                 { name: "text", title: "Text", type: "textEditor" },
                //                 {
                //                   name: "link",
                //                   title: "Optional Link",
                //                   type: "object",
                //                   fields: [
                //                     { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                //                     { name: "externalLink", title: "External Link", type: "url" },
                //                   ],
                //                 },
                //               ],
                //             },
                //           ],
                //         },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            {
  type: "object",
  name: "card5",
  title: "Card 5",
  fields: [
    { name: "heading", title: "Heading", type: "string" },
    { name: "description", title: "Description", type: "textEditor" },
  ],
},
          ],
        },
      ],
    },

    /* ----- 4. University Commute ----- */
    {
      name: "sec_universityCommute",
      title: "University Commute",
      type: "object",
      group: "main",
      fields: [
        
        {
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "card1",
              title: "Card 1",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "smallCards",
                //   title: "Small Cards",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         { name: "description", title: "Description", type: "textEditor" },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            {
              type: "object",
              name: "card2",
              title: "Card 2",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "smallCards",
                //   title: "Small Cards",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         { name: "description", title: "Description", type: "textEditor" },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            {
              type: "object",
              name: "card3",
              title: "Card 3",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                // { name: "subheading", title: "Subheading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
              ],
            },
            {
              type: "object",
              name: "card4",
              title: "Card 4",
              description: "University listing nearby",
              fields: [
                { name: "heading", title: "Heading", type: "string" },
                // { name: "subheading", title: "Subheading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "listItems",
                //   title: "List Items",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         {
                //           name: "link",
                //           title: "Optional Link",
                //           type: "object",
                //           fields: [
                //             { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                //             { name: "externalLink", title: "External Link", type: "url" },
                //           ],
                //         },
                //         {
                //           name: "description",
                //           title: "Description List",
                //           type: "array",
                //           of: [
                //             {
                //               type: "object",
                //               fields: [
                //                 { name: "text", title: "Text", type: "textEditor" },
                //                 {
                //                   name: "link",
                //                   title: "Optional Link",
                //                   type: "object",
                //                   fields: [
                //                     { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                //                     { name: "externalLink", title: "External Link", type: "url" },
                //                   ],
                //                 },
                //               ],
                //             },
                //           ],
                //         },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            {
  type: "object",
  name: "card5",
  title: "Card 5",
  fields: [
    { name: "heading", title: "Heading", type: "string" },
    { name: "description", title: "Description", type: "textEditor" },
  ],
},
          ],
        },
      ],
    },

    /* ----- 5. Rooms Pricing ----- */
    {
      name: "sec_roomsPricing",
      title: "Rooms Pricing",
      type: "object",
      group: "main",
      fields: [
        {
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "card1",
              title: "Card 1",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "smallCards",
                //   title: "Small Cards",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         { name: "description", title: "Description", type: "textEditor" },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            {
              type: "object",
              name: "card2",
              title: "Card 2",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "smallCards",
                //   title: "Small Cards",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         { name: "description", title: "Description", type: "textEditor" },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            {
              type: "object",
              name: "card3",
              title: "Card 3",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                // { name: "subheading", title: "Subheading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
              ],
            },
            {
              type: "object",
              name: "card4",
              title: "Card 4",
              fields: [
                { name: "heading", title: "Heading", type: "string" },
                // { name: "subheading", title: "Subheading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "listItems",
                //   title: "List Items",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         {
                //           name: "link",
                //           title: "Optional Link",
                //           type: "object",
                //           fields: [
                //             { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                //             { name: "externalLink", title: "External Link", type: "url" },
                //           ],
                //         },
                //         {
                //           name: "description",
                //           title: "Description List",
                //           type: "array",
                //           of: [
                //             {
                //               type: "object",
                //               fields: [
                //                 { name: "text", title: "Text", type: "textEditor" },
                //                 {
                //                   name: "link",
                //                   title: "Optional Link",
                //                   type: "object",
                //                   fields: [
                //                     { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                //                     { name: "externalLink", title: "External Link", type: "url" },
                //                   ],
                //                 },
                //               ],
                //             },
                //           ],
                //         },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            {
  type: "object",
  name: "card5",
  title: "Card 5",
  fields: [
    { name: "heading", title: "Heading", type: "string" },
    { name: "description", title: "Description", type: "textEditor" },
  ],
},
          ],
        },
      ],
    },

    /* ----- 6. Total Cost ----- */
    {
      name: "sec_totalCost",
      title: "Total Cost",
      type: "object",
      group: "main",
      fields: [
        
        {
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "card1",
              title: "Card 1",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
              ],
            },
            {
              type: "object",
              name: "card2",
              title: "Card 2",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "smallCards",
                //   title: "Small Cards",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         { name: "description", title: "Description", type: "textEditor" },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            {
              type: "object",
              name: "card3",
              title: "Card 3",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
              ],
            },
            {
              type: "object",
              name: "card4",
              title: "Card 4",
              fields: [
                { name: "heading", title: "Heading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "listItems",
                //   title: "List Items",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         {
                //           name: "link",
                //           title: "Optional Link",
                //           type: "object",
                //           fields: [
                //             { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                //             { name: "externalLink", title: "External Link", type: "url" },
                //           ],
                //         },
                //         {
                //           name: "description",
                //           title: "Description List",
                //           type: "array",
                //           of: [
                //             {
                //               type: "object",
                //               fields: [
                //                 { name: "text", title: "Text", type: "textEditor" },
                //                 {
                //                   name: "link",
                //                   title: "Optional Link",
                //                   type: "object",
                //                   fields: [
                //                     { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                //                     { name: "externalLink", title: "External Link", type: "url" },
                //                   ],
                //                 },
                //               ],
                //             },
                //           ],
                //         },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            {
  type: "object",
  name: "card5",
  title: "Card 5",
  fields: [
    { name: "heading", title: "Heading", type: "string" },
    { name: "description", title: "Description", type: "textEditor" },
  ],
},
          ],
        },
      ],
    },

    /* ----- 7. Amenities Value ----- */
    {
      name: "sec_amenitiesValue",
      title: "Amenities Value",
      type: "object",
      group: "main",
      fields: [
        {
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "card1",
              title: "Card 1",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "smallCards",
                //   title: "Small Cards",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         { name: "description", title: "Description", type: "textEditor" },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            {
              type: "object",
              name: "card2",
              title: "Card 2",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "smallCards",
                //   title: "Small Cards",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            {
              type: "object",
              name: "card3",
              title: "Card 3",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                // { name: "subheading", title: "Subheading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
              ],
            },
            {
              type: "object",
              name: "card4",
              title: "Card 4",
              fields: [
                { name: "heading", title: "Heading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "listItems",
                //   title: "List Items",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         {
                //           name: "link",
                //           title: "Optional Link",
                //           type: "object",
                //           fields: [
                //             { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                //             { name: "externalLink", title: "External Link", type: "url" },
                //           ],
                //         },
                //         {
                //           name: "description",
                //           title: "Description List",
                //           type: "array",
                //           of: [
                //             {
                //               type: "object",
                //               fields: [
                //                 { name: "text", title: "Text", type: "textEditor" },
                //                 {
                //                   name: "link",
                //                   title: "Optional Link",
                //                   type: "object",
                //                   fields: [
                //                     { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                //                     { name: "externalLink", title: "External Link", type: "url" },
                //                   ],
                //                 },
                //               ],
                //             },
                //           ],
                //         },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
           {
  type: "object",
  name: "card5",
  title: "Card 5",
  fields: [
    { name: "heading", title: "Heading", type: "string" },
    { name: "description", title: "Description", type: "textEditor" },
  ],
},
          ],
        },
      ],
    },

    /* ----- 8. Internet Study Readiness ----- */
    {
      name: "sec_internetStudyReadiness",
      title: "Internet Study Readiness",
      type: "object",
      group: "main",
      fields: [
        {
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "card1",
              title: "Card 1",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "smallCards",
                //   title: "Small Cards",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         { name: "description", title: "Description", type: "textEditor" },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            {
              type: "object",
              name: "card2",
              title: "Card 2",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "smallCards",
                //   title: "Small Cards",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         { name: "description", title: "Description", type: "textEditor" },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            {
              type: "object",
              name: "card3",
              title: "Card 3",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                // { name: "subheading", title: "Subheading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
              ],
            },
            {
              type: "object",
              name: "card4",
              title: "Card 4",
              fields: [
                { name: "heading", title: "Heading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "listItems",
                //   title: "List Items",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         {
                //           name: "link",
                //           title: "Optional Link",
                //           type: "object",
                //           fields: [
                //             { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                //             { name: "externalLink", title: "External Link", type: "url" },
                //           ],
                //         },
                //         {
                //           name: "description",
                //           title: "Description List",
                //           type: "array",
                //           of: [
                //             {
                //               type: "object",
                //               fields: [
                //                 { name: "text", title: "Text", type: "textEditor" },
                //                 {
                //                   name: "link",
                //                   title: "Optional Link",
                //                   type: "object",
                //                   fields: [
                //                     { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                //                     { name: "externalLink", title: "External Link", type: "url" },
                //                   ],
                //                 },
                //               ],
                //             },
                //           ],
                //         },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            {
  type: "object",
  name: "card5",
  title: "Card 5",
  fields: [
    { name: "heading", title: "Heading", type: "string" },
    { name: "description", title: "Description", type: "textEditor" },
  ],
},
          ],
        },
      ],
    },

    /* ----- 9. Safety Night Experience ----- */
    {
      name: "sec_safetyNightExperience",
      title: "Safety Night Experience",
      type: "object",
      group: "main",
      fields: [
        {
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "card1",
              title: "Card 1",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "smallCards",
                //   title: "Small Cards",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         { name: "description", title: "Description", type: "textEditor" },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            {
              type: "object",
              name: "card2",
              title: "Card 2",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "smallCards",
                //   title: "Small Cards",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         { name: "description", title: "Description", type: "textEditor" },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            {
              type: "object",
              name: "card3",
              title: "Card 3",
              fields: [
                { name: "icon", title: "Icon", type: "image" },
                { name: "heading", title: "Heading", type: "string" },
                // { name: "subheading", title: "Subheading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
              ],
            },
            {
              type: "object",
              name: "card4",
              title: "Card 4",
              fields: [
                { name: "heading", title: "Heading", type: "string" },
                // { name: "subheading", title: "Subheading", type: "string" },
                { name: "description", title: "Description", type: "textEditor" },
                // {
                //   name: "listItems",
                //   title: "List Items",
                //   type: "array",
                //   of: [
                //     {
                //       type: "object",
                //       fields: [
                //         { name: "icon", title: "Icon", type: "image" },
                //         { name: "heading", title: "Heading", type: "string" },
                //         { name: "subheading", title: "Subheading", type: "string" },
                //         {
                //           name: "link",
                //           title: "Optional Link",
                //           type: "object",
                //           fields: [
                //             { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                //             { name: "externalLink", title: "External Link", type: "url" },
                //           ],
                //         },
                //         {
                //           name: "description",
                //           title: "Description List",
                //           type: "array",
                //           of: [
                //             {
                //               type: "object",
                //               fields: [
                //                 { name: "text", title: "Text", type: "textEditor" },
                //                 {
                //                   name: "link",
                //                   title: "Optional Link",
                //                   type: "object",
                //                   fields: [
                //                     { name: "internalLink", title: "Internal Link", type: "reference", to: [{ type: "reviewPage" }] },
                //                     { name: "externalLink", title: "External Link", type: "url" },
                //                   ],
                //                 },
                //               ],
                //             },
                //           ],
                //         },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
           {
  type: "object",
  name: "card5",
  title: "Card 5",
  fields: [
    { name: "heading", title: "Heading", type: "string" },
    { name: "description", title: "Description", type: "textEditor" },
  ],
},
          ],
        },
      ],
    },

    // more content text editor
    // {
    //   name: "reviewDetail",
    //   title: "Review Detail",
    //   type: "textEditor",
    //   group: "main",
    // },

    /* ================= FAQ SECTION ================= */
   {
  name: "faq",
  title: "FAQ",
  type: "textEditor",
  description:
    "Paste all FAQs here, including questions and answers. Bold formatting will be preserved if supported by the editor.",
  group: "main",
},
{
  name: "finalVerdict",
  title: "Final Verdict",
  type: "object",
  group: "main",
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "textEditor",
    },
  ],
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
