import { Button } from "@/components/button";
import TokenLogo from "@/components/TokenLogo/TokenLogo";
import {
  getAccountVaultsList,
  getVaultPageData,
} from "@/lib/algebra/graphql/clients/vaults";
import {
  AccountVaultSharesQuery,
  AccountVaultSharesQueryResult,
  VaultShare,
  VaultsSortedByHoldersQuery,
} from "@/lib/algebra/graphql/generated/graphql";
import { ICHIVaultContract } from "@/services/contract/aquabera/ICHIVault-contract";
import { Token } from "@/services/contract/token";
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
import { Address } from "viem";

export function AllAquaberaVaults() {
  const [vaults, setVaults] = useState<VaultsSortedByHoldersQuery>();

  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }

    loadMyVaults();
  }, [wallet.isInit]);

  const loadMyVaults = async () => {
    const vaultsQuery = await getVaultPageData();

    setVaults(vaultsQuery);
  };

  return (
    <div className="w-full">
      <Table
        aria-label="my-vaults"
        classNames={{
          base: "w-full",
          table: "w-full",
          thead: "w-full",
        }}
      >
        <TableHeader>
          <TableColumn>Token Pair</TableColumn>
          <TableColumn>Vault Address</TableColumn>
        </TableHeader>
        <TableBody>
          {vaults?.ichiVaults.map((vault, index) => {
            const tokenA = Token.getToken({
              address: vault.tokenA,
            });

            const tokenB = Token.getToken({
              address: vault.tokenB,
            });

            tokenA.init();
            tokenB.init();

            return (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex">
                    {vault.tokenA && <TokenLogo token={tokenA} />}
                    {vault.tokenB && <TokenLogo token={tokenB} />}
                  </div>
                </TableCell>
                <TableCell>{vault.id}</TableCell>
              </TableRow>
            );
          }) || []}
        </TableBody>
      </Table>
    </div>
  );
}

export default AllAquaberaVaults;
