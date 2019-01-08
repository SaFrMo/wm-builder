import { createGuid } from './utils'

export default class Entity {
    name: string
    id: string
    description: string

    constructor(opts) {
        this.name = opts.name || 'Entity'
        this.id = opts.id || createGuid()
        this.description = opts.description || 'An entity.'
    }
}
