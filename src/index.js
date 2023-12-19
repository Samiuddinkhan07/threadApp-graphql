import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";

async function setupServer() {
    const app = express();
    app.use(express.json())


    const PORT = process.env.PORT || 8000

    //Create a GraphQl server using Apollo server
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query{
                hello:String
                say(name:String):String
            }
        `,//schema
        resolvers: {
            Query:{
                hello:() => `Hey there i am GRPQL server`,
                say:(_,{name},{name:String}) => `Hey there ${name}`
            }
        }
    });

    //Start the GQL server

    await gqlServer.start()

    app.get('/', (req, res) => {
        res.json({ message: "The server is up and running" });
    });

    app.use("/gqlserver",expressMiddleware(gqlServer))


    app.listen(PORT, () => {
        console.log(`PORT started at ${PORT}`)
    })
}

setupServer()