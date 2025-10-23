import api from './api'

export const usersService = {
    // Get all users (admin only)
    getAll() {
        return api.get('/users')
    },

    // Get user profile
    getProfile(userId) {
        return api.get(`/users/${userId}`)
    },

    // Update user profile
    updateProfile(userId, profileData) {
        return api.put(`/users/${userId}`, profileData)
    },

    // Get co-hosts for event
    getCoHosts(eventId) {
        return api.get(`/events/${eventId}/co-hosts`)
    },

    // Add co-host to event
    addCoHost(eventId, userId) {
        return api.post(`/events/${eventId}/co-hosts`, { user_id: userId })
    },

    // Remove co-host from event
    removeCoHost(eventId, userId) {
        return api.delete(`/events/${eventId}/co-hosts/${userId}`)
    },

    // Update user role
    updateRole(userId, role) {
        return api.put(`/users/${userId}/role`, { role })
    }
}

export default usersService