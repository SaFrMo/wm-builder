import { buildPick } from '@/utils/shared'

export default class {
    constructor(opts = {}) {
        // build default picker
        const pick = buildPick(opts)

        this.name = pick('name', 'State')
        this.alterations = pick('alterations', [])
    }
}
