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
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
exports.client = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yield (0, type_graphql_1.buildSchema)({
        resolvers: [post_resolver_1.PostResolver]
    });
    const server = new apollo_server_express_1.ApolloServer({ schema });
    const app = (0, express_1.default)();
    yield server.start();
    server.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log("listening to requests on port 4000");
    });
});
main().then(() => __awaiter(void 0, void 0, void 0, function* () { return exports.client.$disconnect(); })).catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield exports.client.$disconnect();
    process.exit(1);
}));
