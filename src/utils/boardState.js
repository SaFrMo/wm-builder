import board from '@/board'
import { clamp } from '@/utils/shared'
import {
    mutations as partitionMutations,
    actions as partitionActions
} from '@/utils/board/partition-actions'
import entityActions from '@/utils/board/entity-actions'
import sequenceActions from '@/utils/board/sequence-actions'
import boardActions from '@/utils/board/board-actions'
import * as goalActions from '@/utils/board/goal-actions'

// deconstruct board classes
const { Partition, BoardState } = board

// default state for resetting
const defaultState = {
    partitions: [new Partition({ height: 4, width: 4 })],
    entities: [],
    states: [new BoardState({ name: 'Default' })],
    sequences: [],
    goals: [],

    // board meta info
    name: 'Board',
    guid: Date.now().toString(),

    // should be in { key, value } format for each value in array
    meta: [],

    version: '1.1.01'
}

export default {
    // this exports directly to the Level class in-game
    state: {
        partitions: [new Partition({ height: 4, width: 4 })],
        entities: [],
        states: [new BoardState({ name: 'Default' })],
        sequences: [],
        goals: [],

        // board meta info
        name: 'Board',
        guid: Date.now().toString(),

        // should be in { key, value } format for each value in array
        meta: [],

        version: '1.1.0'
    },
    mutations: {
        // reset
        RESET_BOARD: state => {
            Object.keys(defaultState).forEach(key => {
                state[key] = defaultState[key]
            })

            state.guid = Date.now().toString()
            localStorage.setItem('force-load', state.guid)
        },

        // save/load
        LOAD_LEVEL(state, payload) {
            const parsed = JSON.parse(payload)
            if (!parsed) return
            Object.keys(parsed).map(key => {
                state[key] = parsed[key]
            })

            // turn partition data into full Partition instance
            const builtPartitions = state.partitions.map(partition => {
                return new Partition(partition)
            })
            state.partitions = builtPartitions

            // refresh partition HPs
            state.partitions.forEach(p => p.refreshHps())

            // save that this is our go-to level
            localStorage.setItem('force-load', parsed.guid)
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
            const id = state.states[payload].id

            state.states.splice(payload, 1)

            // delete from all sequence entries
            state.sequences = state.sequences.map(sequence => {
                sequence.boardStateIds = sequence.boardStateIds.filter(
                    step => step.id != id
                )
                return sequence
            })
        },

        // partitions
        ...partitionMutations,

        // Entities
        ...entityActions,

        // Sequences
        ...sequenceActions,

        // Misc board actions
        ...boardActions,

        // Goals
        ...goalActions.mutations
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
