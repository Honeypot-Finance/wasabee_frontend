// pages/vault/[address].tsx
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { ICHIVaultContract } from "@/services/contract/aquabera/ICHIVault-contract";
import { Token } from "@/services/contract/token";
import { Address } from "viem";
import { Button } from "@/components/button/button-next";
import TokenLogo from "@/components/TokenLogo/TokenLogo";
import { DepositToVaultModal } from "@/components/Aquabera/modals/DepositToVaultModal";
import { wallet } from "@/services/wallet";
import { Token as AlgebraToken } from "@cryptoalgebra/sdk";
import { useReadErc20BalanceOf } from "@/wagmi-generated";
import { WithdrawFromVaultModal } from "@/components/Aquabera/modals/WithdrawFromVaultModal";
import { getSingleVaultDetails } from "@/lib/algebra/graphql/clients/vaults";
import { SingleVaultDetailsQuery } from "@/lib/algebra/graphql/generated/graphql";

export default function VaultDetail() {
  const router = useRouter();
  const { address } = router.query;
  const [vault, setVault] = useState<ICHIVaultContract | null>(null);
  const [tokenA, setTokenA] = useState<Token | null>(null);
  const [tokenB, setTokenB] = useState<Token | null>(null);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [totalSupply, setTotalSupply] = useState<bigint>(BigInt(0));
  const [userShares, setUserShares] = useState<bigint>(BigInt(0));
  const [fees, setFees] = useState<number>(0);
  const [tvl, setTvl] = useState<string>("$0");
  const [volume24h, setVolume24h] = useState<string>("$0");
  const [fees24h, setFees24h] = useState<string>("$0");
  const [vaultData, setVaultData] = useState<SingleVaultDetailsQuery | null>(
    null
  );

  useEffect(() => {
    if (address && typeof address === "string") {
      const vaultContract = new ICHIVaultContract({
        address: address as Address,
      });
      setVault(vaultContract);

      // Fetch token addresses and pool data
      const loadVaultData = async () => {
        const token0Address = await vaultContract.contract.read.token0();
        const token1Address = await vaultContract.contract.read.token1();

        const token0 = Token.getToken({ address: token0Address });
        const token1 = Token.getToken({ address: token1Address });

        await token0.init();
        await token1.init();

        setTokenA(token0);
        setTokenB(token1);

        // Get total supply
        const supply = await vaultContract.contract.read.totalSupply();
        setTotalSupply(supply);

        // Get user shares if wallet connected
        if (wallet.account) {
          const shares = await vaultContract.getBalanceOf(wallet.account);
          setUserShares(shares);
        }

        // Get vault data from subgraph
        const vaultDetails = await getSingleVaultDetails(address);
        setVaultData(vaultDetails);

        if (vaultDetails.ichiVault) {
          setTvl(
            Number(
              vaultDetails.ichiVault.pool?.totalValueLockedUSD || 0
            ).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
          );

          const latestDayData = vaultDetails.ichiVault.pool?.poolDayData[0];
          if (latestDayData) {
            setVolume24h(
              Number(latestDayData.volumeUSD || 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            );

            setFees24h(
              Number(latestDayData.feesUSD || 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            );
          }
        }
      };

      loadVaultData();
    }
  }, [address, wallet.account]);

  const userBalance = useReadErc20BalanceOf({
    address: address as `0x${string}`,
    args: [wallet.account as `0x${string}`],
  });

  const hasShares = userShares > BigInt(0);

  // Add a function to refresh vault data
  const refreshVaultData = useCallback(async () => {
    if (!vault || !wallet.account) return;

    // Get total supply
    const supply = await vault.contract.read.totalSupply();
    setTotalSupply(supply);

    // Get user shares
    const shares = await vault.getBalanceOf(wallet.account);
    setUserShares(shares);

    // Get fees
    const fee = await vault.getFee();
    setFees(fee);

    // Refresh subgraph data
    if (address && typeof address === "string") {
      const vaultDetails = await getSingleVaultDetails(address);
      setVaultData(vaultDetails);
    }
  }, [vault, wallet.account, address]);

  // Format number with 18 decimals
  const formatShares = (value: bigint) => {
    const divisor = BigInt(10 ** 18); // Always use 18 decimals for shares
    const integerPart = value / divisor;
    const fractionalPart = value % divisor;

    // Convert to string and pad with zeros if needed
    const fractionalStr = fractionalPart.toString().padStart(18, "0");

    // Show up to 6 decimal places for better readability
    const displayDecimals = 18;
    const formattedFractional = fractionalStr.slice(0, displayDecimals);

    // Remove trailing zeros
    const trimmedFractional = formattedFractional.replace(/0+$/, "");

    return trimmedFractional
      ? `${integerPart}.${trimmedFractional}`
      : integerPart.toString();
  };

  // Merge all transactions into one array and sort by timestamp
  const allTransactions = [
    ...(vaultData?.ichiVault?.vaultDeposits?.map((tx) => ({
      ...tx,
      type: "deposit",
    })) ?? []),
    ...(vaultData?.ichiVault?.vaultWithdraws?.map((tx) => ({
      ...tx,
      type: "withdraw",
    })) ?? []),
    ...(vaultData?.ichiVault?.vaultCollectFees?.map((tx) => ({
      ...tx,
      to: tx.sender,
      type: "fee",
    })) ?? []),
  ].sort((a, b) => Number(b.createdAtTimestamp) - Number(a.createdAtTimestamp));

  return (
    <div className="w-full">
      <div className="max-w-[1200px] w-full mx-auto bg-[#FFCD4D] rounded-3xl relative overflow-hidden">
        {/* 添加顶部装饰边框 */}
        <div className="bg-[url('/images/pumping/outline-border.png')] bg-contain bg-repeat-x bg-left-top h-[90px] absolute -top-1 left-0 w-full"></div>
        
        <div className="max-w-[1200px] w-full mx-auto px-6 pt-[90px] pb-[70px]">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              onClick={() => router.push("/pools")}
              className="flex items-center gap-2 bg-[#202020] hover:bg-[#2a2a2a] text-white px-4 py-2 rounded-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Vaults
            </Button>
          </div>

          {/* Main Content */}
          <div className="bg-[#202020] rounded-2xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 border-b border-[#5C5C5C] pb-4">
              <div className="flex items-center gap-2">
                {tokenA && tokenB && (
                  <>
                    <TokenLogo token={tokenA} />
                    <TokenLogo token={tokenB} />
                    <span className="text-xl font-bold text-white">
                      {tokenA.symbol}/{tokenB.symbol}
                    </span>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsDepositModalOpen(true)}
                  disabled={!wallet.account}
                  className="bg-[#FFCD4D] hover:bg-[#ffd666] text-black"
                >
                  Deposit
                </Button>
                {hasShares && (
                  <>
                    <Button
                      onClick={() => setIsWithdrawModalOpen(true)}
                      disabled={!wallet.account}
                      // className="bg-[#323232] hover:bg-[#3a3a3a]"
                    >
                      Withdraw
                    </Button>
                    <Button 
                      onClick={() => vault?.collectFees()}
                      // className="bg-[#323232] hover:bg-[#3a3a3a]"
                    >
                      Collect Fees {fees}
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { title: "Total Supply", value: formatShares(totalSupply) },
                { title: "Your Shares", value: formatShares(userShares) },
                { 
                  title: "Share Percentage", 
                  value: `${totalSupply > BigInt(0)
                    ? ((Number(userShares) / Number(totalSupply)) * 100).toFixed(2)
                    : "0"}%` 
                },
                { title: "Total Value Locked", value: tvl },
                { title: "24h Volume", value: volume24h },
                { title: "24h Fees", value: fees24h }
              ].map((stat, index) => (
                <div key={index} className="bg-[#323232] rounded-xl p-5">
                  <div className="text-gray-400 text-sm mb-2">{stat.title}</div>
                  <div className="text-white text-xl font-medium">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            {vaultData?.ichiVault && (
              <div className="bg-[#323232] rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold mb-4 text-white">Recent Activity</h3>
                <div className="space-y-4">
                  {allTransactions.map((tx) => (
                    <div key={tx.id} className="flex justify-between items-center border-b border-[#5C5C5C] pb-3">
                      <div>
                        {tx.type === "deposit" && (
                          <span className="inline-block px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm">Deposit</span>
                        )}
                        {tx.type === "withdraw" && (
                          <span className="inline-block px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-sm">Withdraw</span>
                        )}
                        {tx.type === "fee" && (
                          <span className="inline-block px-3 py-1 bg-[#FFCD4D]/20 text-[#FFCD4D] rounded-full text-sm">Fee Collection</span>
                        )}
                        {tx.to && (
                          <span className="text-gray-400 ml-2">
                            by {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(Number(tx.createdAtTimestamp) * 1000).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vault Info */}
            <div className="bg-[#323232] rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4 text-white">Vault Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Vault Address</p>
                  <p className="font-mono text-white p-2 rounded-lg">{address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Token Addresses</p>
                  <p className="font-mono text-white p-2 rounded-lg mb-2">{tokenA?.address}</p>
                  <p className="font-mono text-white p-2 rounded-lg">{tokenB?.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 添加底部装饰边框 */}
        <div className="absolute -bottom-1 left-0 w-full">
          <div className="bg-[url('/images/pool-detail/bottom-border.svg')] bg-contain bg-repeat-x bg-left-bottom h-[70px] w-full"></div>
        </div>
      </div>

      {/* 保持原有的 Modals... */}
      {vault && tokenA && tokenB && (
        <>
          <DepositToVaultModal
            isOpen={isDepositModalOpen}
            onClose={() => {
              setIsDepositModalOpen(false);
              refreshVaultData(); // Refresh after closing deposit modal
            }}
            vault={vault}
            tokenA={
              new AlgebraToken(
                wallet.currentChainId,
                tokenA.address as `0x${string}`,
                tokenA.decimals,
                tokenA.symbol,
                tokenA.name
              )
            }
            tokenB={
              new AlgebraToken(
                wallet.currentChainId,
                tokenB.address as `0x${string}`,
                tokenB.decimals,
                tokenB.symbol,
                tokenB.name
              )
            }
          />
          <WithdrawFromVaultModal
            isOpen={isWithdrawModalOpen}
            onClose={() => {
              setIsWithdrawModalOpen(false);
              refreshVaultData(); // Refresh after closing withdraw modal
            }}
            vault={vault}
            maxShares={userShares}
          />
        </>
      )}
    </div>
  );
}
