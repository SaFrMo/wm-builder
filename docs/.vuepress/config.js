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
                    { text: 'Building Levels', link: '/building-levels/' },
                    { text: 'Level', link: '/level/' },
                    { text: 'Turns', link: '/turns/' }
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
