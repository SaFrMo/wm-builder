export default class Entity {
    name: string
    id: string
    description: string

    constructor(opts) {
        this.name = opts.name || 'Entity'
        this.id = opts.id || Date.now()
        this.description = opts.description || 'An entity.'
    }
}
