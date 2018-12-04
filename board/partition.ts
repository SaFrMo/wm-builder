import { buildPick } from './utils'
import Entity from './entity'

export default class Partition {
    width: number
    height: number
    pivot: Vector2
    position: Vector2
    name: string
    guid: string
    entities: Array<Entity>
    rotation: number
    hps: Array<HP>

    constructor(opts = {}) {
        // default picker
        const pick = buildPick(opts)

        this.width = pick('width', 2)
        this.height = pick('height', 2)

        // pivot Cell in x,y coordinates
        this.pivot = pick('pivot', { x: 0, y: 0 })

        // position on game board in x,y coordinates
        this.position = pick('position', { x: 0, y: 0 })

        // human-readable name
        this.name = pick('name', 'Partition')

        // GUID
        this.guid = pick('guid', Date.now())

        // points of interest
        this.entities = []

        // rotation, in degrees
        this.rotation = 0

        // HP levels of Cells
        this.hps = pick(
            'hps',
            Array.apply(null, new Array(this.width * this.height)).map(() => {
                return {
                    current: 10,
                    max: 10,
                    min: -10
                }
            })
        )
    }

    addEntity(payload) {
        this.entities.push(payload)
    }
}
