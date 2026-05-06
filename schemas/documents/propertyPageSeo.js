// schemas/property.js

export default {
  name: "propertyPageSeo",
  title: "Property Page Seo",
  type: "document",
  fields: [
    { name: "title",
         type: "string",
         description:"Property Name" },

    { name: "propertyId",
         type: "string", 
         description:"Enter property ID that acutal property id",
         validation: (Rule) => Rule.required(),
 },

    // ✅ SEO FIELD
    {
      name: "seo",
      title: "SEO Settings",
      type: 'seoMetaFields',
    },
     {
      name: 'customScript',
      title: 'Head Script (injected into <head>)',
      type: 'text',
      description: 'For analytics or schema injected in the <head>',
    },
    {
      name: 'bodyEndScript',
      title: 'Body-End Script (injected before </body>)',
      type: 'text',
      description: 'For chat widgets, trackers, or JS to load at end of page',
    },
  ],
};