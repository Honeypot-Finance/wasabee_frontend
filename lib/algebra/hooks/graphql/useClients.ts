import { infoClient, blocksClient, farmingClient } from "../../graphql";

export function useClients() {
  return {
    infoClient,
    blocksClient,
    farmingClient,
  };
}
