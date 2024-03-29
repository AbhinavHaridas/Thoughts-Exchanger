import { Resolver } from 'type-graphql';
import { Arg, Field, Mutation, ObjectType, Query } from 'type-graphql/dist/decorators';
import { client } from '../index';

// POST OBJECT
@ObjectType()
export class Post {
    @Field(() => Number)
    id!: number;

    @Field(() => Date)
    createdAt!: Date; 
    
    @Field(() => Date)
    updatedAt!: Date; 

    @Field(() => String)
    title!: string;

    @Field(() => String)
    description!: string | null;
}


@Resolver()
export class PostResolver {
    // GET ALL POSTS
    @Query(() => [Post])
    async getAllPosts(): Promise<Post[] | null> {
        const POSTS = await client.post.findMany();
        return POSTS;
    }

    // GET POST
    @Query(() => Post, { nullable: true })
    async getSpecificPost(
        @Arg ("id", () => Number) id: number
    ): Promise<Post | null> {
        const POST = await client.post.findFirst({
            where: {
                id
            }
        });
        return POST;
    }

    // CREATE POST
    @Mutation(() => Post, { nullable: true })
    async createPost(
        @Arg("title", () => String) title: string,
        @Arg("description", () => String) description: string,
    ): Promise<Post | null> {
       if (title === "") return null;
       const POST = await client.post.create({
        data: {
            title,
            description,
        },
       }); 
       return POST;
    }

    // EDIT POST 
    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg("id", () => Number) id: number,
        @Arg("description", () => String) description: string 
    ): Promise<Post | null> {
        const post = client.post.update({
            where: {
                id
            },
            data: {
                description
            }
        });
        return post;
    }

    // REMOVE POST
    @Mutation(() => Post)
    async removePost(
        @Arg("id", () => Number) id: number 
    ): Promise<void> {
        await client.post.delete({
            where: {
                id
            }
        }) 
    }

    // REMOVE ALL POSTS
    @Mutation(() => Post)
    async removeAllPost(): Promise<void> {
        await client.post.deleteMany();
    }
}
