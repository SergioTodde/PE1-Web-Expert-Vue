export const formatDate = (dateString, options = {}) => {
    const defaultOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return new Date(dateString).toLocaleDateString('nl-BE', {
        ...defaultOptions,
        ...options
    })
}

export const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('nl-BE', {
        hour: '2-digit',
        minute: '2-digit'
    })
}

export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const formatPrice = (price) => {
    return new Intl.NumberFormat('nl-BE', {
        style: 'currency',
        currency: 'EUR'
    }).format(price)
}


export const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0
}

export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

export const getInitials = (name) => {
    return name
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase()
}