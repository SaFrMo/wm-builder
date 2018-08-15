import Vue from 'vue'
import Vuex from 'vuex'
import boardState from './boardState'
import { clamp } from '@/utils/shared'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        boardState
    },
    state: {
        // board builder meta
        bottomLeft: { x: -2, y: -2 },
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
        CHANGE_GRID_SIZE_BY: (state, payload) => {
            state.bottomLeft.x -= payload
            state.bottomLeft.y -= payload
            state.topRight.x += payload
            state.topRight.y += payload

            // TODO: prevent zooming in past max
            // if (
            //     state.bottomLeft.x >= state.topRight.x ||
            //     state.bottomLeft.y >= state.topRight.y
            // ) {
            //     state.bottomLeft.x = state.topRight.x
            //     state.bottomLeft.y = state.topRight.y
            // }
        },
        SELECT_PARTITION: (state, payload) => {
            state.selectedPartitionIndex = payload
        }
    },
    getters: {
        board: state => state.boardState,
        width: state => {
            return state.topRight.x - state.bottomLeft.x
        },
        height: state => {
            return state.topRight.y - state.bottomLeft.y
        }
    }
})
