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
import { Token as AlgebraToken } from "@cryptoalgebra/sdk";
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
import { DepositToVaultModal } from "../modals/DepositToVaultModal";
import { Currency } from "@cryptoalgebra/sdk";

export function AllAquaberaVaults() {
  const [vaults, setVaults] = useState<VaultsSortedByHoldersQuery>();
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
          <TableColumn>Actions</TableColumn>
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
                <TableCell>
                  <div className="flex">
                    <Button
                      onClick={() => {
                        const v = new ICHIVaultContract({
                          address: vault.id as Address,
                        });
                        setSelectedVault(v);
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

export default AllAquaberaVaults;
