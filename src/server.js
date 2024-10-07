import http from "node:http"
import json from "./middlewares/json.js"
import { routes } from "./routes.js";
import extractQueryParams from "./utils/extractQueryParams.js";

const PORT = 3333;

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParams = url.match(route.path)

        const { query, ...params } = routeParams.groups

        req.params = params
        req.query = new URLSearchParams(query)

        return route.handler(req, res)
    }

    return res.writeHead(404).end("Route not found")
})

server.listen(PORT, () => console.log(`Server listening on ${PORT}`))