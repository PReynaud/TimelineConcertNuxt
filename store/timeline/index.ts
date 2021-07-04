// import { DataMock } from '@/data/data'
import Show from '@/models/Show.model'
import Vue from 'vue'
import Vuex, { ActionTree, GetterTree, MutationTree, StoreOptions } from 'vuex'
import { actionTypes, getterTypes, mutationTypes } from './timeline.types'

Vue.use(Vuex)

interface AppState {
  showList: Show[]
}

const state: AppState = {
  showList: []
}

const getters: GetterTree<AppState, AppState> = {
  [getterTypes.GET_SHOW_LIST]: (state) => state.showList
}

const actions: ActionTree<AppState, AppState> = {
  [actionTypes.FETCH_SHOW_LIST]({ commit }) {
    // const data = DataMock
    // commit(mutationTypes.SET_SHOW_LIST, data.results.map(Show.fromJson))
  }
}

const mutations: MutationTree<AppState> = {
  [mutationTypes.SET_SHOW_LIST]: (state, newShowList: Show[]) => {
    state.showList = newShowList
  }
}

const store: StoreOptions<AppState> = {
  state,
  getters,
  actions,
  mutations
}

export default new Vuex.Store<AppState>(store)
