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
import { Token as AlgebraToken } from "@cryptoalgebra/sdk";
import { Currency } from "@cryptoalgebra/sdk";
import { DepositToVaultModal } from "../modals/DepositToVaultModal";

export function MyAquaberaVaults() {
  const [myVaults, setMyVaults] = useState<AccountVaultSharesQuery>();
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [selectedVault, setSelectedVault] = useState<ICHIVaultContract | null>(
    null
  );
  const [selectedTokenA, setSelectedTokenA] = useState<Currency | null>(null);
  const [selectedTokenB, setSelectedTokenB] = useState<Currency | null>(null);

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
                        setSelectedVault(vault);
                        setSelectedTokenA(
                          new AlgebraToken(
                            wallet.currentChainId,
                            tokenA.address as `0x${string}`,
                            tokenA.decimals,
                            tokenA.symbol,
                            tokenA.name
                          )
                        );
                        setSelectedTokenB(
                          new AlgebraToken(
                            wallet.currentChainId,
                            tokenB.address as `0x${string}`,
                            tokenB.decimals,
                            tokenB.symbol,
                            tokenB.name
                          )
                        );
                        setIsDepositModalOpen(true);
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
      {selectedVault && selectedTokenA && selectedTokenB && (
        <DepositToVaultModal
          isOpen={isDepositModalOpen}
          onClose={() => {
            setIsDepositModalOpen(false);
            setSelectedVault(null);
            setSelectedTokenA(null);
            setSelectedTokenB(null);
          }}
          vault={selectedVault}
          tokenA={selectedTokenA}
          tokenB={selectedTokenB}
        />
      )}
    </div>
  );
}

export default MyAquaberaVaults;
