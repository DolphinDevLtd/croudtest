export const state = () => ({
  users: [],
  user: []
})

export const getters = {
  userExist: (state) => {
    return state.user.length > 0
  }
}

export const mutations = {
  setUsers(state, payload) {
    state.users = payload
  },
  setUser(state, payload) {
    state.user = payload
  },
  updateUser(state, payload) {
    state.user[0].name = payload.name
    state.user[0].email = payload.email
    state.user[0].company.name = payload.company.name
  }
}
export const actions = {
  allUsers({ commit }) {
    this.$axios.get('/users/')
      .then((response) => {
        commit('setUsers', response.data)
      }).catch((err) => {
        console.log(err)
      })
  },
  async getUser({ commit }, payload) {
    await this.$axios.get(`/users?id=${payload}`)
      .then((response) => {
        commit('setUser', response.data)
      }).catch((err) => {
        console.log(err)
      })
  },
  updateUser({ commit }, payload) {
    this.$axios.put(`/users/${payload.id}`,
      [{
        name: payload.name,
        email: payload.email,
        company: {
          name: payload.company
        }
      }])
      .then((response) => {
        commit('updateUser', payload)
      }).catch((err) => {
        console.log(err)
      })
  }
}
