const state = {
    users: [],
    currentUser: null,
    coHosts: [],
    loading: false
}

const mutations = {
    SET_USERS(state, users) {
        state.users = users
    },
    SET_CURRENT_USER(state, user) {
        state.currentUser = user
    },
    SET_COHOSTS(state, coHosts) {
        state.coHosts = coHosts
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    ADD_COHOST(state, user) {
        state.coHosts.push(user)
    },
    REMOVE_COHOST(state, userId) {
        state.coHosts = state.coHosts.filter(user => user.id !== userId)
    },
    UPDATE_USER_ROLE(state, { userId, role }) {
        const user = state.users.find(u => u.id === userId)
        if (user) {
            user.role = role
        }
    }
}

const actions = {
    async fetchUsers({ commit }) {
        commit('SET_LOADING', true)
        try {
            const response = await this.$api.users.getAll()
            commit('SET_USERS', response.data)
        } catch (error) {
            console.error('Error fetching users:', error)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async fetchCoHosts({ commit }, eventId) {
        try {
            const response = await this.$api.users.getCoHosts(eventId)
            commit('SET_COHOSTS', response.data)
        } catch (error) {
            console.error('Error fetching co-hosts:', error)
        }
    },

    async addCoHost({ commit }, { eventId, userId }) {
        try {
            const response = await this.$api.users.addCoHost(eventId, userId)
            commit('ADD_COHOST', response.data)
            return response.data
        } catch (error) {
            throw error
        }
    },

    async removeCoHost({ commit }, { eventId, userId }) {
        try {
            await this.$api.users.removeCoHost(eventId, userId)
            commit('REMOVE_COHOST', userId)
        } catch (error) {
            throw error
        }
    },

    async updateUserRole({ commit }, { userId, role }) {
        try {
            const response = await this.$api.users.updateRole(userId, role)
            commit('UPDATE_USER_ROLE', { userId, role })
            return response.data
        } catch (error) {
            throw error
        }
    }
}

const getters = {
    users: state => state.users,
    currentUser: state => state.currentUser,
    coHosts: state => state.coHosts,
    loading: state => state.loading
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}