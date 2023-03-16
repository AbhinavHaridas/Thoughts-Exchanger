import { createClient } from 'urql';

export const graphQLClient = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: { credentials: 'include' }
});

