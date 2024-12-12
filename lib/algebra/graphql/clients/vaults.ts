import { infoClient } from ".";
import {
  AccountVaultSharesDocument,
  AccountVaultSharesQuery,
  AccountVaultSharesQueryResult,
  VaultShare,
  VaultsSortedByHoldersDocument,
  VaultsSortedByHoldersQuery,
} from "../generated/graphql";
import {
  ACCOUNT_VAULT_SHARES,
  VAULTS_SORTED_BY_HOLDERS,
} from "../queries/vaults";

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

export async function getVaultPageData(): Promise<VaultsSortedByHoldersQuery> {
  console.log(VAULTS_SORTED_BY_HOLDERS);
  const vaults = await infoClient.query<VaultsSortedByHoldersQuery>({
    query: VaultsSortedByHoldersDocument,
  });

  return vaults.data;
}
