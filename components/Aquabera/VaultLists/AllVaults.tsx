import { useRouter } from "next/router";
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
import { Tabs, Tab, Link } from "@nextui-org/react";
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
  const router = useRouter();
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
        selectionMode="single"
        onRowAction={(key) => router.push(`/vault/${key}`)}
      >
        <TableHeader>
          <TableColumn>Token Pair</TableColumn>
          <TableColumn>Vault Address</TableColumn>
          <TableColumn>TVL</TableColumn>
          <TableColumn>24h Volume</TableColumn>
          <TableColumn>24h Fees</TableColumn>
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

            const tvl = Number(
              vault.pool?.totalValueLockedUSD || 0
            ).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            });

            const volume = Number(
              vault.pool?.poolDayData?.[0]?.volumeUSD || 0
            ).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            });

            const fees = Number(
              vault.pool?.poolDayData?.[0]?.feesUSD || 0
            ).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            });

            return (
              <TableRow
                key={vault.id}
                className="cursor-pointer hover:bg-[#F7931A10]"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    {vault.tokenA && <TokenLogo token={tokenA} />}
                    {vault.tokenB && <TokenLogo token={tokenB} />}
                    <span>
                      {tokenA.symbol}/{tokenB.symbol}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{vault.id}</TableCell>
                <TableCell>{tvl}</TableCell>
                <TableCell>{volume}</TableCell>
                <TableCell>{fees}</TableCell>
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
