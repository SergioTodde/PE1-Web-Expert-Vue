const state = {
    user: null,
    token: localStorage.getItem('auth_token') || null,
    isAuthenticated: false,
    isAdmin: false
}

const mockUsers = {
    'user@test.com': {
        id: 1,
        name: 'Test Gebruiker',
        email: 'user@test.com',
        phone: '+32 123 45 67 89',
        avatar: '/images/avatar-placeholder.png',
        role: 'user',
        created_at: '2024-01-01T00:00:00Z'
    },
    'admin@test.com': {
        id: 2,
        name: 'admin Gebruiker',
        email: 'admin@test.com',
        phone: '+32 987 65 43 21',
        avatar: '/images/avatar-placeholder.png',
        role: 'admin',
        created_at: '2024-01-01T00:00:00Z'
    },
    'john@example.com': {
        id: 3,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+32 456 78 90 12',
        avatar: '/images/avatar-placeholder.png',
        role: 'user',
        created_at: '2024-02-15T00:00:00Z'
    }
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
            // Simuleer API call delay
            await new Promise(resolve => setTimeout(resolve, 1000))

            const { email, password } = credentials

            // Mock authenticatie - accepteer elk wachtwoord voor test gebruikers
            if (mockUsers[email]) {
                const user = mockUsers[email]
                const token = `mock_jwt_token_${user.id}_${Date.now()}`

                commit('SET_TOKEN', token)
                commit('SET_USER', user)

                return { data: { token, user } }
            } else {
                // Voor nieuwe gebruikers, maak een mock user aan
                const newUser = {
                    id: Object.keys(mockUsers).length + 1,
                    name: email.split('@')[0],
                    email: email,
                    phone: '',
                    avatar: '/images/avatar-placeholder.png',
                    role: 'user',
                    created_at: new Date().toISOString()
                }

                const token = `mock_jwt_token_${newUser.id}_${Date.now()}`

                commit('SET_TOKEN', token)
                commit('SET_USER', newUser)

                return { data: { token, user: newUser } }
            }
        } catch (error) {
            throw new Error('Inloggen mislukt. Probeer het opnieuw.')
        }
    },

    async register({ commit }, userData) {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            const newUser = {
                id: Object.keys(mockUsers).length + 1,
                name: `${userData.first_name} ${userData.last_name}`,
                email: userData.email,
                phone: userData.phone || '',
                avatar: '/images/avatar-placeholder.png',
                role: 'user',
                created_at: new Date().toISOString()
            }

            const token = `mock_jwt_token_${newUser.id}_${Date.now()}`

            commit('SET_TOKEN', token)
            commit('SET_USER', newUser)

            return { data: { token, user: newUser } }
        } catch (error) {
            throw new Error('Registreren mislukt. Probeer het opnieuw.')
        }
    },

    async checkAuth({ commit, state }) {
        if (!state.token) return

        try {
            await new Promise(resolve => setTimeout(resolve, 500))

            // Simuleer token verificatie
            const tokenParts = state.token.split('_')
            const userId = parseInt(tokenParts[3])

            // Vind user in mock data
            const user = Object.values(mockUsers).find(u => u.id === userId)
            if (user) {
                commit('SET_USER', user)
            } else {
                commit('LOGOUT')
            }
        } catch (error) {
            commit('LOGOUT')
        }
    },

    logout({ commit }) {
        commit('LOGOUT')
    },

    async updateProfile({ commit, state }, profileData) {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            const updatedUser = {
                ...state.user,
                ...profileData,
                name: `${profileData.first_name} ${profileData.last_name}`
            }

            commit('UPDATE_USER', updatedUser)
            return { data: updatedUser }
        } catch (error) {
            throw new Error('Profiel bijwerken mislukt.')
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