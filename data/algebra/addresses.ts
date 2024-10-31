import { ADDRESS_ZERO } from "@cryptoalgebra/integral-sdk";
import { Address } from "viem";

/** 
Algebra Integral 1.2 - https://github.com/cryptoalgebra/Algebra/tree/integral-v1.2
Bartio testnet scan - https://bartio.beratrail.io

Wbera: 0x7507c1dc16935B82698e4C63f2746A2fCf994dF8
POOL_INIT_CODE_HASH:
0x3093a65c28d1e6def42997fdea76d033dfd42b432c107e19412cf91a1eac0f91

Contracts: 
AlgebraPoolDeployer deployed to: 0x805488DaA81c1b9e7C5cE3f1DCeA28F21448EC6A
AlgebraFactory deployed to: 0xab49321DF952315E208a2B7046A00d2015E39cba
AlgebraCommunityVault deployed to: 0x59a662Ed724F19AD019307126CbEBdcF4b57d6B1
AlgebraVaultFactoryStub deployed to: 0x95E325A85B9E6cB4DeA2ccd96218e5F8365E0B0F
PluginFactory to: 0x13fcE0acbe6Fb11641ab753212550574CaD31415
Updated plugin factory address in factory
EntryPoint deployed to: 0xa77aD9f635a3FB3bCCC5E6d1A87cB269746Aba17
TickLens deployed to: 0xD637cbc214Bc3dD354aBb309f4fE717ffdD0B28C
Quoter deployed to: 0x6AD6A4f233F1E33613e996CCc17409B93fF8bf5f
QuoterV2 deployed to: 0x69D57B9D705eaD73a5d2f2476C30c55bD755cc2F
SwapRouter deployed to: 0xB4F9b6b019E75CBe51af4425b2Fc12797e2Ee2a1
NonfungibleTokenPositionDescriptor deployed to: 0x658E287E9C820484f5808f687dC4863B552de37D
Proxy deployed to: 0x49BE8AA6c684b15e0C5450e8Fa0b16Bec1435596
NonfungiblePositionManager deployed to: 0xAbAc6f23fdf1313FC2E9C9244f666157CcD32990
AlgebraInterfaceMulticall deployed to: 0x28DeD2af752655Df5Ee92450DC259F92a5ABe449
Compiled 25 Solidity files successfully (evm target: paris).
AlgebraEternalFarming deployed to: 0x38A5C36FA8c8c9E4649b51FCD61810B14e7ce047
FarmingCenter deployed to: 0x83D4a9Ea77a4dbA073cD90b30410Ac9F95F93E7C

please accept the ownership here - https://bartio.beratrail.io/address/0xab49321DF952315E208a2B7046A00d2015E39cba/contract/80084/writeContract#F1
 */

export const POOL_INIT_CODE_HASH: Address =
  "0x3093a65c28d1e6def42997fdea76d033dfd42b432c107e19412cf91a1eac0f91";

export const ALGEBRA_FACTORY: Address =
  "0xab49321DF952315E208a2B7046A00d2015E39cba";

export const ALGEBRA_POOL_DEPLOYER: Address =
  "0x805488DaA81c1b9e7C5cE3f1DCeA28F21448EC6A";

export const ALGEBRA_POSITION_MANAGER: Address =
  "0xAbAc6f23fdf1313FC2E9C9244f666157CcD32990";

export const ALGEBRA_QUOTER: Address =
  "0x6AD6A4f233F1E33613e996CCc17409B93fF8bf5f";

export const ALGEBRA_QUOTER_V2: Address =
  "0x69D57B9D705eaD73a5d2f2476C30c55bD755cc2F";

export const ALGEBRA_ROUTER: Address =
  "0xB4F9b6b019E75CBe51af4425b2Fc12797e2Ee2a1";

export const ALGEBRA_ETERNAL_FARMING: Address =
  "0x38A5C36FA8c8c9E4649b51FCD61810B14e7ce047";

export const FARMING_CENTER: Address =
  "0x83D4a9Ea77a4dbA073cD90b30410Ac9F95F93E7C";

// Custom pools
export const CUSTOM_POOL_DEPLOYER_FEE_CHANGER: Address =
  "0x7e3387e0595552e992ede4476417704703866e5a"; // placeholder

export const CUSTOM_POOL_DEPLOYER_BLANK: Address =
  "0xbb75acad36f08201a49a6dd077229d95f4e7bd50"; // placeholder

export const CUSTOM_POOL_BASE: Address = ADDRESS_ZERO;
