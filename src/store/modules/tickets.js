const state = {
    tickets: [],
    userTickets: [],
    currentTicket: null,
    bookings: [],
    loading: false,
    paymentStatus: null
}

const mutations = {
    SET_TICKETS(state, tickets) {
        state.tickets = tickets
    },
    SET_USER_TICKETS(state, tickets) {
        state.userTickets = tickets
    },
    SET_CURRENT_TICKET(state, ticket) {
        state.currentTicket = ticket
    },
    SET_BOOKINGS(state, bookings) {
        state.bookings = bookings
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    SET_PAYMENT_STATUS(state, status) {
        state.paymentStatus = status
    },
    ADD_BOOKING(state, booking) {
        state.bookings.unshift(booking)
        state.userTickets.unshift(booking.ticket)
    },
    UPDATE_TICKET_AVAILABILITY(state, { ticketId, quantity }) {
        const ticket = state.tickets.find(t => t.id === ticketId)
        if (ticket) {
            ticket.available -= quantity
        }
    }
}

const actions = {
    async fetchTickets({ commit }, eventId) {
        commit('SET_LOADING', true)
        try {
            const response = await this.$api.tickets.getByEvent(eventId)
            commit('SET_TICKETS', response.data)
        } catch (error) {
            console.error('Error fetching tickets:', error)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async fetchUserTickets({ commit }) {
        try {
            const response = await this.$api.tickets.getUserTickets()
            commit('SET_USER_TICKETS', response.data)
        } catch (error) {
            console.error('Error fetching user tickets:', error)
        }
    },

    async createTicket({ commit }, ticketData) {
        try {
            const response = await this.$api.tickets.create(ticketData)
            return response.data
        } catch (error) {
            throw error
        }
    },

    async updateTicket({ commit }, { ticketId, ticketData }) {
        try {
            const response = await this.$api.tickets.update(ticketId, ticketData)
            return response.data
        } catch (error) {
            throw error
        }
    },

    async deleteTicket({ commit }, ticketId) {
        try {
            await this.$api.tickets.delete(ticketId)
        } catch (error) {
            throw error
        }
    },

    async createBooking({ commit }, bookingData) {
        try {
            const response = await this.$api.tickets.createBooking(bookingData)
            commit('ADD_BOOKING', response.data)
            commit('UPDATE_TICKET_AVAILABILITY', {
                ticketId: bookingData.ticket_id,
                quantity: bookingData.quantity
            })
            return response.data
        } catch (error) {
            throw error
        }
    },

    async simulatePayment({ commit }, paymentData) {
        commit('SET_PAYMENT_STATUS', 'processing')
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Simulate successful payment
            const result = {
                success: true,
                reference: 'PAY-' + Date.now(),
                amount: paymentData.amount
            }

            commit('SET_PAYMENT_STATUS', 'success')
            return result
        } catch (error) {
            commit('SET_PAYMENT_STATUS', 'failed')
            throw error
        }
    }
}

const getters = {
    tickets: state => state.tickets,
    userTickets: state => state.userTickets,
    currentTicket: state => state.currentTicket,
    bookings: state => state.bookings,
    loading: state => state.loading,
    paymentStatus: state => state.paymentStatus
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}