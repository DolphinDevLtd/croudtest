import gql from 'graphql-tag'
import apolloClient from '~/plugins/apolloClient'

export const state = () => ({
  users: [],
  user: null
})

export const getters = {
  userExist: (state) => {
    return state.user != null
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
    state.user.name = payload.name
    state.user.email = payload.email
    state.user.company.name = payload.company.name
  }
}
export const actions = {
  allUsers({ commit }) {
    const uQuery = gql`
    query {
      users {
        id
        name
        email
        company {
          name
        }
      }
    }`
    apolloClient.query({ query: uQuery })
      .then((res) => {
        commit('setUsers', res.data.users)
      })
  },
  async getUser({ commit }, payload) {
    const uQuery = gql`
    query {
      user(id: ${payload}) {
        id
        name
        email
        company {
          name
        }
      }
    }`
    await apolloClient.query({ query: uQuery })
      .then((res) => {
        commit('setUser', res.data.user)
      })
  },
  updateUser({ commit }, payload) {
    const muQuery = gql`
    mutation {
      updateUser(id: ${payload.id}, user: 
        { name: "${payload.name}", email: "${payload.email}", company: "${payload.company}" }
      ) 
      {
        id
      }
    }
    `
    apolloClient.mutate({
      mutation: muQuery
    }).then((data) => {
      commit('updateUser', payload)
    })
  }
}
