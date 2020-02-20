define([], function() {
    return [
        {
            path: '/',
            component: view('home')
        },
        {
            path: '/blog',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('blog'),
                    name: 'blogList'
                },
                {
                    path: ':id',
                    component: view('blog_details'),
                    name: 'blogDetails',
                    props: true
                }
            ]
        },
        {
            path: '/contact-us',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('contact_us'),
                    name: 'contactUs'
                }
            ]
        },
        {
            path: '/events-and-contests',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('events'),
                    name: 'eventList'
                },
                {
                    path: '/event/:id',
                    component: view('event_details'),
                    name: 'eventDetails',
                    props: true
                },
                {
                    path: '/contest/:id',
                    component: view('contest_details'),
                    name: 'contestDetails',
                    props: true
                }
            ]
        },
        {
            path: '/hours',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('hours'),
                    name: 'hourList',
                }
            ]
        },
        {
            path: '/jobs',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('jobs'),
                    name: 'jobList'
                },
                {
                    path: ':id',
                    component: view('job_details'),
                    name: 'jobDetails',
                    props: true
                }
            ]
        },
        {
            path: '/kids-club',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('kids_club'),
                    name: 'kids-club'
                }
            ]
        },
        {
            path: '/map',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('map'),
                    name: 'map'
                }
            ]
        },
        {
            path: '/newsletter',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('newsletter'),
                    name: 'newsletter',
                    props: true
                }
            ]
        },
        {
            path: '/pages',
            component: view('default'),
            children: [
                {
                    path: ':id',
                    component: view('page_details'),
                    name: 'pageDetails',
                    props: true
                }
            ]
        },
        {
            path: '/promotions',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('promotions'),
                    name: 'promoList'
                },
                {
                    path: ':id',
                    component: view('promotion_details'),
                    name: 'promotionDetails',
                    props: true
                }
            ]
        },
        {
            path: '/search-results',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('search_results'),
                    meta: {
                        pageName: 'Search Results',
                    },
                    name: 'search-results'
                }
            ]
        },
        {
            path: '/stores',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('stores'),
                    name: 'storeList'
                },
                {
                    path: ':id',
                    component: view('store_details'),
                    name: 'storeDetails',
                    props: true
                }
            ]
        },
        {
            path: '/thank-you',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('thank_you'),
                    name: 'thankYou'
                }
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]

    /**
     * Asynchronously load view (lazy-loading)
     * @param {string} name the filename (basename) of the view to load.
     */
    function view(name) {
        return function(resolve) {
            require(['vue!' + name + '.vue'], resolve);
        }
    };
});