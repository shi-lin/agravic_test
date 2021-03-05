import decode from 'jwt-decode'
import keyBy from 'lodash/keyBy'
import { init } from '~/plugins/models/users'

export const state = () => ({
  id: '',
  profile: init(),
  artworks: {},
  series: {},
})

export const actions = {
  signOut() {
    this.$fireAuth.signOut()
  },
  setToken({ dispatch, commit }, idToken) {
    try {
      commit('setState', { id: decode(idToken).user_id })
    } catch (err) {
      dispatch('clear')
    }
  },
  async setAuth({ dispatch, commit }, { authUser }) {
    try {
      commit('setState', { id: authUser.uid })
      const token = await this.$fireAuth.currentUser.getIdToken()
      this.$cookies.set('idToken', token)
    } catch (err) {
      dispatch('clear')
    }
  },
  async get({ dispatch, getters, commit }) {
    const profile = await this.$models.users.get()
    commit('setState', { profile })
  },
  async update({ getters, commit }, profile) {
    const update = this.$utils.diff(profile, getters.profile)
    await this.$models.users.update(update)
    commit('setState', { profile })
  },

  async getArtworks({ commit, getters }) {
    const list = await this.$models.artworks.list({ 'user.id': getters.id })
    commit('setState', { artworks: keyBy(list, 'id') })
  },
  async getArtwork({ commit, getters }, id) {
    const item = await this.$models.artworks.get(id)
    const artworks = { ...getters.artworks, [id]: item }
    commit('setState', { artworks })
  },
  async updateArtwork({ commit, getters }, payload) {
    await this.$models.artworks.update(payload.id, payload)
    const artworks = { ...getters.artworks, [payload.id]: payload }
    commit('setState', { artworks })
  },

  async getSeriesList({ commit, getters }) {
    const list = await this.$models.series.list({ 'user.id': getters.id })
    commit('setState', { series: keyBy(list, 'id') })
  },
  async getSeries({ commit, getters }, id) {
    const item = await this.$models.series.get(id)
    const series = { ...getters.series, [id]: item }
    commit('setState', { series })
  },
  async updateSeries({ commit, getters }, payload) {
    await this.$models.series.update(payload.id, payload)
    const series = { ...getters.series, [payload.id]: payload }
    commit('setState', { series })
  },

  async follow({ dispatch }, id) {
    await this.$models.users.follow(id)
    await dispatch('get')
  },
  async unfollow({ dispatch }, id) {
    await this.$models.users.unfollow(id)
    await dispatch('get')
  },

  clear({ commit }) {
    commit('setState', state())
    this.$cookies.remove('idToken')
  },
}

export const mutations = {
  setState: (state, payload) => Object.assign(state, payload),
}

export const getters = {
  id: (state) => state.id,
  profile: (state) => state.profile,
  artworks: (state) => state.artworks,
  series: (state) => state.series,
}
