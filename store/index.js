export const state = () => ({
  addresses: [],
})

export const mutations = {
  ADD_ADDRESS(state, address) {
    state.addresses.push(address)

    localStorage.setItem(
      '@WHEREYOULIVE:addresses',
      JSON.stringify(state.addresses)
    )
  },
  UPDATE_ADDRESS(state, { id, address }) {
    state.addresses = state.addresses.map((addr, i) =>
      i === id ? address : addr
    )

    localStorage.setItem(
      '@WHEREYOULIVE:addresses',
      JSON.stringify(state.addresses)
    )
  },
  DELETE_ADDRESS(state, { id }) {
    state.addresses = state.addresses.filter((_, i) => i !== id)

    localStorage.setItem(
      '@WHEREYOULIVE:addresses',
      JSON.stringify(state.addresses)
    )
  },
  INITIALIZE(state) {
    const addresses =
      JSON.parse(localStorage.getItem('@WHEREYOULIVE:addresses')) || []

    if (addresses.length > 0) {
      state.addresses = addresses
    }
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
  initializeStore({ commit }) {
    commit('INITIALIZE')
  },
}
