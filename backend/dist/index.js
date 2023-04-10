"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const client_1 = require("../node_modules/.prisma/client");
const type_graphql_1 = require("type-graphql");
require("reflect-metadata");
const express_session_1 = __importDefault(require("express-session"));
const redis = __importStar(require("redis"));
const post_resolver_1 = require("./Resolvers/post-resolver");
const user_resolver_1 = require("./Resolvers/user-resolver");
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
// PRISMA CLIENT SETUP 
exports.client = new client_1.PrismaClient();
// CORS SETUP
const corsOption = {
    origin: "http://localhost:3000",
    credentials: true
};
const main = async () => {
    // Loading the resolvers used for GraphQL
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [post_resolver_1.PostResolver, user_resolver_1.UserResolver],
    });
    // REDIS SETUP
    const redisClient = redis.createClient();
    const RedisStore = require('connect-redis')(express_session_1.default); // ERROR is coming here 
    // Running the redis client
    redisClient.connect();
    redisClient.on("connect", () => {
        console.log("Successfully connected with redis");
    });
    redisClient.on("error", () => {
        console.log("Too bad! There was a error");
    });
    // EXPRESS APP SETUP 
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)(corsOption)); // Adding cors in the main app based on the options created above
    // Setting up cookie 
    app.use((0, express_session_1.default)({
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
        console.log("listening to requests on port 4000");
    });
    // APOLLO SERVER SETUP (For GraphQL) 
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        context: ({ req }) => ({ request: req }),
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({
                embed: true,
                includeCookies: true // Option to add cookies 
            })] // Changes the default to http://localhost:4000/graphql 
    });
    await server.start();
    server.applyMiddleware({ app, cors: false }); // Disabling the default cors option that apollo server provides adding main app to GraphQL App
};
main().then(async () => exports.client.$disconnect()).catch(async (e) => {
    console.error(e);
    await exports.client.$disconnect();
    process.exit(1);
});
