import Vue from 'vue'
import Vuex from 'vuex'
import { make, set, dispatch } from 'vuex-pathify'
import pathify from 'vuex-pathify'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

pathify.options.mapping = 'standard'
pathify.options.deep = 2

const state = {
  navbar: false,
  locale : null,
  langs: [
    {code :"en", name : "English", flag : "gb"},
    {code :"de", name : "Deutsch", flag : "de"},
    {code :"ru", name : "Русский", flag : "ru"},
    {code :"es", name : "Español", flag : "es"},
    {code :"fr", name : "Français", flag : "fr"},
    {code :"zh", name : "한국어", flag : "cn"},
    {code :"hi", name : "हिन्दी", flag : "in"},
  ],
}

export default new Vuex.Store({
  state,
  mutations: {
    ...make.mutations(state),
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    pathify.plugin,
    createPersistedState({
      paths: ["locale"]
    })
  ],
})
