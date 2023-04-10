import { PrismaClient } from  "../node_modules/.prisma/client";
import { buildSchema } from 'type-graphql';
import "reflect-metadata";
import session from "express-session";
import * as redis from "redis";
import { PostResolver } from "./Resolvers/post-resolver";
import { UserResolver } from "./Resolvers/user-resolver";
import cors from 'cors';
import { ApolloServer } from "apollo-server-express";
import {  ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import express from "express";


// PRISMA CLIENT SETUP 
export const client = new PrismaClient();

// CORS SETUP
const corsOption = {
    origin: "http://localhost:3000",
    credentials: true
}


const main = async() => {
    // Loading the resolvers used for GraphQL
    const schema = await buildSchema({
        resolvers: [PostResolver, UserResolver],
    });
    
    // REDIS SETUP
    const redisClient = redis.createClient();
    const RedisStore = require('connect-redis')(session); // ERROR is coming here 
    // Running the redis client
    redisClient.connect();

    redisClient.on("connect", () => {
        console.log("Successfully connected with redis")
    });
    
    redisClient.on("error", () => {
        console.log("Too bad! There was a error");
    });

    // EXPRESS APP SETUP 
    const app = express();
    app.use(cors(corsOption)); // Adding cors in the main app based on the options created above

    // Setting up cookie 
   app.use(session({
        name: "sessionId",
        store: new RedisStore({
            client: redisClient,
            disableTouch: true
        }), 
        cookie: {
            maxAge: 60 * 60 * 24 * 30 * 12 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: false 
        },
        secret: "2002",
        resave: false,
        saveUninitialized: false
   })); 

   app.listen(4000, () => {
        console.log("listening to requests on port 4000")
    });

    // APOLLO SERVER SETUP (For GraphQL) 
    const server = new ApolloServer({ 
        schema,
        context: ({ req }) => ({ request: req }), 
        plugins: [ApolloServerPluginLandingPageLocalDefault({ 
            embed: true,
            includeCookies: true // Option to add cookies 
        })] // Changes the default to http://localhost:4000/graphql 
    });
    await server.start();  
    server.applyMiddleware({ app, cors: false }); // Disabling the default cors option that apollo server provides adding main app to GraphQL App
}

main().then(
    async() => client.$disconnect()
).catch(async(e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
})