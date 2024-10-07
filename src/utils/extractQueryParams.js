export default function extractQueryParams(query) {
    query = query.slice(1)

    const paramsObjects = query.split("&")
    const params = {}
    paramsObjects.forEach(paramObj => {
        const [key, value] = paramObj.split("=")
        params[key] = value
    })

    return params
}