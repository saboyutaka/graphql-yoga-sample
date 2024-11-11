import { loadFiles } from "@graphql-tools/load-files"
import { createYoga, createSchema } from "graphql-yoga"
import { resolvers } from "./resolvers.js"
import express from "express"
const __dirname = import.meta.dirname;


const app = express()

const schema = createSchema({
  typeDefs: await loadFiles("src/schema.graphql"),
  resolvers,
})

const yoga = createYoga({ schema })

app.use(yoga.graphqlEndpoint, yoga)

app.get("/voyager", (req, res) => {
  res.sendFile(__dirname + "/voyager.html")
})

app.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql")
})
