export default {
    ADD_PLAYER_UNIT: state => {
        state.playerItems.push({})
    },
    SET_PLAYER_UNIT: (state, { index, val }) => {
        state.playerItems[index] = val
    },
    REMOVE_UNIT_AT: (state, index) => {
        state.playerItems.splice(index, 1)
    }
}
