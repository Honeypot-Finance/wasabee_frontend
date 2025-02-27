import TokenLogo from "@/components/TokenLogo/TokenLogo";
import { Token } from "@/services/contract/token";
import {
  useReadIchiVaultAllowToken0,
  useReadIchiVaultAllowToken1,
} from "@/wagmi-generated";
import { useEffect } from "react";

export default function VaultRow({
  vault,
  setAllowToken,
}: {
  vault: any;
  setAllowToken: (vault: any, token: any) => void;
}) {
  const tokenA = Token.getToken({ address: vault.tokenA });
  const tokenB = Token.getToken({ address: vault.tokenB });

  const isTokenAAllowed = useReadIchiVaultAllowToken0({
    address: vault.id as `0x${string}`,
  });

  const isTokenBAllowed = useReadIchiVaultAllowToken1({
    address: vault.id as `0x${string}`,
  });

  tokenA.init();
  tokenB.init();

  useEffect(() => {
    if (isTokenAAllowed.data) {
      setAllowToken(vault, tokenA);
    }

    if (isTokenBAllowed.data) {
      setAllowToken(vault, tokenB);
    }
  }, [
    isTokenAAllowed.data,
    isTokenBAllowed.data,
    tokenA,
    tokenB,
    vault,
    setAllowToken,
  ]);

  const tvl = Number(vault.pool?.totalValueLockedUSD || 0).toLocaleString(
    "en-US",
    {
      style: "currency",
      currency: "USD",
    }
  );

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
    <tr
      className="transition-colors bg-white text-black hover:bg-gray-50 cursor-pointer"
      onClick={() => (window.location.href = `/vault/${vault.id}`)}
    >
      {/* Token pair */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <TokenLogo
              token={tokenA}
              addtionalClasses="translate-x-[25%]"
              size={24}
            />
            <TokenLogo
              token={tokenB}
              addtionalClasses="translate-x-[-25%]"
              size={24}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-black font-medium">
              {tokenA.symbol}/{tokenB.symbol}
            </p>
          </div>
        </div>
      </td>
      {/* allow token */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {isTokenAAllowed.data && (
              <TokenLogo
                token={tokenA}
                size={24}
              />
            )}
            {isTokenBAllowed.data && (
              <TokenLogo
                token={tokenB}
                size={24}
              />
            )}
          </div>
          <div className="flex">
            <p className="text-black font-medium">
              {isTokenAAllowed.data && tokenA.symbol}
              {isTokenBAllowed.data && tokenB.symbol}
            </p>
          </div>
        </div>
      </td>
      {/* vault address */}
      {/* <td className="py-4 px-6 text-black">{vault.id}</td> */}
      {/* tvl */}
      <td className="py-4 px-6 text-right text-black">{tvl}</td>
      {/* volume */}
      <td className="py-4 px-6 text-right text-black">{volume}</td>
      {/* fees */}
      <td className="py-4 px-6 text-right text-black">{fees}</td>
    </tr>
  );
}
