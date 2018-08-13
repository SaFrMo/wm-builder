import board from '@/board'

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
