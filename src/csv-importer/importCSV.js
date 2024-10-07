import fs from "node:fs"
import { parse } from "csv-parse"

const csvPath = new URL("tasks.csv", import.meta.url)

export default async function importCSV() {
    const readableStream = fs.createReadStream(csvPath, 'utf-8')
    const parser = parse({
        delimiter: ","
    })

    let isHeader = true
    for await (const chunk of readableStream.pipe(parser)) {
        if (isHeader) {
            isHeader = false
            continue
        }
        const [title, description] = chunk
        fetch("http://localhost:3333/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                description
            })
        }).then(result => {
            if (result.status === 201)
                console.log("Task created: ", result.statusText)
            else
                console.log(result)
        }).catch(err => {
            console.log({ err, chunk })
        })
    }
}

importCSV()