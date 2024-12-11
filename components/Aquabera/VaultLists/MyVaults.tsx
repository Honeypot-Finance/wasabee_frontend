import { getAccountVaultsList } from "@/lib/algebra/graphql/clients/vaults";
import {
  AccountVaultSharesQuery,
  AccountVaultSharesQueryResult,
  VaultShare,
} from "@/lib/algebra/graphql/generated/graphql";
import { wallet } from "@/services/wallet";
import { Tabs, Tab } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useEffect, useState } from "react";

export function MyAquaberaVaults() {
  const [myVaults, setMyVaults] = useState<AccountVaultSharesQuery>();

  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }

    loadMyVaults(wallet.account);
  }, [wallet.isInit]);

  const loadMyVaults = async (accountAddress: string) => {
    const myVaultsQuery = await getAccountVaultsList(accountAddress);

    setMyVaults(myVaultsQuery);
  };

  return (
    <div>
      <Table
        aria-label="my-vaults"
        classNames={{
          base: "w-full",
          table: "w-full",
          thead: "w-full",
        }}
      >
        <TableHeader>
          <TableColumn>Vault Address</TableColumn>
          <TableColumn>Vault Owner</TableColumn>
          <TableColumn>Token A</TableColumn>
          <TableColumn>Token B</TableColumn>
        </TableHeader>
        <TableBody>
          {myVaults?.vaultShares.map((vault, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{vault.vault?.id}</TableCell>
                <TableCell>{vault.user?.id}</TableCell>
                <TableCell>{vault.vault?.tokenA}</TableCell>
                <TableCell>{vault.vault?.tokenB}</TableCell>
              </TableRow>
            );
          }) || []}
        </TableBody>
      </Table>
    </div>
  );
}

export default MyAquaberaVaults;
