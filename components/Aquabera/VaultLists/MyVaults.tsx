import { Button } from "@/components/button";
import TokenLogo from "@/components/TokenLogo/TokenLogo";
import { getAccountVaultsList } from "@/lib/algebra/graphql/clients/vaults";
import {
  AccountVaultSharesQuery,
  AccountVaultSharesQueryResult,
  VaultShare,
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
          <TableColumn>Vault Shares</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {myVaults?.vaultShares.map((vaultShare, index) => {
            console.log("vaultShare", vaultShare);
            const tokenA = Token.getToken({
              address: vaultShare.vault.tokenA,
            });

            const tokenB = Token.getToken({
              address: vaultShare.vault.tokenB,
            });

            tokenA.init();
            tokenB.init();

            return (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex">
                    {vaultShare.vault.tokenA && <TokenLogo token={tokenA} />}
                    {vaultShare.vault.tokenB && <TokenLogo token={tokenB} />}
                  </div>
                </TableCell>
                <TableCell>{vaultShare.vault.id}</TableCell>
                <TableCell>{vaultShare.vaultShareBalance}</TableCell>

                <TableCell>
                  <div className="flex">
                    <Button
                      onClick={() => {
                        const vault = new ICHIVaultContract({
                          address: vaultShare.vault.id as Address,
                        });
                      }}
                    >
                      Deposit
                    </Button>
                    <Button
                      onClick={async () => {
                        const vault = new ICHIVaultContract({
                          address: vaultShare.vault.id as Address,
                        });

                        const balance = await vault.getBalanceOf(
                          wallet.account
                        );

                        vault.withdraw(balance, wallet.account);
                      }}
                    >
                      Withdraw
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          }) || []}
        </TableBody>
      </Table>
    </div>
  );
}

export default MyAquaberaVaults;
