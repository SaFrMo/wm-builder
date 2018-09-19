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
    }
}
