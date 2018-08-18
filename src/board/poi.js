class Poi {
    constructor(opts = {}) {
        // Human readable name
        this.name = opts.name || 'Point of Interest'

        // Human readable description
        this.description = opts.description || ''
    }
}

export default [
    new Poi({
        name: 'Empty Space',
        description: 'An empty space. Will not be rendered in-game.'
    }),
    new Poi({
        name: 'Wall',
        description: 'A standard wall.'
    })
]
