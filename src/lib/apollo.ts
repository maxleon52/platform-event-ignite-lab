import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api-sa-east-1.graphcms.com/v2/cl4omywud0k4g01xkf3pnbv7u/master",
  cache: new InMemoryCache(),
});
