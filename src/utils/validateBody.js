export function validateUserCreationBody(body) {
    if (!body)
            return { valid: false, err: "Title and description are required" }
    const requiredFields = ["title", "description"]

    for (const field of requiredFields) {
        if (field in body ^ 1) 
            return { valid: false, err: `${field} is required` }
    }

    return { valid: true, err: null }
}

export function validateUserUpdateBody(body) {
    if (!body)
        return { valid: false, err: "Title or description are required" }
    const allowedFields = ["title", "description"]

    for (const key in body) {
        if (!allowedFields.includes(key)) 
            return { valid: false, err: `${key} is not allowed` }
    }

    return { valid: true, err: null }
}