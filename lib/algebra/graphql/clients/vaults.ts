import { infoClient } from ".";
import {
  AccountVaultSharesDocument,
  AccountVaultSharesQuery,
  AccountVaultSharesQueryResult,
  VaultShare,
} from "../generated/graphql";
import { ACCOUNT_VAULT_SHARES } from "../queries/vaults";

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
