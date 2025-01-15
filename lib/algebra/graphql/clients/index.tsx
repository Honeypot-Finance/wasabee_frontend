import { ApolloClient, InMemoryCache } from "@apollo/client";

const INFO_GRAPH = process.env.NEXT_PUBLIC_INFO_GRAPH;
const BLOCKS_GRAPH = process.env.NEXT_PUBLIC_BLOCKS_GRAPH;
const FARMING_GRAPH = process.env.NEXT_PUBLIC_FARMING_GRAPH;

export const infoClient = new ApolloClient({
  uri: INFO_GRAPH,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
    },
  },
});

export const blocksClient = new ApolloClient({
  uri: BLOCKS_GRAPH,
  cache: new InMemoryCache(),
});

export const farmingClient = new ApolloClient({
  uri: FARMING_GRAPH,
  cache: new InMemoryCache(),
});
