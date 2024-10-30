import { infoClient, blocksClient, farmingClient } from "@/lib/graphql/clients";

export function useClients() {
  return {
    infoClient,
    blocksClient,
    farmingClient,
  };
}
