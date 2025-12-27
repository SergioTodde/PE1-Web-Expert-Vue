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

    resetPassword(email) {
        return api.post('/password-reset', { email })
    }
}

export default authService