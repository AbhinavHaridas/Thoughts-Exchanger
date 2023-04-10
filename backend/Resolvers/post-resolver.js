var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Resolver } from 'type-graphql';
import { Arg, Field, Mutation, ObjectType, Query } from 'type-graphql/dist/decorators';
import { client } from '../index';
import { User } from './user-resolver';
// POST OBJECT
let Post = class Post {
};
__decorate([
    Field(() => Number),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    Field(() => Date),
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date),
    __metadata("design:type", Date)
], Post.prototype, "updatedAt", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", Object)
], Post.prototype, "description", void 0);
__decorate([
    Field(() => User),
    __metadata("design:type", User)
], Post.prototype, "user", void 0);
__decorate([
    Field(() => Number),
    __metadata("design:type", Number)
], Post.prototype, "userId", void 0);
Post = __decorate([
    ObjectType()
], Post);
export { Post };
let PostResolver = class PostResolver {
    // GET ALL POSTS
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const POSTS = yield client.post.findMany();
            return POSTS;
        });
    }
    // GET POST
    getSpecificPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const POST = yield client.post.findFirst({
                where: {
                    id
                }
            });
            return POST;
        });
    }
    // CREATE POST
    createPost(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            if (title === "")
                return null;
            const POST = yield client.post.create({
                data: {
                    title,
                    description,
                    user: undefined,
                    userId: 0
                },
            });
            return POST;
        });
    }
    // REMOVE POST
    removePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client.post.delete({
                where: {
                    id
                }
            });
        });
    }
    // REMOVE ALL POSTS
    removeAllPost() {
        return __awaiter(this, void 0, void 0, function* () {
            yield client.post.deleteMany();
        });
    }
};
__decorate([
    Query(() => [Post]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getAllPosts", null);
__decorate([
    Query(() => Post, { nullable: true }),
    __param(0, Arg("id", () => Number)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getSpecificPost", null);
__decorate([
    Mutation(() => Post, { nullable: true }),
    __param(0, Arg("title", () => String)),
    __param(1, Arg("description", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    Mutation(() => Post),
    __param(0, Arg("id", () => Number)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "removePost", null);
__decorate([
    Mutation(() => Post),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "removeAllPost", null);
PostResolver = __decorate([
    Resolver()
], PostResolver);
export { PostResolver };
