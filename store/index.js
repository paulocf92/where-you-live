export const state = () => ({
  addresses: [],
})

export const mutations = {
  ADD_ADDRESS(state, address) {
    state.addresses.push(address)
  },
}

export const actions = {}
