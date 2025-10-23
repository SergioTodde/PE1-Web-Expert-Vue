import api from './api'

export const ticketsService = {
    // Get tickets for event
    getByEvent(eventId) {
        return api.get(`/events/${eventId}/tickets`)
    },

    // Create ticket
    create(ticketData) {
        return api.post('/tickets', ticketData)
    },

    // Update ticket
    update(ticketId, ticketData) {
        return api.put(`/tickets/${ticketId}`, ticketData)
    },

    // Delete ticket
    delete(ticketId) {
        return api.delete(`/tickets/${ticketId}`)
    },

    // Get user tickets
    getUserTickets() {
        return api.get('/user/tickets')
    },

    // Create booking
    createBooking(bookingData) {
        return api.post('/bookings', bookingData)
    },

    // Get booking details
    getBooking(bookingId) {
        return api.get(`/bookings/${bookingId}`)
    },

    // Cancel booking
    cancelBooking(bookingId) {
        return api.delete(`/bookings/${bookingId}`)
    }
}

export default ticketsService