"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResolver = exports.Post = void 0;
const type_graphql_1 = require("type-graphql");
const decorators_1 = require("type-graphql/dist/decorators");
const index_1 = require("../index");
// POST OBJECT
let Post = class Post {
};
__decorate([
    (0, decorators_1.Field)(() => Number)
], Post.prototype, "id", void 0);
__decorate([
    (0, decorators_1.Field)(() => Date)
], Post.prototype, "createdAt", void 0);
__decorate([
    (0, decorators_1.Field)(() => Date)
], Post.prototype, "updatedAt", void 0);
__decorate([
    (0, decorators_1.Field)(() => String)
], Post.prototype, "title", void 0);
__decorate([
    (0, decorators_1.Field)(() => String)
], Post.prototype, "description", void 0);
Post = __decorate([
    (0, decorators_1.ObjectType)()
], Post);
exports.Post = Post;
let PostResolver = class PostResolver {
    // GET ALL POSTS
    async getAllPosts() {
        const POSTS = await index_1.client.post.findMany();
        return POSTS;
    }
    // GET POST
    async getSpecificPost(id) {
        const POST = await index_1.client.post.findFirst({
            where: {
                id
            }
        });
        return POST;
    }
    // CREATE POST
    async createPost(title, description) {
        if (title === "")
            return null;
        const POST = await index_1.client.post.create({
            data: {
                title,
                description,
                // user: undefined,
                // userId: 0 
            },
        });
        return POST;
    }
    // REMOVE POST
    async removePost(id) {
        await index_1.client.post.delete({
            where: {
                id
            }
        });
    }
    // REMOVE ALL POSTS
    async removeAllPost() {
        await index_1.client.post.deleteMany();
    }
};
__decorate([
    (0, decorators_1.Query)(() => [Post])
], PostResolver.prototype, "getAllPosts", null);
__decorate([
    (0, decorators_1.Query)(() => Post, { nullable: true }),
    __param(0, (0, decorators_1.Arg)("id", () => Number))
], PostResolver.prototype, "getSpecificPost", null);
__decorate([
    (0, decorators_1.Mutation)(() => Post, { nullable: true }),
    __param(0, (0, decorators_1.Arg)("title", () => String)),
    __param(1, (0, decorators_1.Arg)("description", () => String))
], PostResolver.prototype, "createPost", null);
__decorate([
    (0, decorators_1.Mutation)(() => Post),
    __param(0, (0, decorators_1.Arg)("id", () => Number))
], PostResolver.prototype, "removePost", null);
__decorate([
    (0, decorators_1.Mutation)(() => Post)
], PostResolver.prototype, "removeAllPost", null);
PostResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], PostResolver);
exports.PostResolver = PostResolver;
