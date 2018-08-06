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
        bottomLeft: { x: 0, y: 0 },
        topRight: { x: 5, y: 5 }
    },
    mutations: {
        CHANGE_BOTTOM_LEFT_BY: (state, payload) => {
            state.bottomLeft.x += payload[0]
            state.bottomLeft.y += payload[1]
            state.topRight.x += payload[0]
            state.topRight.y += payload[1]
        }
    },
    getters: {
        board: state => state.boardState
    }
})
