module.exports = {
    title: 'WM Docs',
    description: 'Dev onboarding and documentation for The White Mask',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            {
                text: 'Overviews',
                items: [
                    { text: 'Home', link: '/overview/' },
                    {
                        text: 'Management',
                        items: [
                            { text: 'Home Base', link: '/home-base/' },
                            { text: 'Inventory', link: '/inventory/' }
                        ]
                    },
                    {
                        text: 'Hacking',
                        items: [
                            { text: 'Level', link: '/level/' },
                            { text: 'Entities', link: '/entities/' },
                            { text: 'Turns', link: '/turns/' }
                        ]
                    },
                    {
                        text: 'Tutorials',
                        items: [
                            {
                                text: 'Building Levels',
                                link: '/building-levels/'
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Common Tasks',
                link: '/common-tasks/'
            },
            {
                text: 'API',
                link: '/api/'
            },
            { text: 'Level Builder', link: 'https://white-mask.com/builder/' }
        ],
        sidebar: 'auto'
    },
    markdown: {
        toc: { includeLevel: [1, 2, 3] }
    }
}
