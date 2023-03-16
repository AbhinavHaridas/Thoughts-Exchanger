import { PrismaClient } from  "../node_modules/.prisma/client";
import { buildSchema } from 'type-graphql';
import "reflect-metadata"
import { PostResolver } from "./Resolvers/post-resolver";
import cors from 'cors';
import { ApolloServer } from "apollo-server-express";
import {  ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import express from "express";

export const client = new PrismaClient();

const corsOption = {
    origin: "http://localhost:3000",
    credentials: true
}

const main = async() => {
    const schema = await buildSchema({
        resolvers: [PostResolver],
    });

    const server = new ApolloServer({ schema,
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })] 
    });
    const app = express();
    app.use(cors(corsOption));
    await server.start();
    server.applyMiddleware({ app, cors: false });

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
