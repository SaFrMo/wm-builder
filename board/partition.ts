import { buildPick, createGuid } from './utils'
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
    // hps: Array<HP>
    deployable: Array<Vector2>

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
        this.guid = pick('guid', createGuid())

        // points of interest
        this.entities = []

        // rotation, in degrees
        this.rotation = 0

        // HP levels of Cells
        // this.hps = pick(
        //     'hps',
        //     Array.apply(null, new Array(this.width * this.height)).map(
        //         (v, i) => {
        //             return {
        //                 current: 10,
        //                 max: 10,
        //                 min: -10,
        //                 x: getX(i, this.width),
        //                 y: getY(i, this.width, this.width * this.height)
        //             }
        //         }
        //     )
        // )

        // Coordinates of deployable Cells
        this.deployable = pick('deployable', [])
    }

    addEntity(payload) {
        this.entities.push(payload)
    }

    refreshHps() {
        // get a list of all viable coordinates
        // const allCellCoordinates = Array.apply(
        //     null,
        //     new Array(this.width * this.height)
        // ).map((v, i) => {
        //     return {
        //         x: getX(i, this.width),
        //         y: getY(i, this.width, this.width * this.height)
        //     }
        // })
        // filter out any unusued values from hps
        // this.hps = this.hps.filter(v => {
        //     return allCellCoordinates.find(
        //         coord => coord.x === v.x && coord.y === v.y
        //     )
        // })
        // add any new cell HPs
        // allCellCoordinates.forEach(coord => {
        //     if (!this.hps.find(v => v.x === coord.x && v.y === coord.y)) {
        //         this.hps.push({
        //             current: 10,
        //             max: 10,
        //             min: -10,
        //             x: coord.x,
        //             y: coord.y
        //         })
        //     }
        // })
    }

    setDeployable(x: number, y: number, canDeploy: boolean) {
        const coordinates = { x, y }
        const index = this.deployable.findIndex(
            v => v.x == coordinates.x && v.y == coordinates.y
        )
        const containsCoordinates = index != -1

        // if we're adding these coordinates
        if (canDeploy && !containsCoordinates) {
            this.deployable.push(coordinates)
        } else if (!canDeploy && containsCoordinates) {
            this.deployable.splice(index, 1)
        }
    }
}
