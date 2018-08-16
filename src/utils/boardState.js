import board from '@/board'
import { clamp } from '@/utils/shared'

// deconstruct board classes
const { Partition } = board

export default {
    state: {
        partitions: [new Partition()]
    },
    mutations: {
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
        }
    },
    actions: {
        CREATE_PARTITION({ state, commit, rootState }, payload) {
            // add a new partition
            state.partitions.push(new Partition())
            // tell the root state we're selecting the new partition
            commit('SELECT_PARTITION', state.partitions.length - 1)
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
