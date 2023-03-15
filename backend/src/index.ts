import { PrismaClient } from  "../node_modules/.prisma/client";
import { buildSchema } from 'type-graphql';
import "reflect-metadata"
import { PostResolver } from "./Resolvers/post-resolver";
import { ApolloServer } from "apollo-server-express";
import express from "express";

export const client = new PrismaClient();

const main = async() => {
    const schema = await buildSchema({
        resolvers: [PostResolver]
    });

    const server = new ApolloServer({ schema });
    const app = express();
    await server.start();
    server.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("listening to requests on port 4000")
    })
}

main().then(
    async() => client.$disconnect()
).catch(async(e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
})




