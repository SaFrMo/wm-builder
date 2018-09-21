import { buildPick } from '@/utils/shared'

export default class {
    constructor(opts = {}) {
        // build default picker
        const pick = buildPick(opts)

        // Basic info
        this.name = pick('name', 'State')
        this.id = pick('id', Date.now())

        // { key, value } for each item in array
        this.meta = pick('meta', [])

        // { id, x, y } for each item in array
        this.deltas = pick('deltas', [])

        // image URL - bundle and download in export
        this.image = pick('image', '')
        this.imageWidth = pick('imageWidth', 5)
        this.imageHeight = pick('imageHeight', 5)
    }
}
