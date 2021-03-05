import keyBy from 'lodash/keyBy'

export const state = () => ({
  db: {},
})

export const actions = {
  async list({ commit, getters }) {
    const list = await this.$models.collections.list()
    commit('set', keyBy(list, 'id'))
  },
  async create({ dispatch }, payload) {
    await this.$models.collections.create(payload)
    await dispatch('list')
  },
  async del({ dispatch }, id) {
    await this.$models.collections.del(id)
    await dispatch('list')
  },

  async get({ commit, getters }, id) {
    const item = await this.$models.collections.get(id)
    commit('update', item)
  },
  async addTo({ dispatch }, { collectionId: id, artworkId }) {
    await this.$models.collections.add(id, artworkId)
    await dispatch('get', id)
  },
  async removeFrom({ dispatch }, { collectionId: id, artworkId }) {
    await this.$models.collections.remove(id, artworkId)
    await dispatch('get', id)
  },
}

export const mutations = {
  set: (state, payload) => (state.db = payload),
  update: (state, payload) => (state.db[payload.id] = payload),
}

export const getters = {
  list: (state) => Object.values(state.db),
}
