import { config } from "dotenv"

import express from "express"

config()

const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send("Hello, world!")
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})