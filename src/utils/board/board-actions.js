import Vue from 'vue'

export default {
    ADD_NEW_BOARD_META: state => {
        state.meta.push({ key: '', val: '', guid: Date.now() })
    },
    UPDATE_BOARD_META: (state, { index, key, val }) => {
        Vue.set(state.meta, index, { key, val, guid: state.meta[index].guid })
    },
    DELETA_BOARD_META: (state, index) => {
        state.meta.splice(index, 1)
    }
}
