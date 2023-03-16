"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const client_1 = require("../node_modules/.prisma/client");
const type_graphql_1 = require("type-graphql");
require("reflect-metadata");
const post_resolver_1 = require("./Resolvers/post-resolver");
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
exports.client = new client_1.PrismaClient();
const corsOption = {
    origin: "http://localhost:3000",
    credentials: true
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yield (0, type_graphql_1.buildSchema)({
        resolvers: [post_resolver_1.PostResolver],
    });
    const server = new apollo_server_express_1.ApolloServer({ schema,
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true })]
    });
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)(corsOption));
    yield server.start();
    server.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log("listening to requests on port 4000");
    });
});
main().then(() => __awaiter(void 0, void 0, void 0, function* () { return exports.client.$disconnect(); })).catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield exports.client.$disconnect();
    process.exit(1);
}));
