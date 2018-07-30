import Vue from 'vue'
import Vuex from 'vuex'
import boardState from './boardState'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        boardState
    }
})
