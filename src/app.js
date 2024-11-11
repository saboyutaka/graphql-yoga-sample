import { loadFiles } from "@graphql-tools/load-files"
import { createServer } from "node:http"
import { createYoga, createSchema } from "graphql-yoga"
import { resolvers } from "./resolvers.js"

const schema = createSchema({
  typeDefs: await loadFiles("src/schema.graphql"),
  resolvers,
})

const yoga = createYoga({ schema })
const server = createServer(yoga)

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql")
})
