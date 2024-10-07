import buildRoutPath from "./utils/buildRoutePath.js"
import Database from "./database.js"
import getCurrentTime from "./utils/getCurrentTime.js"
import { validateUserUpdateBody, validateUserCreationBody } from "./utils/validateBody.js"
import { randomUUID } from "node:crypto"

const database = new Database()
const TABLE_NAME = "tasks"

export const routes = [
    {
        method: "POST",
        path: buildRoutPath("/tasks"),
        handler: (req, res) => {
            const data = req.body

            const { valid, err } = validateUserCreationBody(data)
            if (!valid) 
                return res.writeHead(404).end(err)
            
            data.id = randomUUID()
            data.created_at = getCurrentTime()
            data.updated_at = null
            data.completed_at = null

            database.insert(TABLE_NAME, data)
            return res.writeHead(201).end("Task created")
        }
    },
    {
        method: "GET",
        path: buildRoutPath("/tasks"),
        handler: (req, res) => {
            const search = req.query.get("search")

            const tasks = database.select(TABLE_NAME, search ? {
                title: search,
                description: search
            } : null)

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: "PUT",
        path: buildRoutPath("/tasks/:id"),
        handler: (req, res) => {
            const data = req.body
            const { id } = req.params

            const { valid, err } = validateUserUpdateBody(data)
            if (!valid) 
                return res.writeHead(404).end(err)

            data.updated_at = getCurrentTime()

            database.update(TABLE_NAME, id, data)
            return res.end("Task updated")
        }
    },
    {
        method: "DELETE",
        path: buildRoutPath("/tasks/:id"),
        handler: (req, res) => {
            const data = req.body
            const { id } = req.params

            database.delete(TABLE_NAME, id)
            return res.end("Task deleted")
        }
    },
    {
        method: "PATCH",
        path: buildRoutPath("/tasks/:id/complete"),
        handler: (req, res) => {
            const { id } = req.params
            const data = {
                completed_at: getCurrentTime()
            }

            database.update(TABLE_NAME, id, data)
            return res.end("Task completed")
        }
    },
]