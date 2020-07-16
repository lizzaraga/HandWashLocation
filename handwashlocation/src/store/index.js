import Vue from 'vue'
import Vuex from 'vuex'
import PositionModule from './modules/position.module'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        position: PositionModule
    }
})