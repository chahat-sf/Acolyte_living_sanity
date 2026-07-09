export default (S) =>
  S.list()
    .title('Content')
    .items([
      // Manually listed documents
      S.listItem().title('Navbar').child(S.document().schemaType('navbar').documentId('navbar').title('About Page')),

      S.listItem().title('Home').child(S.document().schemaType('home').documentId('home').title('About Page')),

      S.listItem().title('About').child(S.document().schemaType('about').documentId('about').title('About Page')),

      S.divider(),

      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Blog Posts')
                .child(S.documentTypeList('blog').title('Blog Posts')),
              S.listItem()
                .title('Blog Promo Banners')
                .child(
                  S.document()
                    .schemaType('blogPromoBanners')
                    .documentId('blogPromoBanners')
                    .title('Blog Promo Banners'),
                ),
            ]),
        ),

      S.listItem()
        .title('Services')
        .child(
          S.list()
            .title('Services')
            .items([
              S.listItem()
                .title('All Services')
                .id('allServicePages') // ✅ explicitly set
                .child(S.documentTypeList('servicePage').title('All Service Pages')),

              S.listItem()
                .title('By Category')
                .id('serviceByCategory') // ✅ unique ID
                .child(
                  S.documentTypeList('serviceCategory')
                    .title('Service Categories')
                    .child((categoryId) =>
                      S.documentList()
                        .title('Service Pages')
                        .filter('_type == "servicePage" && category._ref == $categoryId')
                        .params({ categoryId }),
                    ),
                ),

              S.listItem()
                .title('Manage Categories')
                .id('manageServiceCategories')
                .child(S.documentTypeList('serviceCategory').title('All Categories')),

              S.listItem()
                .title('Service Page')
                .id('megaMenuServicePage') // ✅ also assign an ID to this
                .child(
                  S.document()
                    .schemaType('services')
                    .documentId('a6d4cbc8-5eb9-40a1-bcf7-20223137d510'),
                ),
            ]),
        ),

      S.listItem()
        .title('Form Submissions')
        .child(
          S.list()
            .title('Submission Data')
            .items([
              S.listItem()
                .title('Contact Form')
                .child(S.documentTypeList('contactForm').title('Leads')),

              S.listItem()
                .title('Newsletter Subscriptions')
                .child(S.documentTypeList('newsletter').title('Newsletter Subscriptions')),
            ]),
        ),

      S.listItem()
        .title('Success Story')
        .child(
          S.list()
            .title('Success Story')
            .items([
              S.listItem()
                .title('Success Stories')
                .child(S.documentTypeList('successStory').title('Success Stories')),
              S.listItem().title('Success Page').id('successStoryPage').child(
                S.document().schemaType('successStoryPage').documentId('successStoryPage'), // singleton ID
              ),
            ]),
        ),

      S.listItem()
        .title('News')
        .child(
          S.list()
            .title('News')
            .items([
              S.listItem()
                .title('All News')
                .id('allNewspage') // ✅ explicitly set
                .child(S.documentTypeList('news').title('All News Pages')),

              S.listItem()
                .title('By Category')
                .id('newsByCategory') // ✅ unique ID
                .child(
                  S.documentTypeList('newsCategory')
                    .title('News Categories')
                    .child((categoryId) =>
                      S.documentList()
                        .title('News Pages')
                        .filter('_type == "news" && category._ref == $categoryId')
                        .params({ categoryId }),
                    ),
                ),

              S.listItem()
                .title('Manage Categories')
                .id('manageNewsCategories')
                .child(S.documentTypeList('newsCategory').title('All Categories')),

              S.listItem()
                .title('News Page')
                .id('megaMenuNewsPage') // ✅ also assign an ID to this
                .child(
                  S.document()
                    .schemaType('news')
                    .documentId('a6d4cbc8-5eb9-40a1-bcf7-20223137d510'),
                ),
            ]),
        ),


      S.divider(),

      S.listItem().title('Footer').child(S.document().schemaType('footer').documentId('footer')),

      // 🔄 Dynamic fallback for all other document types not listed above
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'home',
            'about',
            'contact',
            'blog',
            'blogPromoBanners',
            'servicePage',
            'serviceCategory',
            'navbar',
            'footer',
            'contactForm',
            'newsletter',
            'services',
            'successStory',
            'successStoryPage',
            'news',
            'newsCategory'
          ].includes(listItem.getId()),
      ),
    ])
