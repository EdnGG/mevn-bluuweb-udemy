import Vue from 'vue'
import Vuex from 'vuex'

import router from '../router'

// Decodificar JWT
import decode from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    usuarioDB: '',
  },
  mutations: {
    obtenerUsuario(state, payload) {
      state.token = payload
      if (payload === '') {
        state.usuarioDB = ''
      } else {
        state.usuarioDB = decode(payload)
        // router.push('/notas')
        router.push({ name: 'notas'})
      }
    }
  },
  actions: {
    guardarUsuario({ commit }, payload) {
      localStorage.setItem('token', payload)
      commit('obtenerUsuario', payload)
    },
    // Esra accion no necesita el payload porque va a remover el token y el commit
    // va a ser nulo
    cerrarSesion({ commit }) {
      commit('obtenerUsuario', '')
      localStorage.removeItem('token')
      router.push({name: 'login'})
    },
    leerToken({commit}) {
      const token = localStorage.getItem('token')
      if (token) {
        commit('obtenerUsuario' ,token)
      } else {
        commit('obtenerUsuario' , '')
      }
    }
  },
  modules: {
  },
  getters: {
    estaActivo: state => !!state.token
  }
})
