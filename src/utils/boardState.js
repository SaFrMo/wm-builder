import board from '@/board'
import { clamp } from '@/utils/shared'

// deconstruct board classes
const { Partition } = board

export default {
    state: {
        // this is the content that will be imported and exported in the level editor and in-game!
        partitions: [new Partition({ height: 4, width: 4 })],
        pois: [],

        // board meta info
        name: 'Board'
    },
    mutations: {
        SET_BOARD_NAME(state, payload) {
            state.name = payload
        },
        SET_PARTITION_NAME(state, { guid, value }) {
            const targetPartition = state.partitions.find(p => p.guid == guid)
            targetPartition.name = value
        },
        CHANGE_PARTITION_SIZE: (state, { guid, direction, delta }) => {
            const partition = state.partitions.find(p => p.guid === guid)

            if (direction == 'right') {
                partition.width += delta
                if (partition.width <= 0) partition.width = 1
            }
            if (direction == 'left') {
                const startingWidth = partition.width
                partition.width += delta
                if (partition.width <= 0) partition.width = 1

                const finalDelta = startingWidth - partition.width
                partition.pivot.x -= finalDelta
            }

            if (direction == 'up') {
                partition.height += delta
                if (partition.height <= 0) partition.height = 1
            }
            if (direction == 'down') {
                const startingHeight = partition.height
                partition.height += delta
                if (partition.height <= 0) partition.height = 1

                const finalDelta = startingHeight - partition.height
                partition.pivot.y -= finalDelta
            }
        },
        CREATE_PARTITION: (state, payload) => {
            // add a new partition
            state.partitions.push(
                new Partition({
                    position: payload
                })
            )
        },
        DELETE_PARTITION: (state, payload) => {
            state.partitions = state.partitions.filter(
                x => x.guid !== payload.guid
            )
        },
        ADD_POI: (state, payload) => {
            state.pois.push(payload)
        },
        REMOVE_POI: (state, { guid, coordinates }) => {
            state.pois = state.pois.filter(poi => {
                return !(
                    poi.guid == guid &&
                    poi.coordinates.x == coordinates.x &&
                    poi.coordinates.y == coordinates.y
                )
            })
        }
    },
    getters: {
        getOccupants: state => coords => {
            const output = []

            // loop through partitions
            state.partitions.forEach(partition => {
                // TODO: Search partitions for cells
            })

            return output
        }
    }
}
