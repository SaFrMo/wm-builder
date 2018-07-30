import board from '@/board'

// deconstruct board classes
const { Partition } = board

export default {
    state: {
        partitions: [new Partition()]
    },
    mutations: {}
}
