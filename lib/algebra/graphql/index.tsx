import { ApolloClient, InMemoryCache } from "@apollo/client";

const INFO_GRAPH =
  "https://api.goldsky.com/api/public/project_cm0keevd9v59l01w4fokhdcg9/subgraphs/hpot/1.0.0/gn";
const BLOCKS_GRAPH =
  "https://api.studio.thegraph.com/query/50593/goerli-blocks/version/latest";
const FARMING_GRAPH =
  "https://api.goldsky.com/api/public/project_cm0keevd9v59l01w4fokhdcg9/subgraphs/hpot-farming/1.0.0/gn";

export const infoClient = new ApolloClient({
  uri: INFO_GRAPH,
  cache: new InMemoryCache(),
});

export const blocksClient = new ApolloClient({
  uri: BLOCKS_GRAPH,
  cache: new InMemoryCache(),
});

export const farmingClient = new ApolloClient({
  uri: FARMING_GRAPH,
  cache: new InMemoryCache(),
});
