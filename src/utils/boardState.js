import board from '@/board'

// deconstruct board classes
const { Partition } = board

export default {
    state: {
        partitions: [new Partition()]
    },
    mutations: {},
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
