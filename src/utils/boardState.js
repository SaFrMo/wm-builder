import board from '@/board'
import { clamp } from '@/utils/shared'
import {
    mutations as partitionMutations,
    actions as partitionActions
} from '@/utils/board/partition-actions'
import entityActions from '@/utils/board/entity-actions'

// deconstruct board classes
const { Partition, BoardState } = board

export default {
    // this exports directly to the Level class in-game
    state: {
        partitions: [new Partition({ height: 4, width: 4 })],
        entities: [],
        states: [new BoardState({ name: 'Default' })],
        loops: [],

        // board meta info
        name: 'Board',
        guid: Date.now(),

        // should be in { key, value } format for each value in array
        meta: [],

        version: '1.0.0'
    },
    mutations: {
        // save/load
        LOAD_LEVEL(state, payload) {
            const parsed = JSON.parse(payload)
            Object.keys(parsed).map(key => {
                state[key] = parsed[key]
            })
        },

        // board meta
        SET_BOARD_NAME(state, payload) {
            state.name = payload
        },

        // states
        ADD_BOARD_STATE(state) {
            state.states.push(
                new BoardState({ name: `State ${state.states.length}` })
            )
        },
        DELETE_BOARD_STATE(state, payload) {
            state.states.splice(payload, 1)
        },

        // partitions
        ...partitionMutations,

        // Entities
        ...entityActions
    },
    actions: {
        ...partitionActions
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
