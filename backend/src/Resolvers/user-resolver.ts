import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { client } from '../index';
import { MaxLength } from "class-validator";
import argon2 from 'argon2';
import { Post } from "./post-resolver";
import { Request } from "express";

// The type I am expecting from requests
type ReqType = {
    request: Request & { session: { UID: number }}
}


// USER OBJECT
@ObjectType()
export class User {
    @Field(() => Number)
    id!: number;

    @Field(() => String)
    username!: string;

    @Field(() => String)
    password!: string;

    @Field(() => String)
    email!: string;

    // @Field(() => [Post])
    // post?: Post[];
}


// USER INPUT 
@InputType()
export class UserInput {
    @MaxLength(255)
    @Field(() => String)
    username!: string;

    @MaxLength(255)
    @Field(() => String)
    password!: string;
}


@Resolver()
export class UserResolver {
    // GET ALL USERS
    @Query(() => [User])
    async getAllUsers(): Promise<User[]> {
        const USERS = await client.user.findMany();
        return USERS;
    }

    // USER SIGN UP
    @Mutation(() => User)
    async createUser(
        @Arg("userDetails", () => UserInput) input: UserInput,
        @Arg("email", () => String) email: string
    ): Promise<User> {
       const { username, password } = input;
       const HASHED_PASSWORD = await argon2.hash(password); 
       const USERS = await client.user.create({
        data: {
            username,
            password: HASHED_PASSWORD,
            email,
            // Post: undefined 
        }
       });
       return USERS;
    }

    // USER LOGIN 
    @Mutation(() => User, { nullable: true })
    async enterUser(
        @Arg("username", () => String) username: string, 
        @Arg("password", () => String) password: string,
        @Ctx() { request }: ReqType
    ): Promise<User | null> {
        const USER = await client.user.findFirst({
            where: {
                username,
            }
        });
        // Checking if session or requestuest actually exists or not
        if (!request || !request.session) {
           console.log("Session is not defined"); 
        }
        // USER.password is the HASHED_PASSWORD and not the normal password 
        if (USER && await argon2.verify(USER.password, password)) {
            request.session.UID = USER.id; // Storing the USER.id in session (persisting that user has logged in session) 
            return USER; 
        }      
        return null; 
    }

    // DELETE ALL USERS
    @Mutation(() => User, { nullable: true })
    async removeAllUsers(): Promise<void> {
        await client.user.deleteMany()
    }
}