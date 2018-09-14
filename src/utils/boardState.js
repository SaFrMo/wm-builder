import board from '@/board'
import { clamp } from '@/utils/shared'
import {
    mutations as partitionMutations,
    actions as partitionActions
} from '@/utils/board/partition-actions'
import poiActions from '@/utils/board/poi-actions'

// deconstruct board classes
const { Partition, BoardState } = board

export default {
    state: {
        // this is the content that will be imported and exported in the level editor and in-game!
        partitions: [new Partition({ height: 4, width: 4 })],
        pois: [],

        states: [new BoardState({ name: 'Default' })],

        // board meta info
        name: 'Board',
        guid: Date.now(),

        version: '1.0'
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

        // POIs
        ...poiActions
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
