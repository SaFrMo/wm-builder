module.exports = {
    title: 'WM Docs',
    description: 'Dev onboarding and documentation for The White Mask',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            {
                text: 'Overviews',
                items: [{ text: 'Level', link: '/level/' }]
            },
            {
                text: 'API',
                items: [
                    { text: 'Home', link: '/api/' },
                    { text: 'Board', link: '/api/board/' },
                    { text: 'Turns', link: '/api/turns/' }
                ]
            },
            { text: 'Level Builder', link: 'https://white-mask.com/builder/' }
        ],
        sidebar: 'auto'
    }
}
