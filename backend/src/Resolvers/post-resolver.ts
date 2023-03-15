import { Resolver } from 'type-graphql';
import { Arg, Field, Mutation, ObjectType, Query } from 'type-graphql/dist/decorators';
import { client } from '../index';

@ObjectType()
class Post {
    @Field(() => String)
    title!: string

    @Field(() => String)
    description!: string | null
}

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    async getAllPosts(): Promise<Post[]> {
        const posts = await client.post.findMany();
        return posts;
    }

    @Mutation(() => Post)
    async createPost(
        @Arg("title", () => String) title: string,
        @Arg("description", () => String) description: string
    ): Promise<Post> {
       const post = await client.post.create({
        data: {
            title,
            description
        }
       }); 
       return post;
    }
}
