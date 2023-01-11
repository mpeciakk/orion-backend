import { config } from "dotenv"
import { Server } from "./src/server"

config()

const port = process.env.PORT
const server = new Server()

server.listen(port!, () => {
  console.log(`Server listening on port ${port}`)
})
