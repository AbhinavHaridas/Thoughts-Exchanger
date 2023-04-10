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
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { client } from '../index';
import { MaxLength } from "class-validator";
import argon2 from 'argon2';
import { Post } from "./post-resolver";
// USER OBJECT
let User = class User {
};
__decorate([
    Field(() => Number),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Field(() => [Post]),
    __metadata("design:type", Array)
], User.prototype, "post", void 0);
User = __decorate([
    ObjectType()
], User);
export { User };
// USER INPUT 
let UserInput = class UserInput {
};
__decorate([
    MaxLength(255),
    Field(() => String),
    __metadata("design:type", String)
], UserInput.prototype, "username", void 0);
__decorate([
    MaxLength(255),
    Field(() => String),
    __metadata("design:type", String)
], UserInput.prototype, "password", void 0);
UserInput = __decorate([
    InputType()
], UserInput);
export { UserInput };
let UserResolver = class UserResolver {
    // GET ALL USERS
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const USERS = yield client.user.findMany();
            return USERS;
        });
    }
    // USER SIGN UP
    createUser(input, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = input;
            const HASHED_PASSWORD = yield argon2.hash(password);
            const USERS = yield client.user.create({
                data: {
                    username,
                    password: HASHED_PASSWORD,
                    email,
                    Post: undefined
                }
            });
            return USERS;
        });
    }
    // USER LOGIN 
    enterUser(username, password, { request }) {
        return __awaiter(this, void 0, void 0, function* () {
            const USER = yield client.user.findFirst({
                where: {
                    username,
                }
            });
            // USER.password is the HASHED_PASSWORD and not the normal password 
            if (USER && (yield argon2.verify(USER.password, password))) {
                request.session.UID = USER.id; // Storing the USER.id in session (persisting that user has logged in session) 
                return USER;
            }
            return null;
        });
    }
    // DELETE ALL USERS
    removeAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield client.user.deleteMany();
        });
    }
};
__decorate([
    Query(() => [User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getAllUsers", null);
__decorate([
    Mutation(() => User),
    __param(0, Arg("userDetails", () => UserInput)),
    __param(1, Arg("email", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    Mutation(() => User, { nullable: true }),
    __param(0, Arg("username", () => String)),
    __param(1, Arg("password", () => String)),
    __param(2, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "enterUser", null);
__decorate([
    Mutation(() => User, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "removeAllUsers", null);
UserResolver = __decorate([
    Resolver()
], UserResolver);
export { UserResolver };
