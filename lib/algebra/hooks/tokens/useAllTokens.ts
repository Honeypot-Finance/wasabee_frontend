import {
  DEFAULT_NATIVE_SYMBOL,
  DEFAULT_NATIVE_NAME,
} from "@/data/algebra/default-chain-id";

import { useTokensState } from "@/services/algebra/state/tokensStore";
import { Token } from "@/services/contract/token";
import { liquidity } from "@/services/liquidity";
import { TokenFieldsFragment } from "@/types/algebra/types/graphql";
import { ADDRESS_ZERO } from "@cryptoalgebra/custom-pools-sdk";
import { useObserver } from "mobx-react-lite";
import { useMemo } from "react";
import { Address } from "viem";
import { useChainId } from "wagmi";

export function useAllTokens(showNativeToken: boolean = true) {
  const chainId = useChainId();
  const allTokens = useObserver(() => liquidity.tokens.map((token) => token));
  const { importedTokens } = useTokensState();

  const tokensBlackList: Address[] = useMemo(() => [], []);

  const mergedTokens = useMemo(() => {
    const tokens = new Map<Address, TokenFieldsFragment>();

    if (!allTokens) {
      const _importedTokens = Object.values(importedTokens[chainId] || []);
      for (const token of _importedTokens) {
        tokens.set(token.id.toLowerCase() as Address, {
          ...token,
          derivedMatic: 0,
        });
      }
      //return [...tokens].map(([, token]) => ({ ...token }));
      return Object.values(tokens).map((token) => ({ ...token }));
    }

    if (showNativeToken)
      tokens.set(ADDRESS_ZERO, {
        id: ADDRESS_ZERO,
        symbol: DEFAULT_NATIVE_SYMBOL,
        name: DEFAULT_NATIVE_NAME,
        decimals: 18,
        derivedMatic: 1,
      });

    for (const token of allTokens.filter(
      (token) => !tokensBlackList.includes(token.address as Address)
    )) {
      tokens.set(token.address.toLowerCase() as Address, {
        id: token.address,
        symbol: token.symbol,
        name: token.name,
        decimals: token.decimals,
        derivedMatic: 0,
      });
    }

    const _importedTokens = Object.values(importedTokens[chainId] || []);

    for (const token of _importedTokens) {
      tokens.set(token.id.toLowerCase() as Address, {
        ...token,
        derivedMatic: 0,
      });
    }

    //return [...tokens].map(([, token]) => ({ ...token }));
    return Object.values(tokens).map((token) => ({ ...token }));
  }, [allTokens, importedTokens, tokensBlackList, chainId, showNativeToken]);

  return useMemo(
    () => ({
      tokens: mergedTokens,
      //isLoading: loading || Boolean(allTokens && !mergedTokens.length),
      isLoading: false,
    }),
    [mergedTokens, allTokens]
  );
}
