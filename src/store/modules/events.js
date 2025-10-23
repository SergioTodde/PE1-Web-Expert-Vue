const state = {
    events: [],
    featuredEvents: [],
    userEvents: [],
    favoriteEvents: [],
    currentEvent: null,
    loading: false,
    viewMode: 'list', // 'list' or 'calendar'
    searchQuery: '',
    filters: {
        category: '',
        date: '',
        location: ''
    }
}

const mutations = {
    SET_EVENTS(state, events) {
        state.events = events
    },
    SET_FEATURED_EVENTS(state, events) {
        state.featuredEvents = events
    },
    SET_USER_EVENTS(state, events) {
        state.userEvents = events
    },
    SET_FAVORITE_EVENTS(state, events) {
        state.favoriteEvents = events
    },
    SET_CURRENT_EVENT(state, event) {
        state.currentEvent = event
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    SET_VIEW_MODE(state, mode) {
        state.viewMode = mode
    },
    SET_SEARCH_QUERY(state, query) {
        state.searchQuery = query
    },
    SET_FILTERS(state, filters) {
        state.filters = { ...state.filters, ...filters }
    },
    ADD_EVENT(state, event) {
        state.events.unshift(event)
    },
    UPDATE_EVENT(state, updatedEvent) {
        const index = state.events.findIndex(e => e.id === updatedEvent.id)
        if (index !== -1) {
            state.events.splice(index, 1, updatedEvent)
        }
    },
    DELETE_EVENT(state, eventId) {
        state.events = state.events.filter(e => e.id !== eventId)
    },
    TOGGLE_FAVORITE(state, eventId) {
        const event = state.events.find(e => e.id === eventId)
        if (event) {
            event.is_favorite = !event.is_favorite
        }
    }
}

const actions = {
    async fetchEvents({ commit, state }) {
        commit('SET_LOADING', true)
        try {
            const params = {
                search: state.searchQuery,
                ...state.filters
            }
            const response = await this.$api.events.getAll(params)
            commit('SET_EVENTS', response.data)
        } catch (error) {
            console.error('Error fetching events:', error)
        } finally {
            commit('SET_LOADING', false)
        }
    },
    async fetchEvent({ commit }, eventId) {
        try {
            const response = await this.$api.events.getById(eventId)
            commit('SET_CURRENT_EVENT', response.data)
            return response.data
        } catch (error) {
            console.error('Error fetching event:', error)
            throw error
        }
    },
    async createEvent({ commit }, eventData) {
        try {
            const response = await this.$api.events.create(eventData)
            commit('ADD_EVENT', response.data)
            return response.data
        } catch (error) {
            throw error
        }
    },
    async updateEvent({ commit }, { eventId, eventData }) {
        try {
            const response = await this.$api.events.update(eventId, eventData)
            commit('UPDATE_EVENT', response.data)
            return response.data
        } catch (error) {
            throw error
        }
    },
    async deleteEvent({ commit }, eventId) {
        try {
            await this.$api.events.delete(eventId)
            commit('DELETE_EVENT', eventId)
        } catch (error) {
            throw error
        }
    },
    async toggleFavorite({ commit }, eventId) {
        try {
            await this.$api.events.toggleFavorite(eventId)
            commit('TOGGLE_FAVORITE', eventId)
        } catch (error) {
            throw error
        }
    },
    setViewMode({ commit }, mode) {
        commit('SET_VIEW_MODE', mode)
    },
    setSearchQuery({ commit }, query) {
        commit('SET_SEARCH_QUERY', query)
    },
    setFilters({ commit }, filters) {
        commit('SET_FILTERS', filters)
    }
}

const getters = {
    filteredEvents: (state) => {
        let events = [...state.events]

        // Apply search
        if (state.searchQuery) {
            const query = state.searchQuery.toLowerCase()
            events = events.filter(event =>
                event.title.toLowerCase().includes(query) ||
                event.location.toLowerCase().includes(query) ||
                event.description.toLowerCase().includes(query)
            )
        }

        // Apply filters
        if (state.filters.category) {
            events = events.filter(event => event.category === state.filters.category)
        }

        if (state.filters.location) {
            events = events.filter(event =>
                event.location.toLowerCase().includes(state.filters.location.toLowerCase())
            )
        }

        if (state.filters.date) {
            events = events.filter(event =>
                event.start_date.startsWith(state.filters.date)
            )
        }

        return events
    },
    featuredEvents: state => state.featuredEvents,
    userEvents: state => state.userEvents,
    favoriteEvents: state => state.favoriteEvents,
    currentEvent: state => state.currentEvent,
    loading: state => state.loading,
    viewMode: state => state.viewMode
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}