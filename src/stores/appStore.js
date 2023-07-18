/*
 * General application related logic.
 */

export const useAppStore = defineStore('global-application', {
  state: () => ({
    // Google Localtion Related
    selectedCites: [],
    selectedCountries: [],
    selectedPreferedDistance: 20,

    currentTheme: 'light'
  }),

  persist: true,

  getters: {
    isDark: (state) => state.currentTheme === 'dark'
  }
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
