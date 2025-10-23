const state = {
    sidebarOpen: false,
    modalOpen: false,
    currentModal: null,
    toast: null,
    theme: 'light',
    language: 'nl'
}

const mutations = {
    TOGGLE_SIDEBAR(state) {
        state.sidebarOpen = !state.sidebarOpen
    },
    SET_SIDEBAR(state, open) {
        state.sidebarOpen = open
    },
    OPEN_MODAL(state, modalName) {
        state.modalOpen = true
        state.currentModal = modalName
    },
    CLOSE_MODAL(state) {
        state.modalOpen = false
        state.currentModal = null
    },
    SHOW_TOAST(state, toast) {
        state.toast = toast
    },
    CLEAR_TOAST(state) {
        state.toast = null
    },
    SET_THEME(state, theme) {
        state.theme = theme
        localStorage.setItem('theme', theme)
    },
    SET_LANGUAGE(state, language) {
        state.language = language
        localStorage.setItem('language', language)
    }
}

const actions = {
    toggleSidebar({ commit }) {
        commit('TOGGLE_SIDEBAR')
    },

    openModal({ commit }, modalName) {
        commit('OPEN_MODAL', modalName)
    },

    closeModal({ commit }) {
        commit('CLOSE_MODAL')
    },

    showToast({ commit }, { message, type = 'info', duration = 3000 }) {
        commit('SHOW_TOAST', { message, type, duration })

        setTimeout(() => {
            commit('CLEAR_TOAST')
        }, duration)
    },

    setTheme({ commit }, theme) {
        commit('SET_THEME', theme)
    },

    setLanguage({ commit }, language) {
        commit('SET_LANGUAGE', language)
    },

    initializeUI({ commit }) {
        const savedTheme = localStorage.getItem('theme') || 'light'
        const savedLanguage = localStorage.getItem('language') || 'nl'

        commit('SET_THEME', savedTheme)
        commit('SET_LANGUAGE', savedLanguage)
    }
}

const getters = {
    sidebarOpen: state => state.sidebarOpen,
    modalOpen: state => state.modalOpen,
    currentModal: state => state.currentModal,
    toast: state => state.toast,
    theme: state => state.theme,
    language: state => state.language
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}