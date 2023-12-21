import { ApolloServer } from "@apollo/server";
import { User } from "./user/userIndex.js";

async function createApolloServer(){
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query{
               hello:String
            }

            type Mutation{
                ${User.mutations}
            }
        `,//schema
        resolvers: {
            Query:{
               ...User.resolvers.queries
            },
            Mutation:{
                ...User.resolvers.mutations
             }
        }});

    //Start the GQL server

    await gqlServer.start();

    return gqlServer;
}

export default createApolloServer;