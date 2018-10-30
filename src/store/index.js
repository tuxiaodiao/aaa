import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import ticket from './modules/ticket'
import statDay from './modules/statDay'
import statSyn from './modules/statSyn'
import statCommon from './modules/statCommon'
import source from './modules/source'
import latiParam from './modules/latiParam'
import analysis from './modules/analysis'
import home from './modules/home'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {

  },
  modules: {
    app,
    user,
    ticket,
    statDay,
    statSyn,
    statCommon,
    source,
    latiParam,
    analysis,
    home
  }
})

export default store
