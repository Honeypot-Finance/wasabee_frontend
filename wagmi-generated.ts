import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from 'wagmi/codegen'

import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgebraBasePlugin
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const algebraBasePluginAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_pool', internalType: 'address', type: 'address' },
      { name: '_factory', internalType: 'address', type: 'address' },
      { name: '_pluginFactory', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'targetIsTooOld' },
  { type: 'error', inputs: [], name: 'tickOutOfRange' },
  { type: 'error', inputs: [], name: 'transferFailed' },
  { type: 'error', inputs: [], name: 'volatilityOracleAlreadyInitialized' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'baseFee',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
    ],
    name: 'BaseFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newIncentive',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Incentive',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'priceChangeFactor',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PriceChangeFactor',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ALGEBRA_BASE_PLUGIN_MANAGER',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterFlash',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint160', type: 'uint160' },
      { name: 'tick', internalType: 'int24', type: 'int24' },
    ],
    name: 'afterInitialize',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'int24', type: 'int24' },
      { name: '', internalType: 'int24', type: 'int24' },
      { name: '', internalType: 'int128', type: 'int128' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterModifyPosition',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: 'zeroToOne', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'int256', type: 'int256' },
      { name: '', internalType: 'uint160', type: 'uint160' },
      { name: '', internalType: 'int256', type: 'int256' },
      { name: '', internalType: 'int256', type: 'int256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterSwap',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeFlash',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint160', type: 'uint160' },
    ],
    name: 'beforeInitialize',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'int24', type: 'int24' },
      { name: '', internalType: 'int24', type: 'int24' },
      { name: '', internalType: 'int128', type: 'int128' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeModifyPosition',
    outputs: [
      { name: '', internalType: 'bytes4', type: 'bytes4' },
      { name: '', internalType: 'uint24', type: 'uint24' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: 'zeroToOne', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'int256', type: 'int256' },
      { name: '', internalType: 'uint160', type: 'uint160' },
      { name: '', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeSwap',
    outputs: [
      { name: '', internalType: 'bytes4', type: 'bytes4' },
      { name: '', internalType: 'uint24', type: 'uint24' },
      { name: '', internalType: 'uint24', type: 'uint24' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
    ],
    name: 'collectPluginFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultPluginConfig',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentFee',
    outputs: [{ name: 'fee', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPool',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'secondsAgo', internalType: 'uint32', type: 'uint32' }],
    name: 'getSingleTimepoint',
    outputs: [
      { name: 'tickCumulative', internalType: 'int56', type: 'int56' },
      { name: 'volatilityCumulative', internalType: 'uint88', type: 'uint88' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'secondsAgos', internalType: 'uint32[]', type: 'uint32[]' },
    ],
    name: 'getTimepoints',
    outputs: [
      { name: 'tickCumulatives', internalType: 'int56[]', type: 'int56[]' },
      {
        name: 'volatilityCumulatives',
        internalType: 'uint88[]',
        type: 'uint88[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'handlePluginFee',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'incentive',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'targetIncentive', internalType: 'address', type: 'address' },
    ],
    name: 'isIncentiveConnected',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isInitialized',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastTimepointTimestamp',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pool',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'startIndex', internalType: 'uint16', type: 'uint16' },
      { name: 'amount', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'prepayTimepointsStorageSlots',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 's_baseFee',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 's_feeFactors',
    outputs: [
      { name: 'zeroToOneFeeFactor', internalType: 'uint128', type: 'uint128' },
      { name: 'oneToZeroFeeFactor', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 's_priceChangeFactor',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newBaseFee', internalType: 'uint16', type: 'uint16' }],
    name: 'setBaseFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newIncentive', internalType: 'address', type: 'address' },
    ],
    name: 'setIncentive',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newPriceChangeFactor', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'setPriceChangeFactor',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'timepointIndex',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'timepoints',
    outputs: [
      { name: 'initialized', internalType: 'bool', type: 'bool' },
      { name: 'blockTimestamp', internalType: 'uint32', type: 'uint32' },
      { name: 'tickCumulative', internalType: 'int56', type: 'int56' },
      { name: 'volatilityCumulative', internalType: 'uint88', type: 'uint88' },
      { name: 'tick', internalType: 'int24', type: 'int24' },
      { name: 'averageTick', internalType: 'int24', type: 'int24' },
      { name: 'windowStartIndex', internalType: 'uint16', type: 'uint16' },
    ],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgebraCustomPoolDeployer
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const algebraCustomPoolDeployerAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_entryPoint', internalType: 'address', type: 'address' },
      { name: '_plugin', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeCreatePoolHook',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'deployer', internalType: 'address', type: 'address' },
      { name: 'creator', internalType: 'address', type: 'address' },
      { name: 'tokenA', internalType: 'address', type: 'address' },
      { name: 'tokenB', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'createCustomPool',
    outputs: [{ name: 'customPool', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'entryPoint',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'plugin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'poolToPlugin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address' },
      { name: 'newFee', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'setFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address' },
      { name: 'newPluginAddress', internalType: 'address', type: 'address' },
    ],
    name: 'setPlugin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address' },
      { name: 'newConfig', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'setPluginConfig',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address' },
      { name: '_plugin', internalType: 'address', type: 'address' },
    ],
    name: 'setPluginForPool',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address' },
      { name: 'newTickSpacing', internalType: 'int24', type: 'int24' },
    ],
    name: 'setTickSpacing',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgebraEternalFarming
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const algebraEternalFarmingAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_deployer',
        internalType: 'contract IAlgebraPoolDeployer',
        type: 'address',
      },
      {
        name: '_nonfungiblePositionManager',
        internalType: 'contract INonfungiblePositionManager',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'anotherFarmingIsActive' },
  { type: 'error', inputs: [], name: 'claimToZeroAddress' },
  { type: 'error', inputs: [], name: 'emergencyActivated' },
  { type: 'error', inputs: [], name: 'farmDoesNotExist' },
  { type: 'error', inputs: [], name: 'incentiveNotExist' },
  { type: 'error', inputs: [], name: 'incentiveStopped' },
  { type: 'error', inputs: [], name: 'invalidPool' },
  { type: 'error', inputs: [], name: 'invalidTokenAmount' },
  { type: 'error', inputs: [], name: 'minimalPositionWidthTooWide' },
  { type: 'error', inputs: [], name: 'pluginNotConnected' },
  { type: 'error', inputs: [], name: 'poolReentrancyLock' },
  { type: 'error', inputs: [], name: 'positionIsTooNarrow' },
  { type: 'error', inputs: [], name: 'reentrancyLock' },
  { type: 'error', inputs: [], name: 'tokenAlreadyFarmed' },
  { type: 'error', inputs: [], name: 'zeroLiquidity' },
  { type: 'error', inputs: [], name: 'zeroRewardAmount' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'newStatus', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'EmergencyWithdraw',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'rewardToken',
        internalType: 'contract IERC20Minimal',
        type: 'address',
        indexed: true,
      },
      {
        name: 'bonusRewardToken',
        internalType: 'contract IERC20Minimal',
        type: 'address',
        indexed: true,
      },
      {
        name: 'pool',
        internalType: 'contract IAlgebraPool',
        type: 'address',
        indexed: true,
      },
      {
        name: 'virtualPool',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'nonce',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'reward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'bonusReward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'minimalAllowedPositionWidth',
        internalType: 'uint24',
        type: 'uint24',
        indexed: false,
      },
    ],
    name: 'EternalFarmingCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'incentiveId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'rewardAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'bonusRewardToken',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'reward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'bonusReward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FarmEnded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'incentiveId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'liquidity',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
    ],
    name: 'FarmEntered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'farmingCenter',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'FarmingCenter',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'incentiveId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'IncentiveDeactivated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'rewardAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'bonusRewardAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'incentiveId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'RewardAmountsDecreased',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'reward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'rewardAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RewardClaimed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'rewardAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'bonusRewardAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'incentiveId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'RewardsAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'incentiveId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'rewardAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'bonusRewardAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardsCollected',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'rewardRate',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'bonusRewardRate',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'incentiveId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'RewardsRatesChanged',
  },
  {
    type: 'function',
    inputs: [],
    name: 'FARMINGS_ADMINISTRATOR_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'INCENTIVE_MAKER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'rewardAmount', internalType: 'uint128', type: 'uint128' },
      { name: 'bonusRewardAmount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'addRewards',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'rewardToken',
        internalType: 'contract IERC20Minimal',
        type: 'address',
      },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amountRequested', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'claimReward',
    outputs: [{ name: 'reward', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'rewardToken',
        internalType: 'contract IERC20Minimal',
        type: 'address',
      },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amountRequested', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'claimRewardFrom',
    outputs: [{ name: 'reward', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_owner', internalType: 'address', type: 'address' },
    ],
    name: 'collectRewards',
    outputs: [
      { name: 'reward', internalType: 'uint256', type: 'uint256' },
      { name: 'bonusReward', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'params',
        internalType: 'struct IAlgebraEternalFarming.IncentiveParams',
        type: 'tuple',
        components: [
          { name: 'reward', internalType: 'uint128', type: 'uint128' },
          { name: 'bonusReward', internalType: 'uint128', type: 'uint128' },
          { name: 'rewardRate', internalType: 'uint128', type: 'uint128' },
          { name: 'bonusRewardRate', internalType: 'uint128', type: 'uint128' },
          {
            name: 'minimalPositionWidth',
            internalType: 'uint24',
            type: 'uint24',
          },
        ],
      },
      { name: 'plugin', internalType: 'address', type: 'address' },
    ],
    name: 'createEternalFarming',
    outputs: [
      { name: 'virtualPool', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'deactivateIncentive',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'rewardAmount', internalType: 'uint128', type: 'uint128' },
      { name: 'bonusRewardAmount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'decreaseRewardsAmount',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'enterFarming',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_owner', internalType: 'address', type: 'address' },
    ],
    name: 'exitFarming',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'farmingCenter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'incentiveId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'farms',
    outputs: [
      { name: 'liquidity', internalType: 'uint128', type: 'uint128' },
      { name: 'tickLower', internalType: 'int24', type: 'int24' },
      { name: 'tickUpper', internalType: 'int24', type: 'int24' },
      { name: 'innerRewardGrowth0', internalType: 'uint256', type: 'uint256' },
      { name: 'innerRewardGrowth1', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getRewardInfo',
    outputs: [
      { name: 'reward', internalType: 'uint256', type: 'uint256' },
      { name: 'bonusReward', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'incentiveId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'incentives',
    outputs: [
      { name: 'totalReward', internalType: 'uint128', type: 'uint128' },
      { name: 'bonusReward', internalType: 'uint128', type: 'uint128' },
      { name: 'virtualPoolAddress', internalType: 'address', type: 'address' },
      { name: 'minimalPositionWidth', internalType: 'uint24', type: 'uint24' },
      { name: 'deactivated', internalType: 'bool', type: 'bool' },
      { name: 'pluginAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isEmergencyWithdrawActivated',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'incentiveId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'isIncentiveDeactivated',
    outputs: [{ name: 'res', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nonfungiblePositionManager',
    outputs: [
      {
        name: '',
        internalType: 'contract INonfungiblePositionManager',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'numOfIncentives',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      {
        name: 'rewardToken',
        internalType: 'contract IERC20Minimal',
        type: 'address',
      },
    ],
    name: 'rewards',
    outputs: [
      { name: 'rewardAmount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newStatus', internalType: 'bool', type: 'bool' }],
    name: 'setEmergencyWithdrawStatus',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_farmingCenter', internalType: 'address', type: 'address' },
    ],
    name: 'setFarmingCenterAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'rewardRate', internalType: 'uint128', type: 'uint128' },
      { name: 'bonusRewardRate', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'setRates',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

export const algebraEternalFarmingAddress =
  '0x38A5C36FA8c8c9E4649b51FCD61810B14e7ce047' as const

export const algebraEternalFarmingConfig = {
  address: algebraEternalFarmingAddress,
  abi: algebraEternalFarmingAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgebraFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const algebraFactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_poolDeployer', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newDefaultCommunityFee',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'DefaultCommunityFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newFarmingAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'FarmingAddress',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'alpha1',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
      {
        name: 'alpha2',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
      { name: 'beta1', internalType: 'uint32', type: 'uint32', indexed: false },
      { name: 'beta2', internalType: 'uint32', type: 'uint32', indexed: false },
      {
        name: 'gamma1',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
      {
        name: 'gamma2',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
      {
        name: 'baseFee',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
    ],
    name: 'FeeConfiguration',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token0',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'token1',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'pool',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Pool',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'renounceOwnershipFinished',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'finishTimestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'renounceOwnershipStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'renounceOwnershipStopped',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'baseFeeConfiguration',
    outputs: [
      { name: 'alpha1', internalType: 'uint16', type: 'uint16' },
      { name: 'alpha2', internalType: 'uint16', type: 'uint16' },
      { name: 'beta1', internalType: 'uint32', type: 'uint32' },
      { name: 'beta2', internalType: 'uint32', type: 'uint32' },
      { name: 'gamma1', internalType: 'uint16', type: 'uint16' },
      { name: 'gamma2', internalType: 'uint16', type: 'uint16' },
      { name: 'baseFee', internalType: 'uint16', type: 'uint16' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'communityVault',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenA', internalType: 'address', type: 'address' },
      { name: 'tokenB', internalType: 'address', type: 'address' },
    ],
    name: 'createPool',
    outputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultCommunityFee',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'farmingAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getRoleMember',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleMemberCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRoleOrOwner',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'poolByPair',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'poolDeployer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnershipStartTimestamp',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_config',
        internalType: 'struct IAlgebraFeeConfiguration.Configuration',
        type: 'tuple',
        components: [
          { name: 'alpha1', internalType: 'uint16', type: 'uint16' },
          { name: 'alpha2', internalType: 'uint16', type: 'uint16' },
          { name: 'beta1', internalType: 'uint32', type: 'uint32' },
          { name: 'beta2', internalType: 'uint32', type: 'uint32' },
          { name: 'gamma1', internalType: 'uint16', type: 'uint16' },
          { name: 'gamma2', internalType: 'uint16', type: 'uint16' },
          { name: 'baseFee', internalType: 'uint16', type: 'uint16' },
        ],
      },
    ],
    name: 'setBaseFeeConfiguration',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newDefaultCommunityFee', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'setDefaultCommunityFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newFarmingAddress', internalType: 'address', type: 'address' },
    ],
    name: 'setFarmingAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'startRenounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stopRenounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

export const algebraFactoryAddress =
  '0xab49321DF952315E208a2B7046A00d2015E39cba' as const

export const algebraFactoryConfig = {
  address: algebraFactoryAddress,
  abi: algebraFactoryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgebraPool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const algebraPoolAbi = [
  { type: 'error', inputs: [], name: 'alreadyInitialized' },
  { type: 'error', inputs: [], name: 'arithmeticError' },
  { type: 'error', inputs: [], name: 'bottomTickLowerThanMIN' },
  { type: 'error', inputs: [], name: 'dynamicFeeActive' },
  { type: 'error', inputs: [], name: 'dynamicFeeDisabled' },
  { type: 'error', inputs: [], name: 'flashInsufficientPaid0' },
  { type: 'error', inputs: [], name: 'flashInsufficientPaid1' },
  { type: 'error', inputs: [], name: 'insufficientInputAmount' },
  { type: 'error', inputs: [], name: 'invalidAmountRequired' },
  {
    type: 'error',
    inputs: [{ name: 'selector', internalType: 'bytes4', type: 'bytes4' }],
    name: 'invalidHookResponse',
  },
  { type: 'error', inputs: [], name: 'invalidLimitSqrtPrice' },
  { type: 'error', inputs: [], name: 'invalidNewCommunityFee' },
  { type: 'error', inputs: [], name: 'invalidNewTickSpacing' },
  { type: 'error', inputs: [], name: 'liquidityAdd' },
  { type: 'error', inputs: [], name: 'liquidityOverflow' },
  { type: 'error', inputs: [], name: 'liquiditySub' },
  { type: 'error', inputs: [], name: 'locked' },
  { type: 'error', inputs: [], name: 'notAllowed' },
  { type: 'error', inputs: [], name: 'notInitialized' },
  { type: 'error', inputs: [], name: 'onlyFarming' },
  { type: 'error', inputs: [], name: 'pluginIsNotConnected' },
  { type: 'error', inputs: [], name: 'priceOutOfRange' },
  { type: 'error', inputs: [], name: 'tickInvalidLinks' },
  { type: 'error', inputs: [], name: 'tickIsNotInitialized' },
  { type: 'error', inputs: [], name: 'tickIsNotSpaced' },
  { type: 'error', inputs: [], name: 'tickOutOfRange' },
  { type: 'error', inputs: [], name: 'topTickAboveMAX' },
  { type: 'error', inputs: [], name: 'topTickLowerOrEqBottomTick' },
  { type: 'error', inputs: [], name: 'transferFailed' },
  { type: 'error', inputs: [], name: 'zeroAmountRequired' },
  { type: 'error', inputs: [], name: 'zeroLiquidityActual' },
  { type: 'error', inputs: [], name: 'zeroLiquidityDesired' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'bottomTick',
        internalType: 'int24',
        type: 'int24',
        indexed: true,
      },
      { name: 'topTick', internalType: 'int24', type: 'int24', indexed: true },
      {
        name: 'liquidityAmount',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Burn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'bottomTick',
        internalType: 'int24',
        type: 'int24',
        indexed: true,
      },
      { name: 'topTick', internalType: 'int24', type: 'int24', indexed: true },
      {
        name: 'amount0',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
    ],
    name: 'Collect',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'communityFeeNew',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
    ],
    name: 'CommunityFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'fee', internalType: 'uint16', type: 'uint16', indexed: false },
    ],
    name: 'Fee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'paid0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'paid1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Flash',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'price',
        internalType: 'uint160',
        type: 'uint160',
        indexed: false,
      },
      { name: 'tick', internalType: 'int24', type: 'int24', indexed: false },
    ],
    name: 'Initialize',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'bottomTick',
        internalType: 'int24',
        type: 'int24',
        indexed: true,
      },
      { name: 'topTick', internalType: 'int24', type: 'int24', indexed: true },
      {
        name: 'liquidityAmount',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Mint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newPluginAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Plugin',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newPluginConfig',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'PluginConfig',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount0',
        internalType: 'int256',
        type: 'int256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'int256',
        type: 'int256',
        indexed: false,
      },
      {
        name: 'price',
        internalType: 'uint160',
        type: 'uint160',
        indexed: false,
      },
      {
        name: 'liquidity',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      { name: 'tick', internalType: 'int24', type: 'int24', indexed: false },
    ],
    name: 'Swap',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newTickSpacing',
        internalType: 'int24',
        type: 'int24',
        indexed: false,
      },
    ],
    name: 'TickSpacing',
  },
  {
    type: 'function',
    inputs: [
      { name: 'bottomTick', internalType: 'int24', type: 'int24' },
      { name: 'topTick', internalType: 'int24', type: 'int24' },
      { name: 'amount', internalType: 'uint128', type: 'uint128' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'burn',
    outputs: [
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'bottomTick', internalType: 'int24', type: 'int24' },
      { name: 'topTick', internalType: 'int24', type: 'int24' },
      { name: 'amount0Requested', internalType: 'uint128', type: 'uint128' },
      { name: 'amount1Requested', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'collect',
    outputs: [
      { name: 'amount0', internalType: 'uint128', type: 'uint128' },
      { name: 'amount1', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'communityFeeLastTimestamp',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'communityVault',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fee',
    outputs: [{ name: 'currentFee', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'flash',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCommunityFeePending',
    outputs: [
      { name: '', internalType: 'uint128', type: 'uint128' },
      { name: '', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getReserves',
    outputs: [
      { name: '', internalType: 'uint128', type: 'uint128' },
      { name: '', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'globalState',
    outputs: [
      { name: 'price', internalType: 'uint160', type: 'uint160' },
      { name: 'tick', internalType: 'int24', type: 'int24' },
      { name: 'fee', internalType: 'uint16', type: 'uint16' },
      { name: 'pluginConfig', internalType: 'uint8', type: 'uint8' },
      { name: 'communityFee', internalType: 'uint16', type: 'uint16' },
      { name: 'unlocked', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'initialPrice', internalType: 'uint160', type: 'uint160' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'liquidity',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxLiquidityPerTick',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'leftoversRecipient', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'bottomTick', internalType: 'int24', type: 'int24' },
      { name: 'topTick', internalType: 'int24', type: 'int24' },
      { name: 'liquidityDesired', internalType: 'uint128', type: 'uint128' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'mint',
    outputs: [
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidityActual', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nextTickGlobal',
    outputs: [{ name: '', internalType: 'int24', type: 'int24' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'plugin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'positions',
    outputs: [
      { name: 'liquidity', internalType: 'uint256', type: 'uint256' },
      {
        name: 'innerFeeGrowth0Token',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'innerFeeGrowth1Token',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'fees0', internalType: 'uint128', type: 'uint128' },
      { name: 'fees1', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'prevTickGlobal',
    outputs: [{ name: '', internalType: 'int24', type: 'int24' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newCommunityFee', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'setCommunityFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newFee', internalType: 'uint16', type: 'uint16' }],
    name: 'setFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newPluginAddress', internalType: 'address', type: 'address' },
    ],
    name: 'setPlugin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newConfig', internalType: 'uint8', type: 'uint8' }],
    name: 'setPluginConfig',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newTickSpacing', internalType: 'int24', type: 'int24' }],
    name: 'setTickSpacing',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'zeroToOne', internalType: 'bool', type: 'bool' },
      { name: 'amountRequired', internalType: 'int256', type: 'int256' },
      { name: 'limitSqrtPrice', internalType: 'uint160', type: 'uint160' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'swap',
    outputs: [
      { name: 'amount0', internalType: 'int256', type: 'int256' },
      { name: 'amount1', internalType: 'int256', type: 'int256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'leftoversRecipient', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'zeroToOne', internalType: 'bool', type: 'bool' },
      { name: 'amountToSell', internalType: 'int256', type: 'int256' },
      { name: 'limitSqrtPrice', internalType: 'uint160', type: 'uint160' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'swapWithPaymentInAdvance',
    outputs: [
      { name: 'amount0', internalType: 'int256', type: 'int256' },
      { name: 'amount1', internalType: 'int256', type: 'int256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tickSpacing',
    outputs: [{ name: '', internalType: 'int24', type: 'int24' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'int16', type: 'int16' }],
    name: 'tickTable',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'int24', type: 'int24' }],
    name: 'ticks',
    outputs: [
      { name: 'liquidityTotal', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidityDelta', internalType: 'int128', type: 'int128' },
      { name: 'prevTick', internalType: 'int24', type: 'int24' },
      { name: 'nextTick', internalType: 'int24', type: 'int24' },
      {
        name: 'outerFeeGrowth0Token',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'outerFeeGrowth1Token',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token0',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token1',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalFeeGrowth0Token',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalFeeGrowth1Token',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgebraPositionManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const algebraPositionManagerAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_factory', internalType: 'address', type: 'address' },
      { name: '_WNativeToken', internalType: 'address', type: 'address' },
      { name: '_tokenDescriptor_', internalType: 'address', type: 'address' },
      { name: '_poolDeployer', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'tickOutOfRange' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Collect',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'liquidity',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DecreaseLiquidity',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'FarmingFailed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'liquidityDesired',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'actualLiquidity',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'pool',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'IncreaseLiquidity',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'NONFUNGIBLE_POSITION_MANAGER_ADMINISTRATOR_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'WNativeToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount0Owed', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1Owed', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'algebraMintCallback',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'approve', internalType: 'bool', type: 'bool' },
      { name: 'farmingAddress', internalType: 'address', type: 'address' },
    ],
    name: 'approveForFarming',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct INonfungiblePositionManager.CollectParams',
        type: 'tuple',
        components: [
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'amount0Max', internalType: 'uint128', type: 'uint128' },
          { name: 'amount1Max', internalType: 'uint128', type: 'uint128' },
        ],
      },
    ],
    name: 'collect',
    outputs: [
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token0', internalType: 'address', type: 'address' },
      { name: 'token1', internalType: 'address', type: 'address' },
      { name: 'deployer', internalType: 'address', type: 'address' },
      { name: 'sqrtPriceX96', internalType: 'uint160', type: 'uint160' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'createAndInitializePoolIfNecessary',
    outputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType:
          'struct INonfungiblePositionManager.DecreaseLiquidityParams',
        type: 'tuple',
        components: [
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'liquidity', internalType: 'uint128', type: 'uint128' },
          { name: 'amount0Min', internalType: 'uint256', type: 'uint256' },
          { name: 'amount1Min', internalType: 'uint256', type: 'uint256' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'decreaseLiquidity',
    outputs: [
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'farmingApprovals',
    outputs: [
      {
        name: 'farmingCenterAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'farmingCenter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType:
          'struct INonfungiblePositionManager.IncreaseLiquidityParams',
        type: 'tuple',
        components: [
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'amount0Desired', internalType: 'uint256', type: 'uint256' },
          { name: 'amount1Desired', internalType: 'uint256', type: 'uint256' },
          { name: 'amount0Min', internalType: 'uint256', type: 'uint256' },
          { name: 'amount1Min', internalType: 'uint256', type: 'uint256' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'increaseLiquidity',
    outputs: [
      { name: 'liquidity', internalType: 'uint128', type: 'uint128' },
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'isApprovedOrOwner',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct INonfungiblePositionManager.MintParams',
        type: 'tuple',
        components: [
          { name: 'token0', internalType: 'address', type: 'address' },
          { name: 'token1', internalType: 'address', type: 'address' },
          { name: 'deployer', internalType: 'address', type: 'address' },
          { name: 'tickLower', internalType: 'int24', type: 'int24' },
          { name: 'tickUpper', internalType: 'int24', type: 'int24' },
          { name: 'amount0Desired', internalType: 'uint256', type: 'uint256' },
          { name: 'amount1Desired', internalType: 'uint256', type: 'uint256' },
          { name: 'amount0Min', internalType: 'uint256', type: 'uint256' },
          { name: 'amount1Min', internalType: 'uint256', type: 'uint256' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'mint',
    outputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidity', internalType: 'uint128', type: 'uint128' },
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'poolDeployer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'positions',
    outputs: [
      { name: 'nonce', internalType: 'uint88', type: 'uint88' },
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'token0', internalType: 'address', type: 'address' },
      { name: 'token1', internalType: 'address', type: 'address' },
      { name: 'deployer', internalType: 'address', type: 'address' },
      { name: 'tickLower', internalType: 'int24', type: 'int24' },
      { name: 'tickUpper', internalType: 'int24', type: 'int24' },
      { name: 'liquidity', internalType: 'uint128', type: 'uint128' },
      {
        name: 'feeGrowthInside0LastX128',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'feeGrowthInside1LastX128',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'tokensOwed0', internalType: 'uint128', type: 'uint128' },
      { name: 'tokensOwed1', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'refundNativeToken',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'selfPermit',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'selfPermitAllowed',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'selfPermitAllowedIfNecessary',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'selfPermitIfNecessary',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newFarmingCenter', internalType: 'address', type: 'address' },
    ],
    name: 'setFarmingCenter',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amountMinimum', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
    ],
    name: 'sweepToken',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'toActive', internalType: 'bool', type: 'bool' },
    ],
    name: 'switchFarmingStatus',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenFarmedIn',
    outputs: [
      {
        name: 'farmingCenterAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amountMinimum', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
    ],
    name: 'unwrapWNativeToken',
    outputs: [],
    stateMutability: 'payable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

export const algebraPositionManagerAddress =
  '0xAbAc6f23fdf1313FC2E9C9244f666157CcD32990' as const

export const algebraPositionManagerConfig = {
  address: algebraPositionManagerAddress,
  abi: algebraPositionManagerAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgebraQuoter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const algebraQuoterAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_factory', internalType: 'address', type: 'address' },
      { name: '_WNativeToken', internalType: 'address', type: 'address' },
      { name: '_poolDeployer', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'WNativeToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount0Delta', internalType: 'int256', type: 'int256' },
      { name: 'amount1Delta', internalType: 'int256', type: 'int256' },
      { name: 'path', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'algebraSwapCallback',
    outputs: [],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'poolDeployer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'path', internalType: 'bytes', type: 'bytes' },
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'quoteExactInput',
    outputs: [
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'fees', internalType: 'uint16[]', type: 'uint16[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIn', internalType: 'address', type: 'address' },
      { name: 'tokenOut', internalType: 'address', type: 'address' },
      { name: 'deployer', internalType: 'address', type: 'address' },
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'limitSqrtPrice', internalType: 'uint160', type: 'uint160' },
    ],
    name: 'quoteExactInputSingle',
    outputs: [
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'fee', internalType: 'uint16', type: 'uint16' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'path', internalType: 'bytes', type: 'bytes' },
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'quoteExactOutput',
    outputs: [
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'fees', internalType: 'uint16[]', type: 'uint16[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIn', internalType: 'address', type: 'address' },
      { name: 'tokenOut', internalType: 'address', type: 'address' },
      { name: 'deployer', internalType: 'address', type: 'address' },
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'limitSqrtPrice', internalType: 'uint160', type: 'uint160' },
    ],
    name: 'quoteExactOutputSingle',
    outputs: [
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'fee', internalType: 'uint16', type: 'uint16' },
    ],
    stateMutability: 'nonpayable',
  },
] as const

export const algebraQuoterAddress =
  '0x6AD6A4f233F1E33613e996CCc17409B93fF8bf5f' as const

export const algebraQuoterConfig = {
  address: algebraQuoterAddress,
  abi: algebraQuoterAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgebraRouter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const algebraRouterAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_factory', internalType: 'address', type: 'address' },
      { name: '_WNativeToken', internalType: 'address', type: 'address' },
      { name: '_poolDeployer', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'WNativeToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount0Delta', internalType: 'int256', type: 'int256' },
      { name: 'amount1Delta', internalType: 'int256', type: 'int256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'algebraSwapCallback',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct ISwapRouter.ExactInputParams',
        type: 'tuple',
        components: [
          { name: 'path', internalType: 'bytes', type: 'bytes' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
          { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
          {
            name: 'amountOutMinimum',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    name: 'exactInput',
    outputs: [{ name: 'amountOut', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct ISwapRouter.ExactInputSingleParams',
        type: 'tuple',
        components: [
          { name: 'tokenIn', internalType: 'address', type: 'address' },
          { name: 'tokenOut', internalType: 'address', type: 'address' },
          { name: 'deployer', internalType: 'address', type: 'address' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
          { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
          {
            name: 'amountOutMinimum',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'limitSqrtPrice', internalType: 'uint160', type: 'uint160' },
        ],
      },
    ],
    name: 'exactInputSingle',
    outputs: [{ name: 'amountOut', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct ISwapRouter.ExactInputSingleParams',
        type: 'tuple',
        components: [
          { name: 'tokenIn', internalType: 'address', type: 'address' },
          { name: 'tokenOut', internalType: 'address', type: 'address' },
          { name: 'deployer', internalType: 'address', type: 'address' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
          { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
          {
            name: 'amountOutMinimum',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'limitSqrtPrice', internalType: 'uint160', type: 'uint160' },
        ],
      },
    ],
    name: 'exactInputSingleSupportingFeeOnTransferTokens',
    outputs: [{ name: 'amountOut', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct ISwapRouter.ExactOutputParams',
        type: 'tuple',
        components: [
          { name: 'path', internalType: 'bytes', type: 'bytes' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
          { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
          { name: 'amountInMaximum', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'exactOutput',
    outputs: [{ name: 'amountIn', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct ISwapRouter.ExactOutputSingleParams',
        type: 'tuple',
        components: [
          { name: 'tokenIn', internalType: 'address', type: 'address' },
          { name: 'tokenOut', internalType: 'address', type: 'address' },
          { name: 'deployer', internalType: 'address', type: 'address' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
          { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
          { name: 'amountInMaximum', internalType: 'uint256', type: 'uint256' },
          { name: 'limitSqrtPrice', internalType: 'uint160', type: 'uint160' },
        ],
      },
    ],
    name: 'exactOutputSingle',
    outputs: [{ name: 'amountIn', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'poolDeployer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'refundNativeToken',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'selfPermit',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'selfPermitAllowed',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'selfPermitAllowedIfNecessary',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'selfPermitIfNecessary',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amountMinimum', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
    ],
    name: 'sweepToken',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amountMinimum', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'feeBips', internalType: 'uint256', type: 'uint256' },
      { name: 'feeRecipient', internalType: 'address', type: 'address' },
    ],
    name: 'sweepTokenWithFee',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amountMinimum', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
    ],
    name: 'unwrapWNativeToken',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amountMinimum', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'feeBips', internalType: 'uint256', type: 'uint256' },
      { name: 'feeRecipient', internalType: 'address', type: 'address' },
    ],
    name: 'unwrapWNativeTokenWithFee',
    outputs: [],
    stateMutability: 'payable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

export const algebraRouterAddress =
  '0xB4F9b6b019E75CBe51af4425b2Fc12797e2Ee2a1' as const

export const algebraRouterConfig = {
  address: algebraRouterAddress,
  abi: algebraRouterAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgerbaQuoterV2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const algerbaQuoterV2Abi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_factory', internalType: 'address', type: 'address' },
      { name: '_WNativeToken', internalType: 'address', type: 'address' },
      { name: '_poolDeployer', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'WNativeToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount0Delta', internalType: 'int256', type: 'int256' },
      { name: 'amount1Delta', internalType: 'int256', type: 'int256' },
      { name: 'path', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'algebraSwapCallback',
    outputs: [],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'poolDeployer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'path', internalType: 'bytes', type: 'bytes' },
      { name: 'amountInRequired', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'quoteExactInput',
    outputs: [
      { name: 'amountOutList', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amountInList', internalType: 'uint256[]', type: 'uint256[]' },
      {
        name: 'sqrtPriceX96AfterList',
        internalType: 'uint160[]',
        type: 'uint160[]',
      },
      {
        name: 'initializedTicksCrossedList',
        internalType: 'uint32[]',
        type: 'uint32[]',
      },
      { name: 'gasEstimate', internalType: 'uint256', type: 'uint256' },
      { name: 'feeList', internalType: 'uint16[]', type: 'uint16[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct IQuoterV2.QuoteExactInputSingleParams',
        type: 'tuple',
        components: [
          { name: 'tokenIn', internalType: 'address', type: 'address' },
          { name: 'tokenOut', internalType: 'address', type: 'address' },
          { name: 'deployer', internalType: 'address', type: 'address' },
          { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
          { name: 'limitSqrtPrice', internalType: 'uint160', type: 'uint160' },
        ],
      },
    ],
    name: 'quoteExactInputSingle',
    outputs: [
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'sqrtPriceX96After', internalType: 'uint160', type: 'uint160' },
      {
        name: 'initializedTicksCrossed',
        internalType: 'uint32',
        type: 'uint32',
      },
      { name: 'gasEstimate', internalType: 'uint256', type: 'uint256' },
      { name: 'fee', internalType: 'uint16', type: 'uint16' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'path', internalType: 'bytes', type: 'bytes' },
      { name: 'amountOutRequired', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'quoteExactOutput',
    outputs: [
      { name: 'amountOutList', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amountInList', internalType: 'uint256[]', type: 'uint256[]' },
      {
        name: 'sqrtPriceX96AfterList',
        internalType: 'uint160[]',
        type: 'uint160[]',
      },
      {
        name: 'initializedTicksCrossedList',
        internalType: 'uint32[]',
        type: 'uint32[]',
      },
      { name: 'gasEstimate', internalType: 'uint256', type: 'uint256' },
      { name: 'feeList', internalType: 'uint16[]', type: 'uint16[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct IQuoterV2.QuoteExactOutputSingleParams',
        type: 'tuple',
        components: [
          { name: 'tokenIn', internalType: 'address', type: 'address' },
          { name: 'tokenOut', internalType: 'address', type: 'address' },
          { name: 'deployer', internalType: 'address', type: 'address' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'limitSqrtPrice', internalType: 'uint160', type: 'uint160' },
        ],
      },
    ],
    name: 'quoteExactOutputSingle',
    outputs: [
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'sqrtPriceX96After', internalType: 'uint160', type: 'uint160' },
      {
        name: 'initializedTicksCrossed',
        internalType: 'uint32',
        type: 'uint32',
      },
      { name: 'gasEstimate', internalType: 'uint256', type: 'uint256' },
      { name: 'fee', internalType: 'uint16', type: 'uint16' },
    ],
    stateMutability: 'nonpayable',
  },
] as const

export const algerbaQuoterV2Address =
  '0x69D57B9D705eaD73a5d2f2476C30c55bD755cc2F' as const

export const algerbaQuoterV2Config = {
  address: algerbaQuoterV2Address,
  abi: algerbaQuoterV2Abi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FarmingCenter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const farmingCenterAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_eternalFarming',
        internalType: 'contract IAlgebraEternalFarming',
        type: 'address',
      },
      {
        name: '_nonfungiblePositionManager',
        internalType: 'contract INonfungiblePositionManager',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidityDelta', internalType: 'int256', type: 'int256' },
    ],
    name: 'applyLiquidityDelta',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'burnPosition',
    outputs: [{ name: 'success', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'rewardToken',
        internalType: 'contract IERC20Minimal',
        type: 'address',
      },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amountRequested', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'claimReward',
    outputs: [{ name: 'reward', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'collectRewards',
    outputs: [
      { name: 'reward', internalType: 'uint256', type: 'uint256' },
      { name: 'bonusReward', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pool', internalType: 'contract IAlgebraPool', type: 'address' },
      { name: 'newVirtualPool', internalType: 'address', type: 'address' },
    ],
    name: 'connectVirtualPool',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidityDelta', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseLiquidity',
    outputs: [{ name: 'success', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'deposits',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'enterFarming',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'eternalFarming',
    outputs: [
      {
        name: '',
        internalType: 'contract IAlgebraEternalFarming',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'exitFarming',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'incentiveKeys',
    outputs: [
      {
        name: 'rewardToken',
        internalType: 'contract IERC20Minimal',
        type: 'address',
      },
      {
        name: 'bonusRewardToken',
        internalType: 'contract IERC20Minimal',
        type: 'address',
      },
      { name: 'pool', internalType: 'contract IAlgebraPool', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidityDelta', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nonfungiblePositionManager',
    outputs: [
      {
        name: '',
        internalType: 'contract INonfungiblePositionManager',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'virtualPoolAddresses',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
] as const

export const farmingCenterAddress =
  '0x83D4a9Ea77a4dbA073cD90b30410Ac9F95F93E7C' as const

export const farmingCenterConfig = {
  address: farmingCenterAddress,
  abi: farmingCenterAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WrappedNative
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const wrappedNativeAbi = [
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'guy', type: 'address' },
      { name: 'wad', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', type: 'address' },
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'wad', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '', type: 'address' },
      { name: '', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  { payable: true, type: 'fallback', stateMutability: 'payable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'src', type: 'address', indexed: true },
      { name: 'guy', type: 'address', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'src', type: 'address', indexed: true },
      { name: 'dst', type: 'address', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'dst', type: 'address', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'src', type: 'address', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false },
    ],
    name: 'Withdrawal',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__
 */
export const readAlgebraBasePlugin = /*#__PURE__*/ createReadContract({
  abi: algebraBasePluginAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"ALGEBRA_BASE_PLUGIN_MANAGER"`
 */
export const readAlgebraBasePluginAlgebraBasePluginManager =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'ALGEBRA_BASE_PLUGIN_MANAGER',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"defaultPluginConfig"`
 */
export const readAlgebraBasePluginDefaultPluginConfig =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'defaultPluginConfig',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"getCurrentFee"`
 */
export const readAlgebraBasePluginGetCurrentFee =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'getCurrentFee',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"getPool"`
 */
export const readAlgebraBasePluginGetPool = /*#__PURE__*/ createReadContract({
  abi: algebraBasePluginAbi,
  functionName: 'getPool',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"getSingleTimepoint"`
 */
export const readAlgebraBasePluginGetSingleTimepoint =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'getSingleTimepoint',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"getTimepoints"`
 */
export const readAlgebraBasePluginGetTimepoints =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'getTimepoints',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"handlePluginFee"`
 */
export const readAlgebraBasePluginHandlePluginFee =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'handlePluginFee',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"incentive"`
 */
export const readAlgebraBasePluginIncentive = /*#__PURE__*/ createReadContract({
  abi: algebraBasePluginAbi,
  functionName: 'incentive',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"isIncentiveConnected"`
 */
export const readAlgebraBasePluginIsIncentiveConnected =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'isIncentiveConnected',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"isInitialized"`
 */
export const readAlgebraBasePluginIsInitialized =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'isInitialized',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"lastTimepointTimestamp"`
 */
export const readAlgebraBasePluginLastTimepointTimestamp =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'lastTimepointTimestamp',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"pool"`
 */
export const readAlgebraBasePluginPool = /*#__PURE__*/ createReadContract({
  abi: algebraBasePluginAbi,
  functionName: 'pool',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"s_baseFee"`
 */
export const readAlgebraBasePluginSBaseFee = /*#__PURE__*/ createReadContract({
  abi: algebraBasePluginAbi,
  functionName: 's_baseFee',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"s_feeFactors"`
 */
export const readAlgebraBasePluginSFeeFactors =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 's_feeFactors',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"s_priceChangeFactor"`
 */
export const readAlgebraBasePluginSPriceChangeFactor =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 's_priceChangeFactor',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"timepointIndex"`
 */
export const readAlgebraBasePluginTimepointIndex =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'timepointIndex',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"timepoints"`
 */
export const readAlgebraBasePluginTimepoints = /*#__PURE__*/ createReadContract(
  { abi: algebraBasePluginAbi, functionName: 'timepoints' },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__
 */
export const writeAlgebraBasePlugin = /*#__PURE__*/ createWriteContract({
  abi: algebraBasePluginAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterFlash"`
 */
export const writeAlgebraBasePluginAfterFlash =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterFlash',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterInitialize"`
 */
export const writeAlgebraBasePluginAfterInitialize =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterInitialize',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterModifyPosition"`
 */
export const writeAlgebraBasePluginAfterModifyPosition =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterModifyPosition',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterSwap"`
 */
export const writeAlgebraBasePluginAfterSwap =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterSwap',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeFlash"`
 */
export const writeAlgebraBasePluginBeforeFlash =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeFlash',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeInitialize"`
 */
export const writeAlgebraBasePluginBeforeInitialize =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeInitialize',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeModifyPosition"`
 */
export const writeAlgebraBasePluginBeforeModifyPosition =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeModifyPosition',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeSwap"`
 */
export const writeAlgebraBasePluginBeforeSwap =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeSwap',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"collectPluginFee"`
 */
export const writeAlgebraBasePluginCollectPluginFee =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'collectPluginFee',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"initialize"`
 */
export const writeAlgebraBasePluginInitialize =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"prepayTimepointsStorageSlots"`
 */
export const writeAlgebraBasePluginPrepayTimepointsStorageSlots =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'prepayTimepointsStorageSlots',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setBaseFee"`
 */
export const writeAlgebraBasePluginSetBaseFee =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'setBaseFee',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setIncentive"`
 */
export const writeAlgebraBasePluginSetIncentive =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'setIncentive',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setPriceChangeFactor"`
 */
export const writeAlgebraBasePluginSetPriceChangeFactor =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'setPriceChangeFactor',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__
 */
export const simulateAlgebraBasePlugin = /*#__PURE__*/ createSimulateContract({
  abi: algebraBasePluginAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterFlash"`
 */
export const simulateAlgebraBasePluginAfterFlash =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterFlash',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterInitialize"`
 */
export const simulateAlgebraBasePluginAfterInitialize =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterInitialize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterModifyPosition"`
 */
export const simulateAlgebraBasePluginAfterModifyPosition =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterModifyPosition',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterSwap"`
 */
export const simulateAlgebraBasePluginAfterSwap =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterSwap',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeFlash"`
 */
export const simulateAlgebraBasePluginBeforeFlash =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeFlash',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeInitialize"`
 */
export const simulateAlgebraBasePluginBeforeInitialize =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeInitialize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeModifyPosition"`
 */
export const simulateAlgebraBasePluginBeforeModifyPosition =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeModifyPosition',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeSwap"`
 */
export const simulateAlgebraBasePluginBeforeSwap =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeSwap',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"collectPluginFee"`
 */
export const simulateAlgebraBasePluginCollectPluginFee =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'collectPluginFee',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"initialize"`
 */
export const simulateAlgebraBasePluginInitialize =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"prepayTimepointsStorageSlots"`
 */
export const simulateAlgebraBasePluginPrepayTimepointsStorageSlots =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'prepayTimepointsStorageSlots',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setBaseFee"`
 */
export const simulateAlgebraBasePluginSetBaseFee =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'setBaseFee',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setIncentive"`
 */
export const simulateAlgebraBasePluginSetIncentive =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'setIncentive',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setPriceChangeFactor"`
 */
export const simulateAlgebraBasePluginSetPriceChangeFactor =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'setPriceChangeFactor',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraBasePluginAbi}__
 */
export const watchAlgebraBasePluginEvent =
  /*#__PURE__*/ createWatchContractEvent({ abi: algebraBasePluginAbi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `eventName` set to `"BaseFee"`
 */
export const watchAlgebraBasePluginBaseFeeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraBasePluginAbi,
    eventName: 'BaseFee',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `eventName` set to `"Incentive"`
 */
export const watchAlgebraBasePluginIncentiveEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraBasePluginAbi,
    eventName: 'Incentive',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `eventName` set to `"PriceChangeFactor"`
 */
export const watchAlgebraBasePluginPriceChangeFactorEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraBasePluginAbi,
    eventName: 'PriceChangeFactor',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__
 */
export const readAlgebraCustomPoolDeployer = /*#__PURE__*/ createReadContract({
  abi: algebraCustomPoolDeployerAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"beforeCreatePoolHook"`
 */
export const readAlgebraCustomPoolDeployerBeforeCreatePoolHook =
  /*#__PURE__*/ createReadContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'beforeCreatePoolHook',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"entryPoint"`
 */
export const readAlgebraCustomPoolDeployerEntryPoint =
  /*#__PURE__*/ createReadContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'entryPoint',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"plugin"`
 */
export const readAlgebraCustomPoolDeployerPlugin =
  /*#__PURE__*/ createReadContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'plugin',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"poolToPlugin"`
 */
export const readAlgebraCustomPoolDeployerPoolToPlugin =
  /*#__PURE__*/ createReadContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'poolToPlugin',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__
 */
export const writeAlgebraCustomPoolDeployer = /*#__PURE__*/ createWriteContract(
  { abi: algebraCustomPoolDeployerAbi },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"createCustomPool"`
 */
export const writeAlgebraCustomPoolDeployerCreateCustomPool =
  /*#__PURE__*/ createWriteContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'createCustomPool',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"setFee"`
 */
export const writeAlgebraCustomPoolDeployerSetFee =
  /*#__PURE__*/ createWriteContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'setFee',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"setPlugin"`
 */
export const writeAlgebraCustomPoolDeployerSetPlugin =
  /*#__PURE__*/ createWriteContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'setPlugin',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"setPluginConfig"`
 */
export const writeAlgebraCustomPoolDeployerSetPluginConfig =
  /*#__PURE__*/ createWriteContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'setPluginConfig',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"setPluginForPool"`
 */
export const writeAlgebraCustomPoolDeployerSetPluginForPool =
  /*#__PURE__*/ createWriteContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'setPluginForPool',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"setTickSpacing"`
 */
export const writeAlgebraCustomPoolDeployerSetTickSpacing =
  /*#__PURE__*/ createWriteContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'setTickSpacing',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__
 */
export const simulateAlgebraCustomPoolDeployer =
  /*#__PURE__*/ createSimulateContract({ abi: algebraCustomPoolDeployerAbi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"createCustomPool"`
 */
export const simulateAlgebraCustomPoolDeployerCreateCustomPool =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'createCustomPool',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"setFee"`
 */
export const simulateAlgebraCustomPoolDeployerSetFee =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'setFee',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"setPlugin"`
 */
export const simulateAlgebraCustomPoolDeployerSetPlugin =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'setPlugin',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"setPluginConfig"`
 */
export const simulateAlgebraCustomPoolDeployerSetPluginConfig =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'setPluginConfig',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"setPluginForPool"`
 */
export const simulateAlgebraCustomPoolDeployerSetPluginForPool =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'setPluginForPool',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"setTickSpacing"`
 */
export const simulateAlgebraCustomPoolDeployerSetTickSpacing =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'setTickSpacing',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__
 */
export const readAlgebraEternalFarming = /*#__PURE__*/ createReadContract({
  abi: algebraEternalFarmingAbi,
  address: algebraEternalFarmingAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"FARMINGS_ADMINISTRATOR_ROLE"`
 */
export const readAlgebraEternalFarmingFarmingsAdministratorRole =
  /*#__PURE__*/ createReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'FARMINGS_ADMINISTRATOR_ROLE',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"INCENTIVE_MAKER_ROLE"`
 */
export const readAlgebraEternalFarmingIncentiveMakerRole =
  /*#__PURE__*/ createReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'INCENTIVE_MAKER_ROLE',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"farmingCenter"`
 */
export const readAlgebraEternalFarmingFarmingCenter =
  /*#__PURE__*/ createReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'farmingCenter',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"farms"`
 */
export const readAlgebraEternalFarmingFarms = /*#__PURE__*/ createReadContract({
  abi: algebraEternalFarmingAbi,
  address: algebraEternalFarmingAddress,
  functionName: 'farms',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"getRewardInfo"`
 */
export const readAlgebraEternalFarmingGetRewardInfo =
  /*#__PURE__*/ createReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'getRewardInfo',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"incentives"`
 */
export const readAlgebraEternalFarmingIncentives =
  /*#__PURE__*/ createReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'incentives',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"isEmergencyWithdrawActivated"`
 */
export const readAlgebraEternalFarmingIsEmergencyWithdrawActivated =
  /*#__PURE__*/ createReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'isEmergencyWithdrawActivated',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"isIncentiveDeactivated"`
 */
export const readAlgebraEternalFarmingIsIncentiveDeactivated =
  /*#__PURE__*/ createReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'isIncentiveDeactivated',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"nonfungiblePositionManager"`
 */
export const readAlgebraEternalFarmingNonfungiblePositionManager =
  /*#__PURE__*/ createReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'nonfungiblePositionManager',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"numOfIncentives"`
 */
export const readAlgebraEternalFarmingNumOfIncentives =
  /*#__PURE__*/ createReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'numOfIncentives',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"rewards"`
 */
export const readAlgebraEternalFarmingRewards =
  /*#__PURE__*/ createReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'rewards',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__
 */
export const writeAlgebraEternalFarming = /*#__PURE__*/ createWriteContract({
  abi: algebraEternalFarmingAbi,
  address: algebraEternalFarmingAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"addRewards"`
 */
export const writeAlgebraEternalFarmingAddRewards =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'addRewards',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"claimReward"`
 */
export const writeAlgebraEternalFarmingClaimReward =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"claimRewardFrom"`
 */
export const writeAlgebraEternalFarmingClaimRewardFrom =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'claimRewardFrom',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"collectRewards"`
 */
export const writeAlgebraEternalFarmingCollectRewards =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'collectRewards',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"createEternalFarming"`
 */
export const writeAlgebraEternalFarmingCreateEternalFarming =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'createEternalFarming',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"deactivateIncentive"`
 */
export const writeAlgebraEternalFarmingDeactivateIncentive =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'deactivateIncentive',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"decreaseRewardsAmount"`
 */
export const writeAlgebraEternalFarmingDecreaseRewardsAmount =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'decreaseRewardsAmount',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"enterFarming"`
 */
export const writeAlgebraEternalFarmingEnterFarming =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'enterFarming',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"exitFarming"`
 */
export const writeAlgebraEternalFarmingExitFarming =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'exitFarming',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setEmergencyWithdrawStatus"`
 */
export const writeAlgebraEternalFarmingSetEmergencyWithdrawStatus =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setEmergencyWithdrawStatus',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setFarmingCenterAddress"`
 */
export const writeAlgebraEternalFarmingSetFarmingCenterAddress =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setFarmingCenterAddress',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setRates"`
 */
export const writeAlgebraEternalFarmingSetRates =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setRates',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__
 */
export const simulateAlgebraEternalFarming =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"addRewards"`
 */
export const simulateAlgebraEternalFarmingAddRewards =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'addRewards',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"claimReward"`
 */
export const simulateAlgebraEternalFarmingClaimReward =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"claimRewardFrom"`
 */
export const simulateAlgebraEternalFarmingClaimRewardFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'claimRewardFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"collectRewards"`
 */
export const simulateAlgebraEternalFarmingCollectRewards =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'collectRewards',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"createEternalFarming"`
 */
export const simulateAlgebraEternalFarmingCreateEternalFarming =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'createEternalFarming',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"deactivateIncentive"`
 */
export const simulateAlgebraEternalFarmingDeactivateIncentive =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'deactivateIncentive',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"decreaseRewardsAmount"`
 */
export const simulateAlgebraEternalFarmingDecreaseRewardsAmount =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'decreaseRewardsAmount',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"enterFarming"`
 */
export const simulateAlgebraEternalFarmingEnterFarming =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'enterFarming',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"exitFarming"`
 */
export const simulateAlgebraEternalFarmingExitFarming =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'exitFarming',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setEmergencyWithdrawStatus"`
 */
export const simulateAlgebraEternalFarmingSetEmergencyWithdrawStatus =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setEmergencyWithdrawStatus',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setFarmingCenterAddress"`
 */
export const simulateAlgebraEternalFarmingSetFarmingCenterAddress =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setFarmingCenterAddress',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setRates"`
 */
export const simulateAlgebraEternalFarmingSetRates =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setRates',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__
 */
export const watchAlgebraEternalFarmingEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"EmergencyWithdraw"`
 */
export const watchAlgebraEternalFarmingEmergencyWithdrawEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'EmergencyWithdraw',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"EternalFarmingCreated"`
 */
export const watchAlgebraEternalFarmingEternalFarmingCreatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'EternalFarmingCreated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"FarmEnded"`
 */
export const watchAlgebraEternalFarmingFarmEndedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'FarmEnded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"FarmEntered"`
 */
export const watchAlgebraEternalFarmingFarmEnteredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'FarmEntered',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"FarmingCenter"`
 */
export const watchAlgebraEternalFarmingFarmingCenterEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'FarmingCenter',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"IncentiveDeactivated"`
 */
export const watchAlgebraEternalFarmingIncentiveDeactivatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'IncentiveDeactivated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"RewardAmountsDecreased"`
 */
export const watchAlgebraEternalFarmingRewardAmountsDecreasedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'RewardAmountsDecreased',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"RewardClaimed"`
 */
export const watchAlgebraEternalFarmingRewardClaimedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'RewardClaimed',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"RewardsAdded"`
 */
export const watchAlgebraEternalFarmingRewardsAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'RewardsAdded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"RewardsCollected"`
 */
export const watchAlgebraEternalFarmingRewardsCollectedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'RewardsCollected',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"RewardsRatesChanged"`
 */
export const watchAlgebraEternalFarmingRewardsRatesChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'RewardsRatesChanged',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__
 */
export const readAlgebraFactory = /*#__PURE__*/ createReadContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const readAlgebraFactoryDefaultAdminRole =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"baseFeeConfiguration"`
 */
export const readAlgebraFactoryBaseFeeConfiguration =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'baseFeeConfiguration',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"communityVault"`
 */
export const readAlgebraFactoryCommunityVault =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'communityVault',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"defaultCommunityFee"`
 */
export const readAlgebraFactoryDefaultCommunityFee =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'defaultCommunityFee',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"farmingAddress"`
 */
export const readAlgebraFactoryFarmingAddress =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'farmingAddress',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const readAlgebraFactoryGetRoleAdmin = /*#__PURE__*/ createReadContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'getRoleAdmin',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"getRoleMember"`
 */
export const readAlgebraFactoryGetRoleMember = /*#__PURE__*/ createReadContract(
  {
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'getRoleMember',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"getRoleMemberCount"`
 */
export const readAlgebraFactoryGetRoleMemberCount =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'getRoleMemberCount',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"hasRole"`
 */
export const readAlgebraFactoryHasRole = /*#__PURE__*/ createReadContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'hasRole',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"hasRoleOrOwner"`
 */
export const readAlgebraFactoryHasRoleOrOwner =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'hasRoleOrOwner',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"owner"`
 */
export const readAlgebraFactoryOwner = /*#__PURE__*/ createReadContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"pendingOwner"`
 */
export const readAlgebraFactoryPendingOwner = /*#__PURE__*/ createReadContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'pendingOwner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"poolByPair"`
 */
export const readAlgebraFactoryPoolByPair = /*#__PURE__*/ createReadContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'poolByPair',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"poolDeployer"`
 */
export const readAlgebraFactoryPoolDeployer = /*#__PURE__*/ createReadContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'poolDeployer',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"renounceOwnershipStartTimestamp"`
 */
export const readAlgebraFactoryRenounceOwnershipStartTimestamp =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'renounceOwnershipStartTimestamp',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readAlgebraFactorySupportsInterface =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__
 */
export const writeAlgebraFactory = /*#__PURE__*/ createWriteContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const writeAlgebraFactoryAcceptOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"createPool"`
 */
export const writeAlgebraFactoryCreatePool = /*#__PURE__*/ createWriteContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'createPool',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"grantRole"`
 */
export const writeAlgebraFactoryGrantRole = /*#__PURE__*/ createWriteContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'grantRole',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeAlgebraFactoryRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"renounceRole"`
 */
export const writeAlgebraFactoryRenounceRole =
  /*#__PURE__*/ createWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"revokeRole"`
 */
export const writeAlgebraFactoryRevokeRole = /*#__PURE__*/ createWriteContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'revokeRole',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setBaseFeeConfiguration"`
 */
export const writeAlgebraFactorySetBaseFeeConfiguration =
  /*#__PURE__*/ createWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setBaseFeeConfiguration',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setDefaultCommunityFee"`
 */
export const writeAlgebraFactorySetDefaultCommunityFee =
  /*#__PURE__*/ createWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setDefaultCommunityFee',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setFarmingAddress"`
 */
export const writeAlgebraFactorySetFarmingAddress =
  /*#__PURE__*/ createWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setFarmingAddress',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"startRenounceOwnership"`
 */
export const writeAlgebraFactoryStartRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'startRenounceOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"stopRenounceOwnership"`
 */
export const writeAlgebraFactoryStopRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'stopRenounceOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeAlgebraFactoryTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__
 */
export const simulateAlgebraFactory = /*#__PURE__*/ createSimulateContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const simulateAlgebraFactoryAcceptOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"createPool"`
 */
export const simulateAlgebraFactoryCreatePool =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'createPool',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"grantRole"`
 */
export const simulateAlgebraFactoryGrantRole =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateAlgebraFactoryRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"renounceRole"`
 */
export const simulateAlgebraFactoryRenounceRole =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"revokeRole"`
 */
export const simulateAlgebraFactoryRevokeRole =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setBaseFeeConfiguration"`
 */
export const simulateAlgebraFactorySetBaseFeeConfiguration =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setBaseFeeConfiguration',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setDefaultCommunityFee"`
 */
export const simulateAlgebraFactorySetDefaultCommunityFee =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setDefaultCommunityFee',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setFarmingAddress"`
 */
export const simulateAlgebraFactorySetFarmingAddress =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setFarmingAddress',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"startRenounceOwnership"`
 */
export const simulateAlgebraFactoryStartRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'startRenounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"stopRenounceOwnership"`
 */
export const simulateAlgebraFactoryStopRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'stopRenounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateAlgebraFactoryTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__
 */
export const watchAlgebraFactoryEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"DefaultCommunityFee"`
 */
export const watchAlgebraFactoryDefaultCommunityFeeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'DefaultCommunityFee',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"FarmingAddress"`
 */
export const watchAlgebraFactoryFarmingAddressEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'FarmingAddress',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"FeeConfiguration"`
 */
export const watchAlgebraFactoryFeeConfigurationEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'FeeConfiguration',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 */
export const watchAlgebraFactoryOwnershipTransferStartedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchAlgebraFactoryOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"Pool"`
 */
export const watchAlgebraFactoryPoolEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'Pool',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const watchAlgebraFactoryRoleAdminChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const watchAlgebraFactoryRoleGrantedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const watchAlgebraFactoryRoleRevokedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"renounceOwnershipFinished"`
 */
export const watchAlgebraFactoryRenounceOwnershipFinishedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'renounceOwnershipFinished',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"renounceOwnershipStarted"`
 */
export const watchAlgebraFactoryRenounceOwnershipStartedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'renounceOwnershipStarted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"renounceOwnershipStopped"`
 */
export const watchAlgebraFactoryRenounceOwnershipStoppedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'renounceOwnershipStopped',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__
 */
export const readAlgebraPool = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"communityFeeLastTimestamp"`
 */
export const readAlgebraPoolCommunityFeeLastTimestamp =
  /*#__PURE__*/ createReadContract({
    abi: algebraPoolAbi,
    functionName: 'communityFeeLastTimestamp',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"communityVault"`
 */
export const readAlgebraPoolCommunityVault = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'communityVault',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"factory"`
 */
export const readAlgebraPoolFactory = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'factory',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"fee"`
 */
export const readAlgebraPoolFee = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'fee',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"getCommunityFeePending"`
 */
export const readAlgebraPoolGetCommunityFeePending =
  /*#__PURE__*/ createReadContract({
    abi: algebraPoolAbi,
    functionName: 'getCommunityFeePending',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"getReserves"`
 */
export const readAlgebraPoolGetReserves = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'getReserves',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"globalState"`
 */
export const readAlgebraPoolGlobalState = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'globalState',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"liquidity"`
 */
export const readAlgebraPoolLiquidity = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'liquidity',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"maxLiquidityPerTick"`
 */
export const readAlgebraPoolMaxLiquidityPerTick =
  /*#__PURE__*/ createReadContract({
    abi: algebraPoolAbi,
    functionName: 'maxLiquidityPerTick',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"nextTickGlobal"`
 */
export const readAlgebraPoolNextTickGlobal = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'nextTickGlobal',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"plugin"`
 */
export const readAlgebraPoolPlugin = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'plugin',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"positions"`
 */
export const readAlgebraPoolPositions = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'positions',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"prevTickGlobal"`
 */
export const readAlgebraPoolPrevTickGlobal = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'prevTickGlobal',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"tickSpacing"`
 */
export const readAlgebraPoolTickSpacing = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'tickSpacing',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"tickTable"`
 */
export const readAlgebraPoolTickTable = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'tickTable',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"ticks"`
 */
export const readAlgebraPoolTicks = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'ticks',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"token0"`
 */
export const readAlgebraPoolToken0 = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'token0',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"token1"`
 */
export const readAlgebraPoolToken1 = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'token1',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"totalFeeGrowth0Token"`
 */
export const readAlgebraPoolTotalFeeGrowth0Token =
  /*#__PURE__*/ createReadContract({
    abi: algebraPoolAbi,
    functionName: 'totalFeeGrowth0Token',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"totalFeeGrowth1Token"`
 */
export const readAlgebraPoolTotalFeeGrowth1Token =
  /*#__PURE__*/ createReadContract({
    abi: algebraPoolAbi,
    functionName: 'totalFeeGrowth1Token',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__
 */
export const writeAlgebraPool = /*#__PURE__*/ createWriteContract({
  abi: algebraPoolAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"burn"`
 */
export const writeAlgebraPoolBurn = /*#__PURE__*/ createWriteContract({
  abi: algebraPoolAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"collect"`
 */
export const writeAlgebraPoolCollect = /*#__PURE__*/ createWriteContract({
  abi: algebraPoolAbi,
  functionName: 'collect',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"flash"`
 */
export const writeAlgebraPoolFlash = /*#__PURE__*/ createWriteContract({
  abi: algebraPoolAbi,
  functionName: 'flash',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"initialize"`
 */
export const writeAlgebraPoolInitialize = /*#__PURE__*/ createWriteContract({
  abi: algebraPoolAbi,
  functionName: 'initialize',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"mint"`
 */
export const writeAlgebraPoolMint = /*#__PURE__*/ createWriteContract({
  abi: algebraPoolAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setCommunityFee"`
 */
export const writeAlgebraPoolSetCommunityFee =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPoolAbi,
    functionName: 'setCommunityFee',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setFee"`
 */
export const writeAlgebraPoolSetFee = /*#__PURE__*/ createWriteContract({
  abi: algebraPoolAbi,
  functionName: 'setFee',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setPlugin"`
 */
export const writeAlgebraPoolSetPlugin = /*#__PURE__*/ createWriteContract({
  abi: algebraPoolAbi,
  functionName: 'setPlugin',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setPluginConfig"`
 */
export const writeAlgebraPoolSetPluginConfig =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPoolAbi,
    functionName: 'setPluginConfig',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setTickSpacing"`
 */
export const writeAlgebraPoolSetTickSpacing = /*#__PURE__*/ createWriteContract(
  { abi: algebraPoolAbi, functionName: 'setTickSpacing' },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"swap"`
 */
export const writeAlgebraPoolSwap = /*#__PURE__*/ createWriteContract({
  abi: algebraPoolAbi,
  functionName: 'swap',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"swapWithPaymentInAdvance"`
 */
export const writeAlgebraPoolSwapWithPaymentInAdvance =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPoolAbi,
    functionName: 'swapWithPaymentInAdvance',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__
 */
export const simulateAlgebraPool = /*#__PURE__*/ createSimulateContract({
  abi: algebraPoolAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"burn"`
 */
export const simulateAlgebraPoolBurn = /*#__PURE__*/ createSimulateContract({
  abi: algebraPoolAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"collect"`
 */
export const simulateAlgebraPoolCollect = /*#__PURE__*/ createSimulateContract({
  abi: algebraPoolAbi,
  functionName: 'collect',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"flash"`
 */
export const simulateAlgebraPoolFlash = /*#__PURE__*/ createSimulateContract({
  abi: algebraPoolAbi,
  functionName: 'flash',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"initialize"`
 */
export const simulateAlgebraPoolInitialize =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"mint"`
 */
export const simulateAlgebraPoolMint = /*#__PURE__*/ createSimulateContract({
  abi: algebraPoolAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setCommunityFee"`
 */
export const simulateAlgebraPoolSetCommunityFee =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'setCommunityFee',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setFee"`
 */
export const simulateAlgebraPoolSetFee = /*#__PURE__*/ createSimulateContract({
  abi: algebraPoolAbi,
  functionName: 'setFee',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setPlugin"`
 */
export const simulateAlgebraPoolSetPlugin =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'setPlugin',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setPluginConfig"`
 */
export const simulateAlgebraPoolSetPluginConfig =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'setPluginConfig',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setTickSpacing"`
 */
export const simulateAlgebraPoolSetTickSpacing =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'setTickSpacing',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"swap"`
 */
export const simulateAlgebraPoolSwap = /*#__PURE__*/ createSimulateContract({
  abi: algebraPoolAbi,
  functionName: 'swap',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"swapWithPaymentInAdvance"`
 */
export const simulateAlgebraPoolSwapWithPaymentInAdvance =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'swapWithPaymentInAdvance',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__
 */
export const watchAlgebraPoolEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: algebraPoolAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Burn"`
 */
export const watchAlgebraPoolBurnEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: algebraPoolAbi, eventName: 'Burn' },
)

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Collect"`
 */
export const watchAlgebraPoolCollectEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Collect',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"CommunityFee"`
 */
export const watchAlgebraPoolCommunityFeeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'CommunityFee',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Fee"`
 */
export const watchAlgebraPoolFeeEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: algebraPoolAbi,
  eventName: 'Fee',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Flash"`
 */
export const watchAlgebraPoolFlashEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Flash',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Initialize"`
 */
export const watchAlgebraPoolInitializeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Initialize',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Mint"`
 */
export const watchAlgebraPoolMintEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: algebraPoolAbi, eventName: 'Mint' },
)

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Plugin"`
 */
export const watchAlgebraPoolPluginEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Plugin',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"PluginConfig"`
 */
export const watchAlgebraPoolPluginConfigEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'PluginConfig',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Swap"`
 */
export const watchAlgebraPoolSwapEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: algebraPoolAbi, eventName: 'Swap' },
)

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"TickSpacing"`
 */
export const watchAlgebraPoolTickSpacingEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'TickSpacing',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__
 */
export const readAlgebraPositionManager = /*#__PURE__*/ createReadContract({
  abi: algebraPositionManagerAbi,
  address: algebraPositionManagerAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const readAlgebraPositionManagerDomainSeparator =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"NONFUNGIBLE_POSITION_MANAGER_ADMINISTRATOR_ROLE"`
 */
export const readAlgebraPositionManagerNonfungiblePositionManagerAdministratorRole =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'NONFUNGIBLE_POSITION_MANAGER_ADMINISTRATOR_ROLE',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"PERMIT_TYPEHASH"`
 */
export const readAlgebraPositionManagerPermitTypehash =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'PERMIT_TYPEHASH',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"WNativeToken"`
 */
export const readAlgebraPositionManagerWNativeToken =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'WNativeToken',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readAlgebraPositionManagerBalanceOf =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"factory"`
 */
export const readAlgebraPositionManagerFactory =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'factory',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"farmingApprovals"`
 */
export const readAlgebraPositionManagerFarmingApprovals =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'farmingApprovals',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"farmingCenter"`
 */
export const readAlgebraPositionManagerFarmingCenter =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'farmingCenter',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"getApproved"`
 */
export const readAlgebraPositionManagerGetApproved =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readAlgebraPositionManagerIsApprovedForAll =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"isApprovedOrOwner"`
 */
export const readAlgebraPositionManagerIsApprovedOrOwner =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'isApprovedOrOwner',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"name"`
 */
export const readAlgebraPositionManagerName = /*#__PURE__*/ createReadContract({
  abi: algebraPositionManagerAbi,
  address: algebraPositionManagerAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"ownerOf"`
 */
export const readAlgebraPositionManagerOwnerOf =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'ownerOf',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"poolDeployer"`
 */
export const readAlgebraPositionManagerPoolDeployer =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'poolDeployer',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"positions"`
 */
export const readAlgebraPositionManagerPositions =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'positions',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readAlgebraPositionManagerSupportsInterface =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"symbol"`
 */
export const readAlgebraPositionManagerSymbol =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'symbol',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"tokenByIndex"`
 */
export const readAlgebraPositionManagerTokenByIndex =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'tokenByIndex',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"tokenFarmedIn"`
 */
export const readAlgebraPositionManagerTokenFarmedIn =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'tokenFarmedIn',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 */
export const readAlgebraPositionManagerTokenOfOwnerByIndex =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'tokenOfOwnerByIndex',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"tokenURI"`
 */
export const readAlgebraPositionManagerTokenUri =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'tokenURI',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"totalSupply"`
 */
export const readAlgebraPositionManagerTotalSupply =
  /*#__PURE__*/ createReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__
 */
export const writeAlgebraPositionManager = /*#__PURE__*/ createWriteContract({
  abi: algebraPositionManagerAbi,
  address: algebraPositionManagerAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"algebraMintCallback"`
 */
export const writeAlgebraPositionManagerAlgebraMintCallback =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'algebraMintCallback',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"approve"`
 */
export const writeAlgebraPositionManagerApprove =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"approveForFarming"`
 */
export const writeAlgebraPositionManagerApproveForFarming =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'approveForFarming',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"burn"`
 */
export const writeAlgebraPositionManagerBurn =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'burn',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"collect"`
 */
export const writeAlgebraPositionManagerCollect =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'collect',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"createAndInitializePoolIfNecessary"`
 */
export const writeAlgebraPositionManagerCreateAndInitializePoolIfNecessary =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'createAndInitializePoolIfNecessary',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"decreaseLiquidity"`
 */
export const writeAlgebraPositionManagerDecreaseLiquidity =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'decreaseLiquidity',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"increaseLiquidity"`
 */
export const writeAlgebraPositionManagerIncreaseLiquidity =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'increaseLiquidity',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"mint"`
 */
export const writeAlgebraPositionManagerMint =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"multicall"`
 */
export const writeAlgebraPositionManagerMulticall =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"permit"`
 */
export const writeAlgebraPositionManagerPermit =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'permit',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"refundNativeToken"`
 */
export const writeAlgebraPositionManagerRefundNativeToken =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'refundNativeToken',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeAlgebraPositionManagerSafeTransferFrom =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"selfPermit"`
 */
export const writeAlgebraPositionManagerSelfPermit =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermit',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"selfPermitAllowed"`
 */
export const writeAlgebraPositionManagerSelfPermitAllowed =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermitAllowed',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"selfPermitAllowedIfNecessary"`
 */
export const writeAlgebraPositionManagerSelfPermitAllowedIfNecessary =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermitAllowedIfNecessary',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"selfPermitIfNecessary"`
 */
export const writeAlgebraPositionManagerSelfPermitIfNecessary =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermitIfNecessary',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeAlgebraPositionManagerSetApprovalForAll =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"setFarmingCenter"`
 */
export const writeAlgebraPositionManagerSetFarmingCenter =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'setFarmingCenter',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"sweepToken"`
 */
export const writeAlgebraPositionManagerSweepToken =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'sweepToken',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"switchFarmingStatus"`
 */
export const writeAlgebraPositionManagerSwitchFarmingStatus =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'switchFarmingStatus',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeAlgebraPositionManagerTransferFrom =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"unwrapWNativeToken"`
 */
export const writeAlgebraPositionManagerUnwrapWNativeToken =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'unwrapWNativeToken',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__
 */
export const simulateAlgebraPositionManager =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"algebraMintCallback"`
 */
export const simulateAlgebraPositionManagerAlgebraMintCallback =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'algebraMintCallback',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"approve"`
 */
export const simulateAlgebraPositionManagerApprove =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"approveForFarming"`
 */
export const simulateAlgebraPositionManagerApproveForFarming =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'approveForFarming',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"burn"`
 */
export const simulateAlgebraPositionManagerBurn =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'burn',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"collect"`
 */
export const simulateAlgebraPositionManagerCollect =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'collect',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"createAndInitializePoolIfNecessary"`
 */
export const simulateAlgebraPositionManagerCreateAndInitializePoolIfNecessary =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'createAndInitializePoolIfNecessary',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"decreaseLiquidity"`
 */
export const simulateAlgebraPositionManagerDecreaseLiquidity =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'decreaseLiquidity',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"increaseLiquidity"`
 */
export const simulateAlgebraPositionManagerIncreaseLiquidity =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'increaseLiquidity',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"mint"`
 */
export const simulateAlgebraPositionManagerMint =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"multicall"`
 */
export const simulateAlgebraPositionManagerMulticall =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"permit"`
 */
export const simulateAlgebraPositionManagerPermit =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'permit',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"refundNativeToken"`
 */
export const simulateAlgebraPositionManagerRefundNativeToken =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'refundNativeToken',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateAlgebraPositionManagerSafeTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"selfPermit"`
 */
export const simulateAlgebraPositionManagerSelfPermit =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermit',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"selfPermitAllowed"`
 */
export const simulateAlgebraPositionManagerSelfPermitAllowed =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermitAllowed',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"selfPermitAllowedIfNecessary"`
 */
export const simulateAlgebraPositionManagerSelfPermitAllowedIfNecessary =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermitAllowedIfNecessary',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"selfPermitIfNecessary"`
 */
export const simulateAlgebraPositionManagerSelfPermitIfNecessary =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermitIfNecessary',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateAlgebraPositionManagerSetApprovalForAll =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"setFarmingCenter"`
 */
export const simulateAlgebraPositionManagerSetFarmingCenter =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'setFarmingCenter',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"sweepToken"`
 */
export const simulateAlgebraPositionManagerSweepToken =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'sweepToken',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"switchFarmingStatus"`
 */
export const simulateAlgebraPositionManagerSwitchFarmingStatus =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'switchFarmingStatus',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateAlgebraPositionManagerTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"unwrapWNativeToken"`
 */
export const simulateAlgebraPositionManagerUnwrapWNativeToken =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'unwrapWNativeToken',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPositionManagerAbi}__
 */
export const watchAlgebraPositionManagerEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `eventName` set to `"Approval"`
 */
export const watchAlgebraPositionManagerApprovalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchAlgebraPositionManagerApprovalForAllEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `eventName` set to `"Collect"`
 */
export const watchAlgebraPositionManagerCollectEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    eventName: 'Collect',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `eventName` set to `"DecreaseLiquidity"`
 */
export const watchAlgebraPositionManagerDecreaseLiquidityEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    eventName: 'DecreaseLiquidity',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `eventName` set to `"FarmingFailed"`
 */
export const watchAlgebraPositionManagerFarmingFailedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    eventName: 'FarmingFailed',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `eventName` set to `"IncreaseLiquidity"`
 */
export const watchAlgebraPositionManagerIncreaseLiquidityEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    eventName: 'IncreaseLiquidity',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchAlgebraPositionManagerTransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraQuoterAbi}__
 */
export const readAlgebraQuoter = /*#__PURE__*/ createReadContract({
  abi: algebraQuoterAbi,
  address: algebraQuoterAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"WNativeToken"`
 */
export const readAlgebraQuoterWNativeToken = /*#__PURE__*/ createReadContract({
  abi: algebraQuoterAbi,
  address: algebraQuoterAddress,
  functionName: 'WNativeToken',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"algebraSwapCallback"`
 */
export const readAlgebraQuoterAlgebraSwapCallback =
  /*#__PURE__*/ createReadContract({
    abi: algebraQuoterAbi,
    address: algebraQuoterAddress,
    functionName: 'algebraSwapCallback',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"factory"`
 */
export const readAlgebraQuoterFactory = /*#__PURE__*/ createReadContract({
  abi: algebraQuoterAbi,
  address: algebraQuoterAddress,
  functionName: 'factory',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"poolDeployer"`
 */
export const readAlgebraQuoterPoolDeployer = /*#__PURE__*/ createReadContract({
  abi: algebraQuoterAbi,
  address: algebraQuoterAddress,
  functionName: 'poolDeployer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraQuoterAbi}__
 */
export const writeAlgebraQuoter = /*#__PURE__*/ createWriteContract({
  abi: algebraQuoterAbi,
  address: algebraQuoterAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"quoteExactInput"`
 */
export const writeAlgebraQuoterQuoteExactInput =
  /*#__PURE__*/ createWriteContract({
    abi: algebraQuoterAbi,
    address: algebraQuoterAddress,
    functionName: 'quoteExactInput',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"quoteExactInputSingle"`
 */
export const writeAlgebraQuoterQuoteExactInputSingle =
  /*#__PURE__*/ createWriteContract({
    abi: algebraQuoterAbi,
    address: algebraQuoterAddress,
    functionName: 'quoteExactInputSingle',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"quoteExactOutput"`
 */
export const writeAlgebraQuoterQuoteExactOutput =
  /*#__PURE__*/ createWriteContract({
    abi: algebraQuoterAbi,
    address: algebraQuoterAddress,
    functionName: 'quoteExactOutput',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"quoteExactOutputSingle"`
 */
export const writeAlgebraQuoterQuoteExactOutputSingle =
  /*#__PURE__*/ createWriteContract({
    abi: algebraQuoterAbi,
    address: algebraQuoterAddress,
    functionName: 'quoteExactOutputSingle',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraQuoterAbi}__
 */
export const simulateAlgebraQuoter = /*#__PURE__*/ createSimulateContract({
  abi: algebraQuoterAbi,
  address: algebraQuoterAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"quoteExactInput"`
 */
export const simulateAlgebraQuoterQuoteExactInput =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraQuoterAbi,
    address: algebraQuoterAddress,
    functionName: 'quoteExactInput',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"quoteExactInputSingle"`
 */
export const simulateAlgebraQuoterQuoteExactInputSingle =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraQuoterAbi,
    address: algebraQuoterAddress,
    functionName: 'quoteExactInputSingle',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"quoteExactOutput"`
 */
export const simulateAlgebraQuoterQuoteExactOutput =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraQuoterAbi,
    address: algebraQuoterAddress,
    functionName: 'quoteExactOutput',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"quoteExactOutputSingle"`
 */
export const simulateAlgebraQuoterQuoteExactOutputSingle =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraQuoterAbi,
    address: algebraQuoterAddress,
    functionName: 'quoteExactOutputSingle',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraRouterAbi}__
 */
export const readAlgebraRouter = /*#__PURE__*/ createReadContract({
  abi: algebraRouterAbi,
  address: algebraRouterAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"WNativeToken"`
 */
export const readAlgebraRouterWNativeToken = /*#__PURE__*/ createReadContract({
  abi: algebraRouterAbi,
  address: algebraRouterAddress,
  functionName: 'WNativeToken',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"factory"`
 */
export const readAlgebraRouterFactory = /*#__PURE__*/ createReadContract({
  abi: algebraRouterAbi,
  address: algebraRouterAddress,
  functionName: 'factory',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"poolDeployer"`
 */
export const readAlgebraRouterPoolDeployer = /*#__PURE__*/ createReadContract({
  abi: algebraRouterAbi,
  address: algebraRouterAddress,
  functionName: 'poolDeployer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraRouterAbi}__
 */
export const writeAlgebraRouter = /*#__PURE__*/ createWriteContract({
  abi: algebraRouterAbi,
  address: algebraRouterAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"algebraSwapCallback"`
 */
export const writeAlgebraRouterAlgebraSwapCallback =
  /*#__PURE__*/ createWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'algebraSwapCallback',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"exactInput"`
 */
export const writeAlgebraRouterExactInput = /*#__PURE__*/ createWriteContract({
  abi: algebraRouterAbi,
  address: algebraRouterAddress,
  functionName: 'exactInput',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"exactInputSingle"`
 */
export const writeAlgebraRouterExactInputSingle =
  /*#__PURE__*/ createWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'exactInputSingle',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"exactInputSingleSupportingFeeOnTransferTokens"`
 */
export const writeAlgebraRouterExactInputSingleSupportingFeeOnTransferTokens =
  /*#__PURE__*/ createWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'exactInputSingleSupportingFeeOnTransferTokens',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"exactOutput"`
 */
export const writeAlgebraRouterExactOutput = /*#__PURE__*/ createWriteContract({
  abi: algebraRouterAbi,
  address: algebraRouterAddress,
  functionName: 'exactOutput',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"exactOutputSingle"`
 */
export const writeAlgebraRouterExactOutputSingle =
  /*#__PURE__*/ createWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'exactOutputSingle',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"multicall"`
 */
export const writeAlgebraRouterMulticall = /*#__PURE__*/ createWriteContract({
  abi: algebraRouterAbi,
  address: algebraRouterAddress,
  functionName: 'multicall',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"refundNativeToken"`
 */
export const writeAlgebraRouterRefundNativeToken =
  /*#__PURE__*/ createWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'refundNativeToken',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"selfPermit"`
 */
export const writeAlgebraRouterSelfPermit = /*#__PURE__*/ createWriteContract({
  abi: algebraRouterAbi,
  address: algebraRouterAddress,
  functionName: 'selfPermit',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"selfPermitAllowed"`
 */
export const writeAlgebraRouterSelfPermitAllowed =
  /*#__PURE__*/ createWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'selfPermitAllowed',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"selfPermitAllowedIfNecessary"`
 */
export const writeAlgebraRouterSelfPermitAllowedIfNecessary =
  /*#__PURE__*/ createWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'selfPermitAllowedIfNecessary',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"selfPermitIfNecessary"`
 */
export const writeAlgebraRouterSelfPermitIfNecessary =
  /*#__PURE__*/ createWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'selfPermitIfNecessary',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"sweepToken"`
 */
export const writeAlgebraRouterSweepToken = /*#__PURE__*/ createWriteContract({
  abi: algebraRouterAbi,
  address: algebraRouterAddress,
  functionName: 'sweepToken',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"sweepTokenWithFee"`
 */
export const writeAlgebraRouterSweepTokenWithFee =
  /*#__PURE__*/ createWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'sweepTokenWithFee',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"unwrapWNativeToken"`
 */
export const writeAlgebraRouterUnwrapWNativeToken =
  /*#__PURE__*/ createWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'unwrapWNativeToken',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"unwrapWNativeTokenWithFee"`
 */
export const writeAlgebraRouterUnwrapWNativeTokenWithFee =
  /*#__PURE__*/ createWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'unwrapWNativeTokenWithFee',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraRouterAbi}__
 */
export const simulateAlgebraRouter = /*#__PURE__*/ createSimulateContract({
  abi: algebraRouterAbi,
  address: algebraRouterAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"algebraSwapCallback"`
 */
export const simulateAlgebraRouterAlgebraSwapCallback =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'algebraSwapCallback',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"exactInput"`
 */
export const simulateAlgebraRouterExactInput =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'exactInput',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"exactInputSingle"`
 */
export const simulateAlgebraRouterExactInputSingle =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'exactInputSingle',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"exactInputSingleSupportingFeeOnTransferTokens"`
 */
export const simulateAlgebraRouterExactInputSingleSupportingFeeOnTransferTokens =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'exactInputSingleSupportingFeeOnTransferTokens',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"exactOutput"`
 */
export const simulateAlgebraRouterExactOutput =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'exactOutput',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"exactOutputSingle"`
 */
export const simulateAlgebraRouterExactOutputSingle =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'exactOutputSingle',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"multicall"`
 */
export const simulateAlgebraRouterMulticall =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"refundNativeToken"`
 */
export const simulateAlgebraRouterRefundNativeToken =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'refundNativeToken',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"selfPermit"`
 */
export const simulateAlgebraRouterSelfPermit =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'selfPermit',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"selfPermitAllowed"`
 */
export const simulateAlgebraRouterSelfPermitAllowed =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'selfPermitAllowed',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"selfPermitAllowedIfNecessary"`
 */
export const simulateAlgebraRouterSelfPermitAllowedIfNecessary =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'selfPermitAllowedIfNecessary',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"selfPermitIfNecessary"`
 */
export const simulateAlgebraRouterSelfPermitIfNecessary =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'selfPermitIfNecessary',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"sweepToken"`
 */
export const simulateAlgebraRouterSweepToken =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'sweepToken',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"sweepTokenWithFee"`
 */
export const simulateAlgebraRouterSweepTokenWithFee =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'sweepTokenWithFee',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"unwrapWNativeToken"`
 */
export const simulateAlgebraRouterUnwrapWNativeToken =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'unwrapWNativeToken',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"unwrapWNativeTokenWithFee"`
 */
export const simulateAlgebraRouterUnwrapWNativeTokenWithFee =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'unwrapWNativeTokenWithFee',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__
 */
export const readAlgerbaQuoterV2 = /*#__PURE__*/ createReadContract({
  abi: algerbaQuoterV2Abi,
  address: algerbaQuoterV2Address,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"WNativeToken"`
 */
export const readAlgerbaQuoterV2WNativeToken = /*#__PURE__*/ createReadContract(
  {
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'WNativeToken',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"algebraSwapCallback"`
 */
export const readAlgerbaQuoterV2AlgebraSwapCallback =
  /*#__PURE__*/ createReadContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'algebraSwapCallback',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"factory"`
 */
export const readAlgerbaQuoterV2Factory = /*#__PURE__*/ createReadContract({
  abi: algerbaQuoterV2Abi,
  address: algerbaQuoterV2Address,
  functionName: 'factory',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"poolDeployer"`
 */
export const readAlgerbaQuoterV2PoolDeployer = /*#__PURE__*/ createReadContract(
  {
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'poolDeployer',
  },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__
 */
export const writeAlgerbaQuoterV2 = /*#__PURE__*/ createWriteContract({
  abi: algerbaQuoterV2Abi,
  address: algerbaQuoterV2Address,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"quoteExactInput"`
 */
export const writeAlgerbaQuoterV2QuoteExactInput =
  /*#__PURE__*/ createWriteContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactInput',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"quoteExactInputSingle"`
 */
export const writeAlgerbaQuoterV2QuoteExactInputSingle =
  /*#__PURE__*/ createWriteContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactInputSingle',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"quoteExactOutput"`
 */
export const writeAlgerbaQuoterV2QuoteExactOutput =
  /*#__PURE__*/ createWriteContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactOutput',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"quoteExactOutputSingle"`
 */
export const writeAlgerbaQuoterV2QuoteExactOutputSingle =
  /*#__PURE__*/ createWriteContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactOutputSingle',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__
 */
export const simulateAlgerbaQuoterV2 = /*#__PURE__*/ createSimulateContract({
  abi: algerbaQuoterV2Abi,
  address: algerbaQuoterV2Address,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"quoteExactInput"`
 */
export const simulateAlgerbaQuoterV2QuoteExactInput =
  /*#__PURE__*/ createSimulateContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactInput',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"quoteExactInputSingle"`
 */
export const simulateAlgerbaQuoterV2QuoteExactInputSingle =
  /*#__PURE__*/ createSimulateContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactInputSingle',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"quoteExactOutput"`
 */
export const simulateAlgerbaQuoterV2QuoteExactOutput =
  /*#__PURE__*/ createSimulateContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactOutput',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"quoteExactOutputSingle"`
 */
export const simulateAlgerbaQuoterV2QuoteExactOutputSingle =
  /*#__PURE__*/ createSimulateContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactOutputSingle',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link farmingCenterAbi}__
 */
export const readFarmingCenter = /*#__PURE__*/ createReadContract({
  abi: farmingCenterAbi,
  address: farmingCenterAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"deposits"`
 */
export const readFarmingCenterDeposits = /*#__PURE__*/ createReadContract({
  abi: farmingCenterAbi,
  address: farmingCenterAddress,
  functionName: 'deposits',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"eternalFarming"`
 */
export const readFarmingCenterEternalFarming = /*#__PURE__*/ createReadContract(
  {
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'eternalFarming',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"incentiveKeys"`
 */
export const readFarmingCenterIncentiveKeys = /*#__PURE__*/ createReadContract({
  abi: farmingCenterAbi,
  address: farmingCenterAddress,
  functionName: 'incentiveKeys',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"nonfungiblePositionManager"`
 */
export const readFarmingCenterNonfungiblePositionManager =
  /*#__PURE__*/ createReadContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'nonfungiblePositionManager',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"virtualPoolAddresses"`
 */
export const readFarmingCenterVirtualPoolAddresses =
  /*#__PURE__*/ createReadContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'virtualPoolAddresses',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__
 */
export const writeFarmingCenter = /*#__PURE__*/ createWriteContract({
  abi: farmingCenterAbi,
  address: farmingCenterAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"applyLiquidityDelta"`
 */
export const writeFarmingCenterApplyLiquidityDelta =
  /*#__PURE__*/ createWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'applyLiquidityDelta',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"burnPosition"`
 */
export const writeFarmingCenterBurnPosition = /*#__PURE__*/ createWriteContract(
  {
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'burnPosition',
  },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"claimReward"`
 */
export const writeFarmingCenterClaimReward = /*#__PURE__*/ createWriteContract({
  abi: farmingCenterAbi,
  address: farmingCenterAddress,
  functionName: 'claimReward',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"collectRewards"`
 */
export const writeFarmingCenterCollectRewards =
  /*#__PURE__*/ createWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'collectRewards',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"connectVirtualPool"`
 */
export const writeFarmingCenterConnectVirtualPool =
  /*#__PURE__*/ createWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'connectVirtualPool',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"decreaseLiquidity"`
 */
export const writeFarmingCenterDecreaseLiquidity =
  /*#__PURE__*/ createWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'decreaseLiquidity',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"enterFarming"`
 */
export const writeFarmingCenterEnterFarming = /*#__PURE__*/ createWriteContract(
  {
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'enterFarming',
  },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"exitFarming"`
 */
export const writeFarmingCenterExitFarming = /*#__PURE__*/ createWriteContract({
  abi: farmingCenterAbi,
  address: farmingCenterAddress,
  functionName: 'exitFarming',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"increaseLiquidity"`
 */
export const writeFarmingCenterIncreaseLiquidity =
  /*#__PURE__*/ createWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'increaseLiquidity',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"multicall"`
 */
export const writeFarmingCenterMulticall = /*#__PURE__*/ createWriteContract({
  abi: farmingCenterAbi,
  address: farmingCenterAddress,
  functionName: 'multicall',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__
 */
export const simulateFarmingCenter = /*#__PURE__*/ createSimulateContract({
  abi: farmingCenterAbi,
  address: farmingCenterAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"applyLiquidityDelta"`
 */
export const simulateFarmingCenterApplyLiquidityDelta =
  /*#__PURE__*/ createSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'applyLiquidityDelta',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"burnPosition"`
 */
export const simulateFarmingCenterBurnPosition =
  /*#__PURE__*/ createSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'burnPosition',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"claimReward"`
 */
export const simulateFarmingCenterClaimReward =
  /*#__PURE__*/ createSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"collectRewards"`
 */
export const simulateFarmingCenterCollectRewards =
  /*#__PURE__*/ createSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'collectRewards',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"connectVirtualPool"`
 */
export const simulateFarmingCenterConnectVirtualPool =
  /*#__PURE__*/ createSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'connectVirtualPool',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"decreaseLiquidity"`
 */
export const simulateFarmingCenterDecreaseLiquidity =
  /*#__PURE__*/ createSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'decreaseLiquidity',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"enterFarming"`
 */
export const simulateFarmingCenterEnterFarming =
  /*#__PURE__*/ createSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'enterFarming',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"exitFarming"`
 */
export const simulateFarmingCenterExitFarming =
  /*#__PURE__*/ createSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'exitFarming',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"increaseLiquidity"`
 */
export const simulateFarmingCenterIncreaseLiquidity =
  /*#__PURE__*/ createSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'increaseLiquidity',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"multicall"`
 */
export const simulateFarmingCenterMulticall =
  /*#__PURE__*/ createSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wrappedNativeAbi}__
 */
export const readWrappedNative = /*#__PURE__*/ createReadContract({
  abi: wrappedNativeAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"name"`
 */
export const readWrappedNativeName = /*#__PURE__*/ createReadContract({
  abi: wrappedNativeAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"totalSupply"`
 */
export const readWrappedNativeTotalSupply = /*#__PURE__*/ createReadContract({
  abi: wrappedNativeAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"decimals"`
 */
export const readWrappedNativeDecimals = /*#__PURE__*/ createReadContract({
  abi: wrappedNativeAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readWrappedNativeBalanceOf = /*#__PURE__*/ createReadContract({
  abi: wrappedNativeAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"symbol"`
 */
export const readWrappedNativeSymbol = /*#__PURE__*/ createReadContract({
  abi: wrappedNativeAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"allowance"`
 */
export const readWrappedNativeAllowance = /*#__PURE__*/ createReadContract({
  abi: wrappedNativeAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link wrappedNativeAbi}__
 */
export const writeWrappedNative = /*#__PURE__*/ createWriteContract({
  abi: wrappedNativeAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"approve"`
 */
export const writeWrappedNativeApprove = /*#__PURE__*/ createWriteContract({
  abi: wrappedNativeAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeWrappedNativeTransferFrom = /*#__PURE__*/ createWriteContract(
  { abi: wrappedNativeAbi, functionName: 'transferFrom' },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"withdraw"`
 */
export const writeWrappedNativeWithdraw = /*#__PURE__*/ createWriteContract({
  abi: wrappedNativeAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"transfer"`
 */
export const writeWrappedNativeTransfer = /*#__PURE__*/ createWriteContract({
  abi: wrappedNativeAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"deposit"`
 */
export const writeWrappedNativeDeposit = /*#__PURE__*/ createWriteContract({
  abi: wrappedNativeAbi,
  functionName: 'deposit',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link wrappedNativeAbi}__
 */
export const simulateWrappedNative = /*#__PURE__*/ createSimulateContract({
  abi: wrappedNativeAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"approve"`
 */
export const simulateWrappedNativeApprove =
  /*#__PURE__*/ createSimulateContract({
    abi: wrappedNativeAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateWrappedNativeTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: wrappedNativeAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"withdraw"`
 */
export const simulateWrappedNativeWithdraw =
  /*#__PURE__*/ createSimulateContract({
    abi: wrappedNativeAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"transfer"`
 */
export const simulateWrappedNativeTransfer =
  /*#__PURE__*/ createSimulateContract({
    abi: wrappedNativeAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"deposit"`
 */
export const simulateWrappedNativeDeposit =
  /*#__PURE__*/ createSimulateContract({
    abi: wrappedNativeAbi,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link wrappedNativeAbi}__
 */
export const watchWrappedNativeEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: wrappedNativeAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link wrappedNativeAbi}__ and `eventName` set to `"Approval"`
 */
export const watchWrappedNativeApprovalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: wrappedNativeAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link wrappedNativeAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchWrappedNativeTransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: wrappedNativeAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link wrappedNativeAbi}__ and `eventName` set to `"Deposit"`
 */
export const watchWrappedNativeDepositEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: wrappedNativeAbi,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link wrappedNativeAbi}__ and `eventName` set to `"Withdrawal"`
 */
export const watchWrappedNativeWithdrawalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: wrappedNativeAbi,
    eventName: 'Withdrawal',
  })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__
 */
export const useReadAlgebraBasePlugin = /*#__PURE__*/ createUseReadContract({
  abi: algebraBasePluginAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"ALGEBRA_BASE_PLUGIN_MANAGER"`
 */
export const useReadAlgebraBasePluginAlgebraBasePluginManager =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'ALGEBRA_BASE_PLUGIN_MANAGER',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"defaultPluginConfig"`
 */
export const useReadAlgebraBasePluginDefaultPluginConfig =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'defaultPluginConfig',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"getCurrentFee"`
 */
export const useReadAlgebraBasePluginGetCurrentFee =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'getCurrentFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"getPool"`
 */
export const useReadAlgebraBasePluginGetPool =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'getPool',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"getSingleTimepoint"`
 */
export const useReadAlgebraBasePluginGetSingleTimepoint =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'getSingleTimepoint',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"getTimepoints"`
 */
export const useReadAlgebraBasePluginGetTimepoints =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'getTimepoints',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"handlePluginFee"`
 */
export const useReadAlgebraBasePluginHandlePluginFee =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'handlePluginFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"incentive"`
 */
export const useReadAlgebraBasePluginIncentive =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'incentive',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"isIncentiveConnected"`
 */
export const useReadAlgebraBasePluginIsIncentiveConnected =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'isIncentiveConnected',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"isInitialized"`
 */
export const useReadAlgebraBasePluginIsInitialized =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'isInitialized',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"lastTimepointTimestamp"`
 */
export const useReadAlgebraBasePluginLastTimepointTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'lastTimepointTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"pool"`
 */
export const useReadAlgebraBasePluginPool = /*#__PURE__*/ createUseReadContract(
  { abi: algebraBasePluginAbi, functionName: 'pool' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"s_baseFee"`
 */
export const useReadAlgebraBasePluginSBaseFee =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 's_baseFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"s_feeFactors"`
 */
export const useReadAlgebraBasePluginSFeeFactors =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 's_feeFactors',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"s_priceChangeFactor"`
 */
export const useReadAlgebraBasePluginSPriceChangeFactor =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 's_priceChangeFactor',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"timepointIndex"`
 */
export const useReadAlgebraBasePluginTimepointIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'timepointIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"timepoints"`
 */
export const useReadAlgebraBasePluginTimepoints =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'timepoints',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__
 */
export const useWriteAlgebraBasePlugin = /*#__PURE__*/ createUseWriteContract({
  abi: algebraBasePluginAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterFlash"`
 */
export const useWriteAlgebraBasePluginAfterFlash =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterFlash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterInitialize"`
 */
export const useWriteAlgebraBasePluginAfterInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterInitialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterModifyPosition"`
 */
export const useWriteAlgebraBasePluginAfterModifyPosition =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterModifyPosition',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterSwap"`
 */
export const useWriteAlgebraBasePluginAfterSwap =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterSwap',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeFlash"`
 */
export const useWriteAlgebraBasePluginBeforeFlash =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeFlash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeInitialize"`
 */
export const useWriteAlgebraBasePluginBeforeInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeInitialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeModifyPosition"`
 */
export const useWriteAlgebraBasePluginBeforeModifyPosition =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeModifyPosition',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeSwap"`
 */
export const useWriteAlgebraBasePluginBeforeSwap =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeSwap',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"collectPluginFee"`
 */
export const useWriteAlgebraBasePluginCollectPluginFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'collectPluginFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteAlgebraBasePluginInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"prepayTimepointsStorageSlots"`
 */
export const useWriteAlgebraBasePluginPrepayTimepointsStorageSlots =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'prepayTimepointsStorageSlots',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setBaseFee"`
 */
export const useWriteAlgebraBasePluginSetBaseFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'setBaseFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setIncentive"`
 */
export const useWriteAlgebraBasePluginSetIncentive =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'setIncentive',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setPriceChangeFactor"`
 */
export const useWriteAlgebraBasePluginSetPriceChangeFactor =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'setPriceChangeFactor',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__
 */
export const useSimulateAlgebraBasePlugin =
  /*#__PURE__*/ createUseSimulateContract({ abi: algebraBasePluginAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterFlash"`
 */
export const useSimulateAlgebraBasePluginAfterFlash =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterFlash',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterInitialize"`
 */
export const useSimulateAlgebraBasePluginAfterInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterInitialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterModifyPosition"`
 */
export const useSimulateAlgebraBasePluginAfterModifyPosition =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterModifyPosition',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterSwap"`
 */
export const useSimulateAlgebraBasePluginAfterSwap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterSwap',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeFlash"`
 */
export const useSimulateAlgebraBasePluginBeforeFlash =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeFlash',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeInitialize"`
 */
export const useSimulateAlgebraBasePluginBeforeInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeInitialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeModifyPosition"`
 */
export const useSimulateAlgebraBasePluginBeforeModifyPosition =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeModifyPosition',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeSwap"`
 */
export const useSimulateAlgebraBasePluginBeforeSwap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeSwap',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"collectPluginFee"`
 */
export const useSimulateAlgebraBasePluginCollectPluginFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'collectPluginFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateAlgebraBasePluginInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"prepayTimepointsStorageSlots"`
 */
export const useSimulateAlgebraBasePluginPrepayTimepointsStorageSlots =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'prepayTimepointsStorageSlots',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setBaseFee"`
 */
export const useSimulateAlgebraBasePluginSetBaseFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'setBaseFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setIncentive"`
 */
export const useSimulateAlgebraBasePluginSetIncentive =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'setIncentive',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setPriceChangeFactor"`
 */
export const useSimulateAlgebraBasePluginSetPriceChangeFactor =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'setPriceChangeFactor',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraBasePluginAbi}__
 */
export const useWatchAlgebraBasePluginEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: algebraBasePluginAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `eventName` set to `"BaseFee"`
 */
export const useWatchAlgebraBasePluginBaseFeeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraBasePluginAbi,
    eventName: 'BaseFee',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `eventName` set to `"Incentive"`
 */
export const useWatchAlgebraBasePluginIncentiveEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraBasePluginAbi,
    eventName: 'Incentive',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `eventName` set to `"PriceChangeFactor"`
 */
export const useWatchAlgebraBasePluginPriceChangeFactorEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraBasePluginAbi,
    eventName: 'PriceChangeFactor',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__
 */
export const useReadAlgebraCustomPoolDeployer =
  /*#__PURE__*/ createUseReadContract({ abi: algebraCustomPoolDeployerAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"beforeCreatePoolHook"`
 */
export const useReadAlgebraCustomPoolDeployerBeforeCreatePoolHook =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'beforeCreatePoolHook',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"entryPoint"`
 */
export const useReadAlgebraCustomPoolDeployerEntryPoint =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'entryPoint',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"plugin"`
 */
export const useReadAlgebraCustomPoolDeployerPlugin =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'plugin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"poolToPlugin"`
 */
export const useReadAlgebraCustomPoolDeployerPoolToPlugin =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'poolToPlugin',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__
 */
export const useWriteAlgebraCustomPoolDeployer =
  /*#__PURE__*/ createUseWriteContract({ abi: algebraCustomPoolDeployerAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"createCustomPool"`
 */
export const useWriteAlgebraCustomPoolDeployerCreateCustomPool =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'createCustomPool',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"setFee"`
 */
export const useWriteAlgebraCustomPoolDeployerSetFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'setFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"setPlugin"`
 */
export const useWriteAlgebraCustomPoolDeployerSetPlugin =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'setPlugin',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"setPluginConfig"`
 */
export const useWriteAlgebraCustomPoolDeployerSetPluginConfig =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'setPluginConfig',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"setPluginForPool"`
 */
export const useWriteAlgebraCustomPoolDeployerSetPluginForPool =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'setPluginForPool',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"setTickSpacing"`
 */
export const useWriteAlgebraCustomPoolDeployerSetTickSpacing =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'setTickSpacing',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__
 */
export const useSimulateAlgebraCustomPoolDeployer =
  /*#__PURE__*/ createUseSimulateContract({ abi: algebraCustomPoolDeployerAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"createCustomPool"`
 */
export const useSimulateAlgebraCustomPoolDeployerCreateCustomPool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'createCustomPool',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"setFee"`
 */
export const useSimulateAlgebraCustomPoolDeployerSetFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'setFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"setPlugin"`
 */
export const useSimulateAlgebraCustomPoolDeployerSetPlugin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'setPlugin',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"setPluginConfig"`
 */
export const useSimulateAlgebraCustomPoolDeployerSetPluginConfig =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'setPluginConfig',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"setPluginForPool"`
 */
export const useSimulateAlgebraCustomPoolDeployerSetPluginForPool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'setPluginForPool',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraCustomPoolDeployerAbi}__ and `functionName` set to `"setTickSpacing"`
 */
export const useSimulateAlgebraCustomPoolDeployerSetTickSpacing =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraCustomPoolDeployerAbi,
    functionName: 'setTickSpacing',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__
 */
export const useReadAlgebraEternalFarming = /*#__PURE__*/ createUseReadContract(
  { abi: algebraEternalFarmingAbi, address: algebraEternalFarmingAddress },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"FARMINGS_ADMINISTRATOR_ROLE"`
 */
export const useReadAlgebraEternalFarmingFarmingsAdministratorRole =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'FARMINGS_ADMINISTRATOR_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"INCENTIVE_MAKER_ROLE"`
 */
export const useReadAlgebraEternalFarmingIncentiveMakerRole =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'INCENTIVE_MAKER_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"farmingCenter"`
 */
export const useReadAlgebraEternalFarmingFarmingCenter =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'farmingCenter',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"farms"`
 */
export const useReadAlgebraEternalFarmingFarms =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'farms',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"getRewardInfo"`
 */
export const useReadAlgebraEternalFarmingGetRewardInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'getRewardInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"incentives"`
 */
export const useReadAlgebraEternalFarmingIncentives =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'incentives',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"isEmergencyWithdrawActivated"`
 */
export const useReadAlgebraEternalFarmingIsEmergencyWithdrawActivated =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'isEmergencyWithdrawActivated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"isIncentiveDeactivated"`
 */
export const useReadAlgebraEternalFarmingIsIncentiveDeactivated =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'isIncentiveDeactivated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"nonfungiblePositionManager"`
 */
export const useReadAlgebraEternalFarmingNonfungiblePositionManager =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'nonfungiblePositionManager',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"numOfIncentives"`
 */
export const useReadAlgebraEternalFarmingNumOfIncentives =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'numOfIncentives',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"rewards"`
 */
export const useReadAlgebraEternalFarmingRewards =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'rewards',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__
 */
export const useWriteAlgebraEternalFarming =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"addRewards"`
 */
export const useWriteAlgebraEternalFarmingAddRewards =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'addRewards',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"claimReward"`
 */
export const useWriteAlgebraEternalFarmingClaimReward =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"claimRewardFrom"`
 */
export const useWriteAlgebraEternalFarmingClaimRewardFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'claimRewardFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"collectRewards"`
 */
export const useWriteAlgebraEternalFarmingCollectRewards =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'collectRewards',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"createEternalFarming"`
 */
export const useWriteAlgebraEternalFarmingCreateEternalFarming =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'createEternalFarming',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"deactivateIncentive"`
 */
export const useWriteAlgebraEternalFarmingDeactivateIncentive =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'deactivateIncentive',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"decreaseRewardsAmount"`
 */
export const useWriteAlgebraEternalFarmingDecreaseRewardsAmount =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'decreaseRewardsAmount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"enterFarming"`
 */
export const useWriteAlgebraEternalFarmingEnterFarming =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'enterFarming',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"exitFarming"`
 */
export const useWriteAlgebraEternalFarmingExitFarming =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'exitFarming',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setEmergencyWithdrawStatus"`
 */
export const useWriteAlgebraEternalFarmingSetEmergencyWithdrawStatus =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setEmergencyWithdrawStatus',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setFarmingCenterAddress"`
 */
export const useWriteAlgebraEternalFarmingSetFarmingCenterAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setFarmingCenterAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setRates"`
 */
export const useWriteAlgebraEternalFarmingSetRates =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setRates',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__
 */
export const useSimulateAlgebraEternalFarming =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"addRewards"`
 */
export const useSimulateAlgebraEternalFarmingAddRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'addRewards',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"claimReward"`
 */
export const useSimulateAlgebraEternalFarmingClaimReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"claimRewardFrom"`
 */
export const useSimulateAlgebraEternalFarmingClaimRewardFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'claimRewardFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"collectRewards"`
 */
export const useSimulateAlgebraEternalFarmingCollectRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'collectRewards',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"createEternalFarming"`
 */
export const useSimulateAlgebraEternalFarmingCreateEternalFarming =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'createEternalFarming',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"deactivateIncentive"`
 */
export const useSimulateAlgebraEternalFarmingDeactivateIncentive =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'deactivateIncentive',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"decreaseRewardsAmount"`
 */
export const useSimulateAlgebraEternalFarmingDecreaseRewardsAmount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'decreaseRewardsAmount',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"enterFarming"`
 */
export const useSimulateAlgebraEternalFarmingEnterFarming =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'enterFarming',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"exitFarming"`
 */
export const useSimulateAlgebraEternalFarmingExitFarming =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'exitFarming',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setEmergencyWithdrawStatus"`
 */
export const useSimulateAlgebraEternalFarmingSetEmergencyWithdrawStatus =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setEmergencyWithdrawStatus',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setFarmingCenterAddress"`
 */
export const useSimulateAlgebraEternalFarmingSetFarmingCenterAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setFarmingCenterAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setRates"`
 */
export const useSimulateAlgebraEternalFarmingSetRates =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setRates',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__
 */
export const useWatchAlgebraEternalFarmingEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"EmergencyWithdraw"`
 */
export const useWatchAlgebraEternalFarmingEmergencyWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'EmergencyWithdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"EternalFarmingCreated"`
 */
export const useWatchAlgebraEternalFarmingEternalFarmingCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'EternalFarmingCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"FarmEnded"`
 */
export const useWatchAlgebraEternalFarmingFarmEndedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'FarmEnded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"FarmEntered"`
 */
export const useWatchAlgebraEternalFarmingFarmEnteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'FarmEntered',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"FarmingCenter"`
 */
export const useWatchAlgebraEternalFarmingFarmingCenterEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'FarmingCenter',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"IncentiveDeactivated"`
 */
export const useWatchAlgebraEternalFarmingIncentiveDeactivatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'IncentiveDeactivated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"RewardAmountsDecreased"`
 */
export const useWatchAlgebraEternalFarmingRewardAmountsDecreasedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'RewardAmountsDecreased',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"RewardClaimed"`
 */
export const useWatchAlgebraEternalFarmingRewardClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'RewardClaimed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"RewardsAdded"`
 */
export const useWatchAlgebraEternalFarmingRewardsAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'RewardsAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"RewardsCollected"`
 */
export const useWatchAlgebraEternalFarmingRewardsCollectedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'RewardsCollected',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"RewardsRatesChanged"`
 */
export const useWatchAlgebraEternalFarmingRewardsRatesChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'RewardsRatesChanged',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__
 */
export const useReadAlgebraFactory = /*#__PURE__*/ createUseReadContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadAlgebraFactoryDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"baseFeeConfiguration"`
 */
export const useReadAlgebraFactoryBaseFeeConfiguration =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'baseFeeConfiguration',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"communityVault"`
 */
export const useReadAlgebraFactoryCommunityVault =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'communityVault',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"defaultCommunityFee"`
 */
export const useReadAlgebraFactoryDefaultCommunityFee =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'defaultCommunityFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"farmingAddress"`
 */
export const useReadAlgebraFactoryFarmingAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'farmingAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadAlgebraFactoryGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'getRoleAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"getRoleMember"`
 */
export const useReadAlgebraFactoryGetRoleMember =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'getRoleMember',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"getRoleMemberCount"`
 */
export const useReadAlgebraFactoryGetRoleMemberCount =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'getRoleMemberCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadAlgebraFactoryHasRole = /*#__PURE__*/ createUseReadContract(
  {
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'hasRole',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"hasRoleOrOwner"`
 */
export const useReadAlgebraFactoryHasRoleOrOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'hasRoleOrOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"owner"`
 */
export const useReadAlgebraFactoryOwner = /*#__PURE__*/ createUseReadContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"pendingOwner"`
 */
export const useReadAlgebraFactoryPendingOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'pendingOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"poolByPair"`
 */
export const useReadAlgebraFactoryPoolByPair =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'poolByPair',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"poolDeployer"`
 */
export const useReadAlgebraFactoryPoolDeployer =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'poolDeployer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"renounceOwnershipStartTimestamp"`
 */
export const useReadAlgebraFactoryRenounceOwnershipStartTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'renounceOwnershipStartTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadAlgebraFactorySupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__
 */
export const useWriteAlgebraFactory = /*#__PURE__*/ createUseWriteContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const useWriteAlgebraFactoryAcceptOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"createPool"`
 */
export const useWriteAlgebraFactoryCreatePool =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'createPool',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteAlgebraFactoryGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteAlgebraFactoryRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteAlgebraFactoryRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteAlgebraFactoryRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setBaseFeeConfiguration"`
 */
export const useWriteAlgebraFactorySetBaseFeeConfiguration =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setBaseFeeConfiguration',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setDefaultCommunityFee"`
 */
export const useWriteAlgebraFactorySetDefaultCommunityFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setDefaultCommunityFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setFarmingAddress"`
 */
export const useWriteAlgebraFactorySetFarmingAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setFarmingAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"startRenounceOwnership"`
 */
export const useWriteAlgebraFactoryStartRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'startRenounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"stopRenounceOwnership"`
 */
export const useWriteAlgebraFactoryStopRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'stopRenounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteAlgebraFactoryTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__
 */
export const useSimulateAlgebraFactory =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const useSimulateAlgebraFactoryAcceptOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"createPool"`
 */
export const useSimulateAlgebraFactoryCreatePool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'createPool',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateAlgebraFactoryGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateAlgebraFactoryRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateAlgebraFactoryRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateAlgebraFactoryRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setBaseFeeConfiguration"`
 */
export const useSimulateAlgebraFactorySetBaseFeeConfiguration =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setBaseFeeConfiguration',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setDefaultCommunityFee"`
 */
export const useSimulateAlgebraFactorySetDefaultCommunityFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setDefaultCommunityFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setFarmingAddress"`
 */
export const useSimulateAlgebraFactorySetFarmingAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setFarmingAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"startRenounceOwnership"`
 */
export const useSimulateAlgebraFactoryStartRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'startRenounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"stopRenounceOwnership"`
 */
export const useSimulateAlgebraFactoryStopRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'stopRenounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateAlgebraFactoryTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__
 */
export const useWatchAlgebraFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"DefaultCommunityFee"`
 */
export const useWatchAlgebraFactoryDefaultCommunityFeeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'DefaultCommunityFee',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"FarmingAddress"`
 */
export const useWatchAlgebraFactoryFarmingAddressEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'FarmingAddress',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"FeeConfiguration"`
 */
export const useWatchAlgebraFactoryFeeConfigurationEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'FeeConfiguration',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 */
export const useWatchAlgebraFactoryOwnershipTransferStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchAlgebraFactoryOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"Pool"`
 */
export const useWatchAlgebraFactoryPoolEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'Pool',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchAlgebraFactoryRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchAlgebraFactoryRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchAlgebraFactoryRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"renounceOwnershipFinished"`
 */
export const useWatchAlgebraFactoryRenounceOwnershipFinishedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'renounceOwnershipFinished',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"renounceOwnershipStarted"`
 */
export const useWatchAlgebraFactoryRenounceOwnershipStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'renounceOwnershipStarted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"renounceOwnershipStopped"`
 */
export const useWatchAlgebraFactoryRenounceOwnershipStoppedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'renounceOwnershipStopped',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__
 */
export const useReadAlgebraPool = /*#__PURE__*/ createUseReadContract({
  abi: algebraPoolAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"communityFeeLastTimestamp"`
 */
export const useReadAlgebraPoolCommunityFeeLastTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'communityFeeLastTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"communityVault"`
 */
export const useReadAlgebraPoolCommunityVault =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'communityVault',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"factory"`
 */
export const useReadAlgebraPoolFactory = /*#__PURE__*/ createUseReadContract({
  abi: algebraPoolAbi,
  functionName: 'factory',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"fee"`
 */
export const useReadAlgebraPoolFee = /*#__PURE__*/ createUseReadContract({
  abi: algebraPoolAbi,
  functionName: 'fee',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"getCommunityFeePending"`
 */
export const useReadAlgebraPoolGetCommunityFeePending =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'getCommunityFeePending',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"getReserves"`
 */
export const useReadAlgebraPoolGetReserves =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'getReserves',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"globalState"`
 */
export const useReadAlgebraPoolGlobalState =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'globalState',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"liquidity"`
 */
export const useReadAlgebraPoolLiquidity = /*#__PURE__*/ createUseReadContract({
  abi: algebraPoolAbi,
  functionName: 'liquidity',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"maxLiquidityPerTick"`
 */
export const useReadAlgebraPoolMaxLiquidityPerTick =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'maxLiquidityPerTick',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"nextTickGlobal"`
 */
export const useReadAlgebraPoolNextTickGlobal =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'nextTickGlobal',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"plugin"`
 */
export const useReadAlgebraPoolPlugin = /*#__PURE__*/ createUseReadContract({
  abi: algebraPoolAbi,
  functionName: 'plugin',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"positions"`
 */
export const useReadAlgebraPoolPositions = /*#__PURE__*/ createUseReadContract({
  abi: algebraPoolAbi,
  functionName: 'positions',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"prevTickGlobal"`
 */
export const useReadAlgebraPoolPrevTickGlobal =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'prevTickGlobal',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"tickSpacing"`
 */
export const useReadAlgebraPoolTickSpacing =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'tickSpacing',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"tickTable"`
 */
export const useReadAlgebraPoolTickTable = /*#__PURE__*/ createUseReadContract({
  abi: algebraPoolAbi,
  functionName: 'tickTable',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"ticks"`
 */
export const useReadAlgebraPoolTicks = /*#__PURE__*/ createUseReadContract({
  abi: algebraPoolAbi,
  functionName: 'ticks',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"token0"`
 */
export const useReadAlgebraPoolToken0 = /*#__PURE__*/ createUseReadContract({
  abi: algebraPoolAbi,
  functionName: 'token0',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"token1"`
 */
export const useReadAlgebraPoolToken1 = /*#__PURE__*/ createUseReadContract({
  abi: algebraPoolAbi,
  functionName: 'token1',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"totalFeeGrowth0Token"`
 */
export const useReadAlgebraPoolTotalFeeGrowth0Token =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'totalFeeGrowth0Token',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"totalFeeGrowth1Token"`
 */
export const useReadAlgebraPoolTotalFeeGrowth1Token =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'totalFeeGrowth1Token',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__
 */
export const useWriteAlgebraPool = /*#__PURE__*/ createUseWriteContract({
  abi: algebraPoolAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteAlgebraPoolBurn = /*#__PURE__*/ createUseWriteContract({
  abi: algebraPoolAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"collect"`
 */
export const useWriteAlgebraPoolCollect = /*#__PURE__*/ createUseWriteContract({
  abi: algebraPoolAbi,
  functionName: 'collect',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"flash"`
 */
export const useWriteAlgebraPoolFlash = /*#__PURE__*/ createUseWriteContract({
  abi: algebraPoolAbi,
  functionName: 'flash',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteAlgebraPoolInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPoolAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteAlgebraPoolMint = /*#__PURE__*/ createUseWriteContract({
  abi: algebraPoolAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setCommunityFee"`
 */
export const useWriteAlgebraPoolSetCommunityFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPoolAbi,
    functionName: 'setCommunityFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setFee"`
 */
export const useWriteAlgebraPoolSetFee = /*#__PURE__*/ createUseWriteContract({
  abi: algebraPoolAbi,
  functionName: 'setFee',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setPlugin"`
 */
export const useWriteAlgebraPoolSetPlugin =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPoolAbi,
    functionName: 'setPlugin',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setPluginConfig"`
 */
export const useWriteAlgebraPoolSetPluginConfig =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPoolAbi,
    functionName: 'setPluginConfig',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setTickSpacing"`
 */
export const useWriteAlgebraPoolSetTickSpacing =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPoolAbi,
    functionName: 'setTickSpacing',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"swap"`
 */
export const useWriteAlgebraPoolSwap = /*#__PURE__*/ createUseWriteContract({
  abi: algebraPoolAbi,
  functionName: 'swap',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"swapWithPaymentInAdvance"`
 */
export const useWriteAlgebraPoolSwapWithPaymentInAdvance =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPoolAbi,
    functionName: 'swapWithPaymentInAdvance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__
 */
export const useSimulateAlgebraPool = /*#__PURE__*/ createUseSimulateContract({
  abi: algebraPoolAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateAlgebraPoolBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"collect"`
 */
export const useSimulateAlgebraPoolCollect =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'collect',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"flash"`
 */
export const useSimulateAlgebraPoolFlash =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'flash',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateAlgebraPoolInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateAlgebraPoolMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setCommunityFee"`
 */
export const useSimulateAlgebraPoolSetCommunityFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'setCommunityFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setFee"`
 */
export const useSimulateAlgebraPoolSetFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'setFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setPlugin"`
 */
export const useSimulateAlgebraPoolSetPlugin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'setPlugin',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setPluginConfig"`
 */
export const useSimulateAlgebraPoolSetPluginConfig =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'setPluginConfig',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setTickSpacing"`
 */
export const useSimulateAlgebraPoolSetTickSpacing =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'setTickSpacing',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"swap"`
 */
export const useSimulateAlgebraPoolSwap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'swap',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"swapWithPaymentInAdvance"`
 */
export const useSimulateAlgebraPoolSwapWithPaymentInAdvance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'swapWithPaymentInAdvance',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__
 */
export const useWatchAlgebraPoolEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: algebraPoolAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Burn"`
 */
export const useWatchAlgebraPoolBurnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Burn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Collect"`
 */
export const useWatchAlgebraPoolCollectEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Collect',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"CommunityFee"`
 */
export const useWatchAlgebraPoolCommunityFeeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'CommunityFee',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Fee"`
 */
export const useWatchAlgebraPoolFeeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Fee',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Flash"`
 */
export const useWatchAlgebraPoolFlashEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Flash',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Initialize"`
 */
export const useWatchAlgebraPoolInitializeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Initialize',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Mint"`
 */
export const useWatchAlgebraPoolMintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Mint',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Plugin"`
 */
export const useWatchAlgebraPoolPluginEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Plugin',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"PluginConfig"`
 */
export const useWatchAlgebraPoolPluginConfigEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'PluginConfig',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Swap"`
 */
export const useWatchAlgebraPoolSwapEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Swap',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"TickSpacing"`
 */
export const useWatchAlgebraPoolTickSpacingEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'TickSpacing',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__
 */
export const useReadAlgebraPositionManager =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadAlgebraPositionManagerDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"NONFUNGIBLE_POSITION_MANAGER_ADMINISTRATOR_ROLE"`
 */
export const useReadAlgebraPositionManagerNonfungiblePositionManagerAdministratorRole =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'NONFUNGIBLE_POSITION_MANAGER_ADMINISTRATOR_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"PERMIT_TYPEHASH"`
 */
export const useReadAlgebraPositionManagerPermitTypehash =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'PERMIT_TYPEHASH',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"WNativeToken"`
 */
export const useReadAlgebraPositionManagerWNativeToken =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'WNativeToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadAlgebraPositionManagerBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"factory"`
 */
export const useReadAlgebraPositionManagerFactory =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'factory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"farmingApprovals"`
 */
export const useReadAlgebraPositionManagerFarmingApprovals =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'farmingApprovals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"farmingCenter"`
 */
export const useReadAlgebraPositionManagerFarmingCenter =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'farmingCenter',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadAlgebraPositionManagerGetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadAlgebraPositionManagerIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"isApprovedOrOwner"`
 */
export const useReadAlgebraPositionManagerIsApprovedOrOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'isApprovedOrOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"name"`
 */
export const useReadAlgebraPositionManagerName =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'name',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadAlgebraPositionManagerOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'ownerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"poolDeployer"`
 */
export const useReadAlgebraPositionManagerPoolDeployer =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'poolDeployer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"positions"`
 */
export const useReadAlgebraPositionManagerPositions =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'positions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadAlgebraPositionManagerSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadAlgebraPositionManagerSymbol =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'symbol',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"tokenByIndex"`
 */
export const useReadAlgebraPositionManagerTokenByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'tokenByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"tokenFarmedIn"`
 */
export const useReadAlgebraPositionManagerTokenFarmedIn =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'tokenFarmedIn',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 */
export const useReadAlgebraPositionManagerTokenOfOwnerByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'tokenOfOwnerByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadAlgebraPositionManagerTokenUri =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'tokenURI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadAlgebraPositionManagerTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__
 */
export const useWriteAlgebraPositionManager =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"algebraMintCallback"`
 */
export const useWriteAlgebraPositionManagerAlgebraMintCallback =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'algebraMintCallback',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteAlgebraPositionManagerApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"approveForFarming"`
 */
export const useWriteAlgebraPositionManagerApproveForFarming =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'approveForFarming',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteAlgebraPositionManagerBurn =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"collect"`
 */
export const useWriteAlgebraPositionManagerCollect =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'collect',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"createAndInitializePoolIfNecessary"`
 */
export const useWriteAlgebraPositionManagerCreateAndInitializePoolIfNecessary =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'createAndInitializePoolIfNecessary',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"decreaseLiquidity"`
 */
export const useWriteAlgebraPositionManagerDecreaseLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'decreaseLiquidity',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"increaseLiquidity"`
 */
export const useWriteAlgebraPositionManagerIncreaseLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'increaseLiquidity',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteAlgebraPositionManagerMint =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"multicall"`
 */
export const useWriteAlgebraPositionManagerMulticall =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteAlgebraPositionManagerPermit =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'permit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"refundNativeToken"`
 */
export const useWriteAlgebraPositionManagerRefundNativeToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'refundNativeToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteAlgebraPositionManagerSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"selfPermit"`
 */
export const useWriteAlgebraPositionManagerSelfPermit =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"selfPermitAllowed"`
 */
export const useWriteAlgebraPositionManagerSelfPermitAllowed =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermitAllowed',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"selfPermitAllowedIfNecessary"`
 */
export const useWriteAlgebraPositionManagerSelfPermitAllowedIfNecessary =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermitAllowedIfNecessary',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"selfPermitIfNecessary"`
 */
export const useWriteAlgebraPositionManagerSelfPermitIfNecessary =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermitIfNecessary',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteAlgebraPositionManagerSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"setFarmingCenter"`
 */
export const useWriteAlgebraPositionManagerSetFarmingCenter =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'setFarmingCenter',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"sweepToken"`
 */
export const useWriteAlgebraPositionManagerSweepToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'sweepToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"switchFarmingStatus"`
 */
export const useWriteAlgebraPositionManagerSwitchFarmingStatus =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'switchFarmingStatus',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteAlgebraPositionManagerTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"unwrapWNativeToken"`
 */
export const useWriteAlgebraPositionManagerUnwrapWNativeToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'unwrapWNativeToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__
 */
export const useSimulateAlgebraPositionManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"algebraMintCallback"`
 */
export const useSimulateAlgebraPositionManagerAlgebraMintCallback =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'algebraMintCallback',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateAlgebraPositionManagerApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"approveForFarming"`
 */
export const useSimulateAlgebraPositionManagerApproveForFarming =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'approveForFarming',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateAlgebraPositionManagerBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"collect"`
 */
export const useSimulateAlgebraPositionManagerCollect =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'collect',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"createAndInitializePoolIfNecessary"`
 */
export const useSimulateAlgebraPositionManagerCreateAndInitializePoolIfNecessary =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'createAndInitializePoolIfNecessary',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"decreaseLiquidity"`
 */
export const useSimulateAlgebraPositionManagerDecreaseLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'decreaseLiquidity',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"increaseLiquidity"`
 */
export const useSimulateAlgebraPositionManagerIncreaseLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'increaseLiquidity',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateAlgebraPositionManagerMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"multicall"`
 */
export const useSimulateAlgebraPositionManagerMulticall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateAlgebraPositionManagerPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'permit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"refundNativeToken"`
 */
export const useSimulateAlgebraPositionManagerRefundNativeToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'refundNativeToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateAlgebraPositionManagerSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"selfPermit"`
 */
export const useSimulateAlgebraPositionManagerSelfPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"selfPermitAllowed"`
 */
export const useSimulateAlgebraPositionManagerSelfPermitAllowed =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermitAllowed',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"selfPermitAllowedIfNecessary"`
 */
export const useSimulateAlgebraPositionManagerSelfPermitAllowedIfNecessary =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermitAllowedIfNecessary',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"selfPermitIfNecessary"`
 */
export const useSimulateAlgebraPositionManagerSelfPermitIfNecessary =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermitIfNecessary',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateAlgebraPositionManagerSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"setFarmingCenter"`
 */
export const useSimulateAlgebraPositionManagerSetFarmingCenter =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'setFarmingCenter',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"sweepToken"`
 */
export const useSimulateAlgebraPositionManagerSweepToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'sweepToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"switchFarmingStatus"`
 */
export const useSimulateAlgebraPositionManagerSwitchFarmingStatus =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'switchFarmingStatus',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateAlgebraPositionManagerTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `functionName` set to `"unwrapWNativeToken"`
 */
export const useSimulateAlgebraPositionManagerUnwrapWNativeToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    functionName: 'unwrapWNativeToken',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPositionManagerAbi}__
 */
export const useWatchAlgebraPositionManagerEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchAlgebraPositionManagerApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchAlgebraPositionManagerApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `eventName` set to `"Collect"`
 */
export const useWatchAlgebraPositionManagerCollectEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    eventName: 'Collect',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `eventName` set to `"DecreaseLiquidity"`
 */
export const useWatchAlgebraPositionManagerDecreaseLiquidityEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    eventName: 'DecreaseLiquidity',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `eventName` set to `"FarmingFailed"`
 */
export const useWatchAlgebraPositionManagerFarmingFailedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    eventName: 'FarmingFailed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `eventName` set to `"IncreaseLiquidity"`
 */
export const useWatchAlgebraPositionManagerIncreaseLiquidityEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    eventName: 'IncreaseLiquidity',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPositionManagerAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchAlgebraPositionManagerTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPositionManagerAbi,
    address: algebraPositionManagerAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraQuoterAbi}__
 */
export const useReadAlgebraQuoter = /*#__PURE__*/ createUseReadContract({
  abi: algebraQuoterAbi,
  address: algebraQuoterAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"WNativeToken"`
 */
export const useReadAlgebraQuoterWNativeToken =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraQuoterAbi,
    address: algebraQuoterAddress,
    functionName: 'WNativeToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"algebraSwapCallback"`
 */
export const useReadAlgebraQuoterAlgebraSwapCallback =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraQuoterAbi,
    address: algebraQuoterAddress,
    functionName: 'algebraSwapCallback',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"factory"`
 */
export const useReadAlgebraQuoterFactory = /*#__PURE__*/ createUseReadContract({
  abi: algebraQuoterAbi,
  address: algebraQuoterAddress,
  functionName: 'factory',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"poolDeployer"`
 */
export const useReadAlgebraQuoterPoolDeployer =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraQuoterAbi,
    address: algebraQuoterAddress,
    functionName: 'poolDeployer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraQuoterAbi}__
 */
export const useWriteAlgebraQuoter = /*#__PURE__*/ createUseWriteContract({
  abi: algebraQuoterAbi,
  address: algebraQuoterAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"quoteExactInput"`
 */
export const useWriteAlgebraQuoterQuoteExactInput =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraQuoterAbi,
    address: algebraQuoterAddress,
    functionName: 'quoteExactInput',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"quoteExactInputSingle"`
 */
export const useWriteAlgebraQuoterQuoteExactInputSingle =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraQuoterAbi,
    address: algebraQuoterAddress,
    functionName: 'quoteExactInputSingle',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"quoteExactOutput"`
 */
export const useWriteAlgebraQuoterQuoteExactOutput =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraQuoterAbi,
    address: algebraQuoterAddress,
    functionName: 'quoteExactOutput',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"quoteExactOutputSingle"`
 */
export const useWriteAlgebraQuoterQuoteExactOutputSingle =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraQuoterAbi,
    address: algebraQuoterAddress,
    functionName: 'quoteExactOutputSingle',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraQuoterAbi}__
 */
export const useSimulateAlgebraQuoter = /*#__PURE__*/ createUseSimulateContract(
  { abi: algebraQuoterAbi, address: algebraQuoterAddress },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"quoteExactInput"`
 */
export const useSimulateAlgebraQuoterQuoteExactInput =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraQuoterAbi,
    address: algebraQuoterAddress,
    functionName: 'quoteExactInput',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"quoteExactInputSingle"`
 */
export const useSimulateAlgebraQuoterQuoteExactInputSingle =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraQuoterAbi,
    address: algebraQuoterAddress,
    functionName: 'quoteExactInputSingle',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"quoteExactOutput"`
 */
export const useSimulateAlgebraQuoterQuoteExactOutput =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraQuoterAbi,
    address: algebraQuoterAddress,
    functionName: 'quoteExactOutput',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraQuoterAbi}__ and `functionName` set to `"quoteExactOutputSingle"`
 */
export const useSimulateAlgebraQuoterQuoteExactOutputSingle =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraQuoterAbi,
    address: algebraQuoterAddress,
    functionName: 'quoteExactOutputSingle',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraRouterAbi}__
 */
export const useReadAlgebraRouter = /*#__PURE__*/ createUseReadContract({
  abi: algebraRouterAbi,
  address: algebraRouterAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"WNativeToken"`
 */
export const useReadAlgebraRouterWNativeToken =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'WNativeToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"factory"`
 */
export const useReadAlgebraRouterFactory = /*#__PURE__*/ createUseReadContract({
  abi: algebraRouterAbi,
  address: algebraRouterAddress,
  functionName: 'factory',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"poolDeployer"`
 */
export const useReadAlgebraRouterPoolDeployer =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'poolDeployer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraRouterAbi}__
 */
export const useWriteAlgebraRouter = /*#__PURE__*/ createUseWriteContract({
  abi: algebraRouterAbi,
  address: algebraRouterAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"algebraSwapCallback"`
 */
export const useWriteAlgebraRouterAlgebraSwapCallback =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'algebraSwapCallback',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"exactInput"`
 */
export const useWriteAlgebraRouterExactInput =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'exactInput',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"exactInputSingle"`
 */
export const useWriteAlgebraRouterExactInputSingle =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'exactInputSingle',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"exactInputSingleSupportingFeeOnTransferTokens"`
 */
export const useWriteAlgebraRouterExactInputSingleSupportingFeeOnTransferTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'exactInputSingleSupportingFeeOnTransferTokens',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"exactOutput"`
 */
export const useWriteAlgebraRouterExactOutput =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'exactOutput',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"exactOutputSingle"`
 */
export const useWriteAlgebraRouterExactOutputSingle =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'exactOutputSingle',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"multicall"`
 */
export const useWriteAlgebraRouterMulticall =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"refundNativeToken"`
 */
export const useWriteAlgebraRouterRefundNativeToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'refundNativeToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"selfPermit"`
 */
export const useWriteAlgebraRouterSelfPermit =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'selfPermit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"selfPermitAllowed"`
 */
export const useWriteAlgebraRouterSelfPermitAllowed =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'selfPermitAllowed',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"selfPermitAllowedIfNecessary"`
 */
export const useWriteAlgebraRouterSelfPermitAllowedIfNecessary =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'selfPermitAllowedIfNecessary',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"selfPermitIfNecessary"`
 */
export const useWriteAlgebraRouterSelfPermitIfNecessary =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'selfPermitIfNecessary',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"sweepToken"`
 */
export const useWriteAlgebraRouterSweepToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'sweepToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"sweepTokenWithFee"`
 */
export const useWriteAlgebraRouterSweepTokenWithFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'sweepTokenWithFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"unwrapWNativeToken"`
 */
export const useWriteAlgebraRouterUnwrapWNativeToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'unwrapWNativeToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"unwrapWNativeTokenWithFee"`
 */
export const useWriteAlgebraRouterUnwrapWNativeTokenWithFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'unwrapWNativeTokenWithFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraRouterAbi}__
 */
export const useSimulateAlgebraRouter = /*#__PURE__*/ createUseSimulateContract(
  { abi: algebraRouterAbi, address: algebraRouterAddress },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"algebraSwapCallback"`
 */
export const useSimulateAlgebraRouterAlgebraSwapCallback =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'algebraSwapCallback',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"exactInput"`
 */
export const useSimulateAlgebraRouterExactInput =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'exactInput',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"exactInputSingle"`
 */
export const useSimulateAlgebraRouterExactInputSingle =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'exactInputSingle',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"exactInputSingleSupportingFeeOnTransferTokens"`
 */
export const useSimulateAlgebraRouterExactInputSingleSupportingFeeOnTransferTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'exactInputSingleSupportingFeeOnTransferTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"exactOutput"`
 */
export const useSimulateAlgebraRouterExactOutput =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'exactOutput',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"exactOutputSingle"`
 */
export const useSimulateAlgebraRouterExactOutputSingle =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'exactOutputSingle',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"multicall"`
 */
export const useSimulateAlgebraRouterMulticall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"refundNativeToken"`
 */
export const useSimulateAlgebraRouterRefundNativeToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'refundNativeToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"selfPermit"`
 */
export const useSimulateAlgebraRouterSelfPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'selfPermit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"selfPermitAllowed"`
 */
export const useSimulateAlgebraRouterSelfPermitAllowed =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'selfPermitAllowed',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"selfPermitAllowedIfNecessary"`
 */
export const useSimulateAlgebraRouterSelfPermitAllowedIfNecessary =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'selfPermitAllowedIfNecessary',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"selfPermitIfNecessary"`
 */
export const useSimulateAlgebraRouterSelfPermitIfNecessary =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'selfPermitIfNecessary',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"sweepToken"`
 */
export const useSimulateAlgebraRouterSweepToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'sweepToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"sweepTokenWithFee"`
 */
export const useSimulateAlgebraRouterSweepTokenWithFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'sweepTokenWithFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"unwrapWNativeToken"`
 */
export const useSimulateAlgebraRouterUnwrapWNativeToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'unwrapWNativeToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraRouterAbi}__ and `functionName` set to `"unwrapWNativeTokenWithFee"`
 */
export const useSimulateAlgebraRouterUnwrapWNativeTokenWithFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraRouterAbi,
    address: algebraRouterAddress,
    functionName: 'unwrapWNativeTokenWithFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__
 */
export const useReadAlgerbaQuoterV2 = /*#__PURE__*/ createUseReadContract({
  abi: algerbaQuoterV2Abi,
  address: algerbaQuoterV2Address,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"WNativeToken"`
 */
export const useReadAlgerbaQuoterV2WNativeToken =
  /*#__PURE__*/ createUseReadContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'WNativeToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"algebraSwapCallback"`
 */
export const useReadAlgerbaQuoterV2AlgebraSwapCallback =
  /*#__PURE__*/ createUseReadContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'algebraSwapCallback',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"factory"`
 */
export const useReadAlgerbaQuoterV2Factory =
  /*#__PURE__*/ createUseReadContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'factory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"poolDeployer"`
 */
export const useReadAlgerbaQuoterV2PoolDeployer =
  /*#__PURE__*/ createUseReadContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'poolDeployer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__
 */
export const useWriteAlgerbaQuoterV2 = /*#__PURE__*/ createUseWriteContract({
  abi: algerbaQuoterV2Abi,
  address: algerbaQuoterV2Address,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"quoteExactInput"`
 */
export const useWriteAlgerbaQuoterV2QuoteExactInput =
  /*#__PURE__*/ createUseWriteContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactInput',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"quoteExactInputSingle"`
 */
export const useWriteAlgerbaQuoterV2QuoteExactInputSingle =
  /*#__PURE__*/ createUseWriteContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactInputSingle',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"quoteExactOutput"`
 */
export const useWriteAlgerbaQuoterV2QuoteExactOutput =
  /*#__PURE__*/ createUseWriteContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactOutput',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"quoteExactOutputSingle"`
 */
export const useWriteAlgerbaQuoterV2QuoteExactOutputSingle =
  /*#__PURE__*/ createUseWriteContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactOutputSingle',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__
 */
export const useSimulateAlgerbaQuoterV2 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"quoteExactInput"`
 */
export const useSimulateAlgerbaQuoterV2QuoteExactInput =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactInput',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"quoteExactInputSingle"`
 */
export const useSimulateAlgerbaQuoterV2QuoteExactInputSingle =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactInputSingle',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"quoteExactOutput"`
 */
export const useSimulateAlgerbaQuoterV2QuoteExactOutput =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactOutput',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algerbaQuoterV2Abi}__ and `functionName` set to `"quoteExactOutputSingle"`
 */
export const useSimulateAlgerbaQuoterV2QuoteExactOutputSingle =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algerbaQuoterV2Abi,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactOutputSingle',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link farmingCenterAbi}__
 */
export const useReadFarmingCenter = /*#__PURE__*/ createUseReadContract({
  abi: farmingCenterAbi,
  address: farmingCenterAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"deposits"`
 */
export const useReadFarmingCenterDeposits = /*#__PURE__*/ createUseReadContract(
  {
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'deposits',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"eternalFarming"`
 */
export const useReadFarmingCenterEternalFarming =
  /*#__PURE__*/ createUseReadContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'eternalFarming',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"incentiveKeys"`
 */
export const useReadFarmingCenterIncentiveKeys =
  /*#__PURE__*/ createUseReadContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'incentiveKeys',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"nonfungiblePositionManager"`
 */
export const useReadFarmingCenterNonfungiblePositionManager =
  /*#__PURE__*/ createUseReadContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'nonfungiblePositionManager',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"virtualPoolAddresses"`
 */
export const useReadFarmingCenterVirtualPoolAddresses =
  /*#__PURE__*/ createUseReadContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'virtualPoolAddresses',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__
 */
export const useWriteFarmingCenter = /*#__PURE__*/ createUseWriteContract({
  abi: farmingCenterAbi,
  address: farmingCenterAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"applyLiquidityDelta"`
 */
export const useWriteFarmingCenterApplyLiquidityDelta =
  /*#__PURE__*/ createUseWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'applyLiquidityDelta',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"burnPosition"`
 */
export const useWriteFarmingCenterBurnPosition =
  /*#__PURE__*/ createUseWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'burnPosition',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"claimReward"`
 */
export const useWriteFarmingCenterClaimReward =
  /*#__PURE__*/ createUseWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"collectRewards"`
 */
export const useWriteFarmingCenterCollectRewards =
  /*#__PURE__*/ createUseWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'collectRewards',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"connectVirtualPool"`
 */
export const useWriteFarmingCenterConnectVirtualPool =
  /*#__PURE__*/ createUseWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'connectVirtualPool',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"decreaseLiquidity"`
 */
export const useWriteFarmingCenterDecreaseLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'decreaseLiquidity',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"enterFarming"`
 */
export const useWriteFarmingCenterEnterFarming =
  /*#__PURE__*/ createUseWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'enterFarming',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"exitFarming"`
 */
export const useWriteFarmingCenterExitFarming =
  /*#__PURE__*/ createUseWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'exitFarming',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"increaseLiquidity"`
 */
export const useWriteFarmingCenterIncreaseLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'increaseLiquidity',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"multicall"`
 */
export const useWriteFarmingCenterMulticall =
  /*#__PURE__*/ createUseWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__
 */
export const useSimulateFarmingCenter = /*#__PURE__*/ createUseSimulateContract(
  { abi: farmingCenterAbi, address: farmingCenterAddress },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"applyLiquidityDelta"`
 */
export const useSimulateFarmingCenterApplyLiquidityDelta =
  /*#__PURE__*/ createUseSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'applyLiquidityDelta',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"burnPosition"`
 */
export const useSimulateFarmingCenterBurnPosition =
  /*#__PURE__*/ createUseSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'burnPosition',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"claimReward"`
 */
export const useSimulateFarmingCenterClaimReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"collectRewards"`
 */
export const useSimulateFarmingCenterCollectRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'collectRewards',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"connectVirtualPool"`
 */
export const useSimulateFarmingCenterConnectVirtualPool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'connectVirtualPool',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"decreaseLiquidity"`
 */
export const useSimulateFarmingCenterDecreaseLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'decreaseLiquidity',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"enterFarming"`
 */
export const useSimulateFarmingCenterEnterFarming =
  /*#__PURE__*/ createUseSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'enterFarming',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"exitFarming"`
 */
export const useSimulateFarmingCenterExitFarming =
  /*#__PURE__*/ createUseSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'exitFarming',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"increaseLiquidity"`
 */
export const useSimulateFarmingCenterIncreaseLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'increaseLiquidity',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"multicall"`
 */
export const useSimulateFarmingCenterMulticall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNativeAbi}__
 */
export const useReadWrappedNative = /*#__PURE__*/ createUseReadContract({
  abi: wrappedNativeAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"name"`
 */
export const useReadWrappedNativeName = /*#__PURE__*/ createUseReadContract({
  abi: wrappedNativeAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadWrappedNativeTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: wrappedNativeAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadWrappedNativeDecimals = /*#__PURE__*/ createUseReadContract(
  { abi: wrappedNativeAbi, functionName: 'decimals' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadWrappedNativeBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: wrappedNativeAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadWrappedNativeSymbol = /*#__PURE__*/ createUseReadContract({
  abi: wrappedNativeAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadWrappedNativeAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: wrappedNativeAbi,
    functionName: 'allowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNativeAbi}__
 */
export const useWriteWrappedNative = /*#__PURE__*/ createUseWriteContract({
  abi: wrappedNativeAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteWrappedNativeApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: wrappedNativeAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteWrappedNativeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: wrappedNativeAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteWrappedNativeWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: wrappedNativeAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteWrappedNativeTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: wrappedNativeAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteWrappedNativeDeposit =
  /*#__PURE__*/ createUseWriteContract({
    abi: wrappedNativeAbi,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNativeAbi}__
 */
export const useSimulateWrappedNative = /*#__PURE__*/ createUseSimulateContract(
  { abi: wrappedNativeAbi },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateWrappedNativeApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNativeAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateWrappedNativeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNativeAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateWrappedNativeWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNativeAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateWrappedNativeTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNativeAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNativeAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateWrappedNativeDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNativeAbi,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wrappedNativeAbi}__
 */
export const useWatchWrappedNativeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: wrappedNativeAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wrappedNativeAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchWrappedNativeApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wrappedNativeAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wrappedNativeAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchWrappedNativeTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wrappedNativeAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wrappedNativeAbi}__ and `eventName` set to `"Deposit"`
 */
export const useWatchWrappedNativeDepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wrappedNativeAbi,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wrappedNativeAbi}__ and `eventName` set to `"Withdrawal"`
 */
export const useWatchWrappedNativeWithdrawalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wrappedNativeAbi,
    eventName: 'Withdrawal',
  })
