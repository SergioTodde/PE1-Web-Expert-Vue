import api from './api'

export const authService = {
    login(credentials) {
        return api.post('/login', credentials)
    },

    register(userData) {
        return api.post('/register', userData)
    },

    logout() {
        return api.post('/logout')
    },

    getUser() {
        return api.get('/user')
    },

    updateProfile(profileData) {
        return api.put('/profile', profileData)
    },

    changePassword(passwordData) {
        return api.post('/change-password', passwordData)
    },

    // Voeg deze toe:
    resetPasswordRequest(email) {
        return api.post('/auth/password/reset-request', { email })
    },

    resetPassword(data) {
        return api.post('/auth/password/reset', data)
    },

    verifyResetToken(token) {
        return api.post('/auth/password/verify-token', { token })
    }
}

export default authService