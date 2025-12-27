import axios from 'axios'

// Maak axios instance
const api = axios.create({
    baseURL: 'http://localhost:8000/api',  // Laravel backend
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

// Request interceptor om token toe te voegen
api.interceptors.request.use(config => {
    const token = localStorage.getItem('auth_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

// Response interceptor voor error handling
api.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response?.status === 401) {
        // Token is expired of invalid
        localStorage.removeItem('auth_token')
        window.location.href = '/login'
    }
    return Promise.reject(error)
})


export default api