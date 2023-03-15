import { PrismaClient } from  "@prisma/client";

const client = new PrismaClient();

const main = async() => {
    const posts = await client.post.findMany();
    console.log(posts);
}

main().then(
    async() => client.$disconnect()
).catch(async(e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
})
