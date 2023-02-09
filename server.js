import express from "express"
import { Low } from "lowdb"
import { JSONFile } from "lowdb/node"
import morgan from "morgan"
import router from "./routes/pokemonRoutes.js"

const app = express()


const adapter = new JSONFile("db.json");
const db = new Low(adapter)

await db.read()

db.data = db.data || { pokemon: [] }

app.use(morgan("tiny"))

app.use(express.json())


app.use(router(db))
app.listen(3000, () => {
    console.log("Server is running")
})