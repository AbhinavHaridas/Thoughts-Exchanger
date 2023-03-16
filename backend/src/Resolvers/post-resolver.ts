import { Resolver } from 'type-graphql';
import { Arg, Field, Mutation, ObjectType, Query } from 'type-graphql/dist/decorators';
import { client } from '../index';

@ObjectType()
class Post {
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
    @Query(() => [Post])
    async getAllPosts(): Promise<Post[]> {
        const posts = await client.post.findMany();
        return posts;
    }

    @Query(() => Post)
    async getSpecificPost(
        @Arg ("id", () => Number) id: number
    ): Promise<Post | null> {
        const post = await client.post.findFirst({
            where: {
                id
            }
        })
        return post;
    }

    @Mutation(() => Post)
    async createPost(
        @Arg("title", () => String) title: string,
        @Arg("description", () => String) description: string
    ): Promise<Post> {
       const post = await client.post.create({
        data: {
            title,
            description,
        },
       }); 
       return post;
    }
}
