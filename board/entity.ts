import { buildPick } from './utils'

export default class Entity {
    name: string
    id: string

    constructor(opts = {}) {
        // build default picker
        const pick = buildPick(opts)

        this.name = pick('name', 'Entity')
        this.id = pick('id', Date.now())
    }
}
