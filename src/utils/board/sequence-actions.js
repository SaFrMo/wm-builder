import BoardSequence from '@/board/board-sequence'

export default {
    ADD_BOARD_SEQUENCE: state => {
        state.sequences.push(new BoardSequence())
    },
    REMOVE_SEQUENCE: (state, payload) => {
        state.sequences = state.sequences.filter(x => x.id !== payload)
    },
    CHANGE_SEQUENCE_NAME: (state, { id, value }) => {
        const targetSequence = state.sequences.find(p => p.id == id)
        targetSequence.name = value
    },
    CHANGE_SEQUENCE_PRIORITY: (state, { id, value }) => {
        const targetSequence = state.sequences.find(p => p.id == id)
        targetSequence.priority = value
    },
    ADD_STATE_ID_TO_SEQUENCE: (state, { stateId, sequenceId }) => {
        const targetSequence = state.sequences.find(p => p.id == sequenceId)
        targetSequence.boardStateIds.push(stateId)
        targetSequence.boardStateIds = targetSequence.boardStateIds.filter(
            x => x
        )
    },
    REMOVE_STATE_ID_FROM_SEQUENCE: (state, { sequenceId, index }) => {
        const targetSequence = state.sequences.find(p => p.id == sequenceId)
        targetSequence.boardStateIds.splice(index, 1)
        targetSequence.boardStateIds = targetSequence.boardStateIds.filter(
            x => x
        )
    }
}
