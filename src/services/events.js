import api from './api'

export const eventsService = {
    // Get all events with optional filters
    getAll(params = {}) {
        return api.get('/events', { params })
    },

    // Get single event
    getById(id) {
        return api.get(`/events/${id}`)
    },

    // Create new event
    create(eventData) {
        return api.post('/events', eventData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    // Update event
    update(id, eventData) {
        return api.post(`/events/${id}`, eventData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    // Delete event
    delete(id) {
        return api.delete(`/events/${id}`)
    },

    // Toggle favorite
    toggleFavorite(id) {
        return api.post(`/events/${id}/favorite`)
    },

    // Get user events
    getUserEvents() {
        return api.get('/user/events')
    },

    // Get favorite events
    getFavorites() {
        return api.get('/user/favorites')
    },

    // Search events
    search(query) {
        return api.get('/events/search', { params: { q: query } })
    }
}

export default eventsService