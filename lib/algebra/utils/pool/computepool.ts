import { defaultAbiCoder } from "@ethersproject/abi";
import { getAddress, getCreate2Address } from "@ethersproject/address";
import { keccak256 } from "@ethersproject/solidity";
import { keccak256 as keccak256BytesOnly } from "@ethersproject/keccak256";
import { BytesLike, zeroPad, concat } from "@ethersproject/bytes";
import { toUtf8Bytes } from "@ethersproject/strings";
import { Token } from "@cryptoalgebra/custom-pools-sdk";
import { POOL_DEPLOYER_ADDRESSES } from "@cryptoalgebra/custom-pools-sdk";
import { zeroAddress } from "viem";
import {
  CUSTOM_POOL_DEPLOYER,
  POOL_INIT_CODE_HASH,
  ALGEBRA_POOL_DEPLOYER,
} from "@/data/algebra/addresses";

/**
 * Computes a pool address
 * @param poolDeployer The Algebra Pool Deployer address
 * @param tokenA The first token of the pair, irrespective of sort order
 * @param tokenB The second token of the pair, irrespective of sort order
 * @param initCodeHashManualOverride The initial code hash override
 * @returns The pool address
 */
export function computePoolAddress({
  tokenA,
  tokenB,
  initCodeHashManualOverride,
  poolDeployer,
}: {
  tokenA: Token;
  tokenB: Token;
  initCodeHashManualOverride?: string;
  poolDeployer?: string;
}): string {
  const [token0, token1] = tokenA.sortsBefore(tokenB)
    ? [tokenA, tokenB]
    : [tokenB, tokenA];

  console.log("poolDeployer ?? zeroAddress", poolDeployer ?? zeroAddress);

  return getCreate2Address(
    poolDeployer ?? ALGEBRA_POOL_DEPLOYER,
    keccak256(
      ["bytes"],
      [
        defaultAbiCoder.encode(
          ["address", "address"],
          [token0.address, token1.address]
        ),
      ]
    ),
    initCodeHashManualOverride ?? POOL_INIT_CODE_HASH
  );
}

export function computeCustomPoolAddress({
  tokenA,
  tokenB,
  customPoolDeployer,
  initCodeHashManualOverride,
  mainPoolDeployer,
}: {
  tokenA: Token;
  tokenB: Token;
  customPoolDeployer: string;
  initCodeHashManualOverride?: string;
  mainPoolDeployer?: string;
}): string {
  const [token0, token1] = tokenA.sortsBefore(tokenB)
    ? [tokenA, tokenB]
    : [tokenB, tokenA];
  return getCreate2Address(
    mainPoolDeployer ?? CUSTOM_POOL_DEPLOYER,
    keccak256(
      ["bytes"],
      [
        defaultAbiCoder.encode(
          ["address", "address", "address"],
          [customPoolDeployer, token0.address, token1.address]
        ),
      ]
    ),
    initCodeHashManualOverride ?? POOL_INIT_CODE_HASH
  );
}
