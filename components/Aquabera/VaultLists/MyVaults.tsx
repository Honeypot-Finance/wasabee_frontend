import { useRouter } from "next/router";
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
import { Token as AlgebraToken } from "@cryptoalgebra/sdk";
import { Currency } from "@cryptoalgebra/sdk";
import { DepositToVaultModal } from "../modals/DepositToVaultModal";
import { HoneyContainer } from "@/components/CardContianer";

export function MyAquaberaVaults() {
  const router = useRouter();
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
    <HoneyContainer className="w-full">
      <div className="w-full">
        <Table
          aria-label="my-vaults"
          classNames={{
            base: "w-full text-white",
            table: "w-full text-white",
            thead: "w-full text-white",
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
            <TableColumn>My Vault Shares</TableColumn>
          </TableHeader>
          <TableBody>
            {myVaults?.vaultShares.map((vaultShare, index) => {
              const tokenA = Token.getToken({
                address: vaultShare.vault.tokenA,
              });

              const tokenB = Token.getToken({
                address: vaultShare.vault.tokenB,
              });

              tokenA.init();
              tokenB.init();

              const tvl = Number(
                vaultShare.vault.pool?.totalValueLockedUSD || 0
              ).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              });

              const volume = Number(
                vaultShare.vault.pool?.poolDayData?.[0]?.volumeUSD || 0
              ).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              });

              const fees = Number(
                vaultShare.vault.pool?.poolDayData?.[0]?.feesUSD || 0
              ).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              });

              return (
                <TableRow
                  key={vaultShare.vault.id}
                  className="cursor-pointer hover:bg-[#F7931A10]"
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {vaultShare.vault.tokenA && <TokenLogo token={tokenA} />}
                      {vaultShare.vault.tokenB && <TokenLogo token={tokenB} />}
                      <span>
                        {tokenA.symbol}/{tokenB.symbol}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{vaultShare.vault.id}</TableCell>
                  <TableCell>{tvl}</TableCell>
                  <TableCell>{volume}</TableCell>
                  <TableCell>{fees}</TableCell>
                  <TableCell>{vaultShare.vaultShareBalance}</TableCell>
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
    </HoneyContainer>
  );
}

export default MyAquaberaVaults;
