export const getAllPosts = `
    query {
        getAllPosts {
            id,
            title,
            description,
            createdAt
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

export const createPost =  `
       mutation($description: String!, $title: String!) {
            createPost(description: $description, title: $title) {
                title,
                description    
            }
        } 
    `
