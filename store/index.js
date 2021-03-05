export default {
  state: () => ({}),
  actions: {
    nuxtServerInit({ dispatch }, { app }) {
      dispatch('user/setToken', app.$cookies.get('idToken'))
    },
  },
}
