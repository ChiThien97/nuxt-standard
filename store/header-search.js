export const state = () => ({
  searchResults: ''
})

export const actions = {
  async getSearchResult({dispatch, commit}, key) {
    const url = 'https://cellphones.com.vn/catalogsearch/ajax/suggest/'
    try {
      const result = await this.$axios.$get(url, {params: {'q': key}})
      if (result) {
        commit('getSearchResult', result);
      }
    } catch (error) {
      console.log(error.message)
      dispatch('alert/error', 'Xin Vui Lòng Thử Lại', {root: true})
    }
  },
  submitSearchForm({dispatch, commit}, key) {
    window.location = 'https://cellphones.com.vn/catalogsearch/result/?q=' + key;
  },
  resetSearchResult({commit}) {
    commit('resetSearchResult');
  }
}

export const mutations = {
  getSearchResult(state, result) {
    state.searchResults = result;
  },
  resetSearchResult(state) {
    state.searchResults = '';
  }
}
