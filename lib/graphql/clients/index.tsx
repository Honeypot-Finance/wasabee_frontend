import { ApolloClient, InMemoryCache } from "@apollo/client";

export const infoClient = new ApolloClient({
  uri: process.env.INFO_GRAPH,
  cache: new InMemoryCache(),
});

export const blocksClient = new ApolloClient({
  uri: process.env.BLOCKS_GRAPH,
  cache: new InMemoryCache(),
});

export const farmingClient = new ApolloClient({
  uri: process.env.FARMING_GRAPH,
  cache: new InMemoryCache(),
});
