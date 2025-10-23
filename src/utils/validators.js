export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

export const validatePassword = (password) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    return {
        isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
        requirements: {
            minLength: password.length >= minLength,
            hasUpperCase,
            hasLowerCase,
            hasNumbers,
            hasSpecialChar
        }
    }
}

export const validatePhone = (phone) => {
    const re = /^[\+]?[1-9][\d]{0,15}$/
    return re.test(phone.replace(/\s/g, ''))
}

export const validateURL = (url) => {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}


export const validateDate = (dateString) => {
    const date = new Date(dateString)
    return date instanceof Date && !isNaN(date)
}


export const validateFutureDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    return date > now
}


export const validateNumber = (value, min = null, max = null) => {
    const num = Number(value)
    if (isNaN(num)) return false

    if (min !== null && num < min) return false
    if (max !== null && num > max) return false

    return true
}


export const validateRequired = (value) => {
    return value !== null && value !== undefined && value !== ''
}


export const validateFileType = (file, allowedTypes) => {
    return allowedTypes.includes(file.type)
}


export const validateFileSize = (file, maxSizeInMB) => {
    const maxSize = maxSizeInMB * 1024 * 1024
    return file.size <= maxSize
}


export const validateEventForm = (formData) => {
    const errors = {}

    if (!validateRequired(formData.title)) {
        errors.title = 'Titel is verplicht'
    }

    if (!validateRequired(formData.description)) {
        errors.description = 'Beschrijving is verplicht'
    }

    if (!validateRequired(formData.start_date)) {
        errors.start_date = 'Startdatum is verplicht'
    } else if (!validateFutureDate(formData.start_date)) {
        errors.start_date = 'Startdatum moet in de toekomst liggen'
    }

    if (!validateRequired(formData.location)) {
        errors.location = 'Locatie is verplicht'
    }

    if (!validateRequired(formData.category)) {
        errors.category = 'Categorie is verplicht'
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}


export const validateTicketForm = (formData) => {
    const errors = {}

    if (!validateRequired(formData.name)) {
        errors.name = 'Naam is verplicht'
    }

    if (!validateRequired(formData.price)) {
        errors.price = 'Prijs is verplicht'
    } else if (!validateNumber(formData.price, 0)) {
        errors.price = 'Prijs moet een positief getal zijn'
    }

    if (!validateRequired(formData.quantity)) {
        errors.quantity = 'Aantal is verplicht'
    } else if (!validateNumber(formData.quantity, 1)) {
        errors.quantity = 'Aantal moet minimaal 1 zijn'
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}