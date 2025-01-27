import { ICHIVaultContract } from "@/services/contract/aquabera/ICHIVault-contract";
import { infoClient } from ".";
import {
  AccountVaultSharesDocument,
  AccountVaultSharesQuery,
  AccountVaultSharesQueryResult,
  VaultShare,
  VaultsSortedByHoldersDocument,
  VaultsSortedByHoldersQuery,
  SingleVaultDetailsDocument,
  SingleVaultDetailsQuery,
  IchiVault,
} from "../generated/graphql";
import {
  ACCOUNT_VAULT_SHARES,
  VAULTS_SORTED_BY_HOLDERS,
  SINGLE_VAULT_DETAILS,
} from "../queries/vaults";
import { Address } from "viem";
import { Token } from "@/services/contract/token";
import { poolQueryToContract } from "./pool";

export const vaultQueryResToVaultContract = (
  vault: IchiVault
): ICHIVaultContract => {
  const vaultContract = new ICHIVaultContract({
    address: vault.id as Address,
    allowToken0: vault.allowTokenA,
    allowToken1: vault.allowTokenB,
    holderCount: BigInt(vault.holdersCount),
    isInitialized: true,
  });

  vaultContract.token0 = new Token({
    address: vault.tokenA as Address,
    decimals: vault.tokenA.decimals,
    name: vault.tokenA.name,
    symbol: vault.tokenA.symbol,
  });

  vaultContract.token1 = new Token({
    address: vault.tokenB as Address,
    decimals: vault.tokenB.decimals,
    name: vault.tokenB.name,
    symbol: vault.tokenB.symbol,
  });

  vaultContract.recentTransactions = [
    ...vault.vaultDeposits,
    ...vault.vaultWithdraws,
    ...vault.vaultCollectFees,
  ].sort((a, b) => Number(b.createdAtTimestamp) - Number(a.createdAtTimestamp));

  vaultContract.pool = poolQueryToContract(vault.pool);

  console.log("vaultContract", vaultContract);

  return vaultContract;
};

export async function getAccountVaultsList(
  accountAddress: string
): Promise<AccountVaultSharesQuery> {
  console.log(AccountVaultSharesDocument);

  const vaults = await infoClient.query<AccountVaultSharesQuery>({
    query: AccountVaultSharesDocument,
    variables: {
      AccountId: accountAddress.toLowerCase(),
    },
  });

  console.log(vaults);

  return vaults.data;
}

export async function getVaultPageData(
  search?: string
): Promise<VaultsSortedByHoldersQuery> {
  console.log(VAULTS_SORTED_BY_HOLDERS);
  const vaults = await infoClient.query<VaultsSortedByHoldersQuery>({
    query: VaultsSortedByHoldersDocument,
    variables: {
      search: search ?? "",
    },
  });

  return vaults.data;
}

export async function getSingleVaultDetails(
  vaultId: string
): Promise<ICHIVaultContract | null> {
  try {
    const result = await infoClient.query<SingleVaultDetailsQuery>({
      query: SingleVaultDetailsDocument,
      variables: {
        vaultId: vaultId.toLowerCase(),
      },
    });

    if (!result.data) {
      throw new Error("No data returned from query");
    }

    // Add data validation and transformation here if needed
    return vaultQueryResToVaultContract(result.data.ichiVault as IchiVault);
  } catch (error) {
    console.error("Error fetching vault details:", error);
    // Return an empty or default response structure
    return null;
  }
}
