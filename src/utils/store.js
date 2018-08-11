import Vue from 'vue'
import Vuex from 'vuex'
import boardState from './boardState'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        boardState
    },
    state: {
        // board builder meta
        bottomLeft: { x: -5, y: -5 },
        topRight: { x: 3, y: 3 },
        selectedPartitionIndex: -1,
        xLines: 5,
        yLines: 5
    },
    mutations: {
        CHANGE_BOTTOM_LEFT_BY: (state, payload) => {
            state.bottomLeft.x += payload[0]
            state.bottomLeft.y += payload[1]
            state.topRight.x += payload[0]
            state.topRight.y += payload[1]
        },
        SELECT_PARTITION: (state, payload) => {
            state.selectedPartitionIndex = payload
        }
    },
    getters: {
        board: state => state.boardState
    }
})
