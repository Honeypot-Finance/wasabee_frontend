import { gql } from "@apollo/client";

export const ACCOUNT_VAULT_SHARES = gql`
  query AccountVaultShares($AccountId: ID!) {
    vaultShares(where: { user_: { id: $AccountId }, vaultShareBalance_gt: 0 }) {
      ...VaultSharesField
      id
    }
  }
`;

export const VAULT_USER_FRAMGMENT = gql`
  fragment VaultUserField on Account {
    id
  }
`;

export const VAULT_SHARE_FRAGMENT = gql`
  fragment VaultSharesField on VaultShare {
    id
    user {
      ...VaultUserField
    }
    vault {
      ...VaultField
    }
    vaultShareBalance
  }
`;

export const VAULT_FRAGMENT = gql`
  fragment VaultField on IchiVault {
    id
    sender
    tokenA
    allowTokenA
    tokenB
    allowTokenB
    count
    createdAtTimestamp
    holdersCount
  }
`;
