import api from '@/services/api'

const state = {
    user: null,
    token: localStorage.getItem('auth_token') || null,
    isAuthenticated: false,
    isAdmin: false
}

const mutations = {
    SET_USER(state, user) {
        state.user = user
        state.isAuthenticated = true
        state.isAdmin = user?.role === 'admin'
    },
    SET_TOKEN(state, token) {
        state.token = token
        if (token) {
            localStorage.setItem('auth_token', token)
        } else {
            localStorage.removeItem('auth_token')
        }
    },
    LOGOUT(state) {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.isAdmin = false
        localStorage.removeItem('auth_token')
    },
    UPDATE_USER(state, userData) {
        if (state.user) {
            state.user = { ...state.user, ...userData }
        }
    }
}

const actions = {
    async login({ commit }, credentials) {
        try {
            // Gebruik ECHTE Laravel API
            const response = await api.post('/login', credentials)

            const { token, user } = response.data

            commit('SET_TOKEN', token)
            commit('SET_USER', user)

            return response
        } catch (error) {
            if (error.response?.status === 401) {
                throw new Error('Ongeldige inloggegevens')
            } else if (error.response?.status === 422) {
                throw new Error('Validatie fout: ' + JSON.stringify(error.response.data.errors))
            }
            throw new Error('Inloggen mislukt. Probeer het opnieuw.')
        }
    },

    async register({ commit }, userData) {
        try {
            // Gebruik ECHTE Laravel API
            const response = await api.post('/register', userData)

            const { token, user } = response.data

            commit('SET_TOKEN', token)
            commit('SET_USER', user)

            return response
        } catch (error) {
            if (error.response?.status === 422) {
                throw new Error('Validatie fout: ' + JSON.stringify(error.response.data.errors))
            }
            throw new Error('Registreren mislukt. Probeer het opnieuw.')
        }
    },

    async checkAuth({ commit, state }) {
        if (!state.token) return

        try {
            // Gebruik ECHTE API om user te verifiëren
            const response = await api.get('/user')
            commit('SET_USER', response.data)
        } catch (error) {
            // Token is ongeldig, logout
            commit('LOGOUT')
        }
    },

    logout({ commit, state }) {
        // Roep backend logout aan
        if (state.token) {
            api.post('/logout').catch(() => {
                // Negeer errors bij logout
            })
        }
        commit('LOGOUT')
    },

    async updateProfile({ commit }, profileData) {
        try {
            const response = await api.put('/profile', profileData)
            commit('UPDATE_USER', response.data)
            return response
        } catch (error) {
            throw new Error('Profiel bijwerken mislukt: ' + error.message)
        }
    },

    async changePassword({ commit }, passwordData) {
        try {
            const response = await api.post('/change-password', passwordData)
            return response
        } catch (error) {
            if (error.response?.status === 422) {
                throw new Error('Huidig wachtwoord is incorrect')
            }
            throw new Error('Wachtwoord wijzigen mislukt')
        }
    }
}

const getters = {
    currentUser: state => state.user,
    isAuthenticated: state => state.isAuthenticated,
    isAdmin: state => state.isAdmin
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}