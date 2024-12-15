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
import { ChevronUp, ChevronDown } from "lucide-react";

type SortField = "pair" | "address" | "tvl" | "volume" | "fees";
type SortDirection = "asc" | "desc";

export function AllAquaberaVaults() {
  const router = useRouter();
  const [vaults, setVaults] = useState<VaultsSortedByHoldersQuery>();
  const [sortField, setSortField] = useState<SortField>("tvl");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
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

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getSortedVaults = () => {
    if (!vaults?.ichiVaults) return [];

    return [...vaults.ichiVaults].sort((a, b) => {
      const multiplier = sortDirection === "asc" ? 1 : -1;

      switch (sortField) {
        case "pair":
          const aSymbol = Token.getToken({ address: a.tokenA }).symbol;
          const bSymbol = Token.getToken({ address: b.tokenA }).symbol;
          return multiplier * aSymbol.localeCompare(bSymbol);
        case "address":
          return multiplier * a.id.localeCompare(b.id);
        case "tvl":
          return (
            multiplier *
            (Number(a.pool?.totalValueLockedUSD || 0) -
              Number(b.pool?.totalValueLockedUSD || 0))
          );
        case "volume":
          return (
            multiplier *
            (Number(a.pool?.poolDayData?.[0]?.volumeUSD || 0) -
              Number(b.pool?.poolDayData?.[0]?.volumeUSD || 0))
          );
        case "fees":
          return (
            multiplier *
            (Number(a.pool?.poolDayData?.[0]?.feesUSD || 0) -
              Number(b.pool?.poolDayData?.[0]?.feesUSD || 0))
          );
        default:
          return 0;
      }
    });
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
          <TableColumn key="pair">
            <div className="cursor-pointer" onClick={() => handleSort("pair")}>
              <div className="flex items-center gap-2">
                <span>Token Pair</span>
                <div className="flex flex-col">
                  <ChevronUp
                    className={`h-3 w-3 ${sortField === "pair" && sortDirection === "asc" ? "text-[#F7931A]" : "text-gray-400"}`}
                  />
                  <ChevronDown
                    className={`h-3 w-3 ${sortField === "pair" && sortDirection === "desc" ? "text-[#F7931A]" : "text-gray-400"}`}
                  />
                </div>
              </div>
            </div>
          </TableColumn>
          <TableColumn key="address">
            <div
              className="cursor-pointer"
              onClick={() => handleSort("address")}
            >
              <div className="flex items-center gap-2">
                <span>Vault Address</span>
                <div className="flex flex-col">
                  <ChevronUp
                    className={`h-3 w-3 ${sortField === "address" && sortDirection === "asc" ? "text-[#F7931A]" : "text-gray-400"}`}
                  />
                  <ChevronDown
                    className={`h-3 w-3 ${sortField === "address" && sortDirection === "desc" ? "text-[#F7931A]" : "text-gray-400"}`}
                  />
                </div>
              </div>
            </div>
          </TableColumn>
          <TableColumn key="tvl">
            <div className="cursor-pointer" onClick={() => handleSort("tvl")}>
              <div className="flex items-center gap-2">
                <span>TVL</span>
                <div className="flex flex-col">
                  <ChevronUp
                    className={`h-3 w-3 ${sortField === "tvl" && sortDirection === "asc" ? "text-[#F7931A]" : "text-gray-400"}`}
                  />
                  <ChevronDown
                    className={`h-3 w-3 ${sortField === "tvl" && sortDirection === "desc" ? "text-[#F7931A]" : "text-gray-400"}`}
                  />
                </div>
              </div>
            </div>
          </TableColumn>
          <TableColumn key="volume">
            <div
              className="cursor-pointer"
              onClick={() => handleSort("volume")}
            >
              <div className="flex items-center gap-2">
                <span>24h Volume</span>
                <div className="flex flex-col">
                  <ChevronUp
                    className={`h-3 w-3 ${sortField === "volume" && sortDirection === "asc" ? "text-[#F7931A]" : "text-gray-400"}`}
                  />
                  <ChevronDown
                    className={`h-3 w-3 ${sortField === "volume" && sortDirection === "desc" ? "text-[#F7931A]" : "text-gray-400"}`}
                  />
                </div>
              </div>
            </div>
          </TableColumn>
          <TableColumn key="fees">
            <div className="cursor-pointer" onClick={() => handleSort("fees")}>
              <div className="flex items-center gap-2">
                <span>24h Fees</span>
                <div className="flex flex-col">
                  <ChevronUp
                    className={`h-3 w-3 ${sortField === "fees" && sortDirection === "asc" ? "text-[#F7931A]" : "text-gray-400"}`}
                  />
                  <ChevronDown
                    className={`h-3 w-3 ${sortField === "fees" && sortDirection === "desc" ? "text-[#F7931A]" : "text-gray-400"}`}
                  />
                </div>
              </div>
            </div>
          </TableColumn>
        </TableHeader>
        <TableBody>
          {getSortedVaults().map((vault) => {
            const tokenA = Token.getToken({ address: vault.tokenA });
            const tokenB = Token.getToken({ address: vault.tokenB });

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
          })}
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
