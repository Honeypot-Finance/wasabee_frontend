import { ApolloClient, InMemoryCache } from "@apollo/client";

const infoGraphUri =
  "https://api.goldsky.com/api/public/project_cm0keevd9v59l01w4fokhdcg9/subgraphs/hpot/1.0.0/gn";
const blocksGraphUri =
  "https://api.studio.thegraph.com/query/50593/goerli-blocks/version/latest";
const farmingGraphUri =
  "https://api.goldsky.com/api/public/project_cm0keevd9v59l01w4fokhdcg9/subgraphs/hpot-farming/1.0.0/gn";

export const infoClient = new ApolloClient({
  uri: infoGraphUri,
  cache: new InMemoryCache(),
});

export const blocksClient = new ApolloClient({
  uri: blocksGraphUri,
  cache: new InMemoryCache(),
});

export const farmingClient = new ApolloClient({
  uri: farmingGraphUri,
  cache: new InMemoryCache(),
});
