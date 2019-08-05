module.exports = {
    title: 'WM Docs',
    description: 'Dev onboarding and documentation for The White Mask',
    head: [['script', { src: '/jszip.min.js' }]],
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            {
                text: 'Game',
                items: [
                    { text: 'Home', link: '/overview/' },
                    {
                        text: 'Management',
                        items: [
                            { text: 'Concourse', link: '/concourse/' }
                            // { text: 'Inventory', link: '/inventory/' }
                        ]
                    },
                    {
                        text: 'Hacking',
                        items: [
                            { text: 'Level', link: '/level/' },
                            { text: 'Turns', link: '/turns/' }
                        ]
                    }
                    // {
                    //     text: 'Game-Wide',
                    //     items: [
                    //         {
                    //             text: 'Saving and Loading',
                    //             link: '/saving-and-loading/'
                    //         }
                    //     ]
                    // }
                ]
            },
            {
                text: 'Tools',
                items: [
                    {
                        text: 'Level Builder',
                        link: 'https://white-mask.com/builder/'
                    },
                    {
                        text: 'Level Builder Tutorial',
                        link: '/builder-docs/'
                    },
                    // {
                    //     text: 'Item Builder',
                    //     link: '/item-builder/'
                    // },
                    {
                        text: 'Common Tasks',
                        link: '/common-tasks/'
                    },
                    {
                        text: 'API',
                        link: '/api/'
                    }
                ]
            },
            { text: 'Writing', link: '/writing/' },
            { text: 'Art', link: '/art/' }
        ],
        sidebar: 'auto'
    },
    markdown: {
        toc: { includeLevel: [1, 2, 3] }
    }
}
