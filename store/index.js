export const state = () => ({
  addresses: [],
})

export const mutations = {
  ADD_ADDRESS(state, address) {
    state.addresses.push(address)
  },
  UPDATE_ADDRESS(state, { id, address }) {
    state.addresses = state.addresses.map((addr, i) =>
      i === id ? address : addr
    )
  },
  DELETE_ADDRESS(state, { id }) {
    state.addresses = state.addresses.filter((_, i) => i !== id)
  },
}

export const actions = {
  addAddress({ commit }, { address }) {
    commit('ADD_ADDRESS', address)
  },
  updateAddress({ commit }, { id, address }) {
    commit('UPDATE_ADDRESS', { id, address })
  },
  deleteAddress({ commit }, { id }) {
    commit('DELETE_ADDRESS', { id })
  },
}
