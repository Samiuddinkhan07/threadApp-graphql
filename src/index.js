import express from "express";
import createApolloServer from "./graphql/createapollo.js";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import { prismaClient } from "./lib/db.js";

async function setupServer() {
    const app = express();
    app.use(express.json())


    const PORT = process.env.PORT || 8000

    

    app.get('/', (req, res) => {
        res.json({ message: "The server is up and running" });
    });

    app.use("/gqlserver",expressMiddleware( await createApolloServer()))


    app.listen(PORT, () => {
        console.log(`PORT started at ${PORT}`)
    })
}

setupServer();