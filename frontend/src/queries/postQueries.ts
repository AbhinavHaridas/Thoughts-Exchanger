export const getAllPosts = `
    query {
        getAllPosts {
            id,
            title,
            description
        }
    }
`;

export const getSpecificPost = (id: number) => {
    return `
        query {
            getSpecificPost(id: ${id}) {
                title,
                description
            }
        }
    `
} 