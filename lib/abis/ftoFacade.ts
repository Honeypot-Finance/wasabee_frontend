export const ftoFacadeABI = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "OwnershipTransferred",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "token0",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "token1",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "pair",
          type: "address"
        },
        { indexed: false, internalType: "uint256", name: "", type: "uint256" }
      ],
      name: "PairCreated",
      type: "event"
    },
    {
      inputs: [],
      name: "INIT_CODE_PAIR_HASH",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        { internalType: "address", name: "depositer", type: "address" },
        { internalType: "address", name: "ftoPair", type: "address" }
      ],
      name: "addEvent",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [{ internalType: "address", name: "caller", type: "address" }],
      name: "addWhiteList",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "allPairs",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "allPairsLength",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        { internalType: "address", name: "tokenA", type: "address" },
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "symbol", type: "string" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
        { internalType: "address", name: "poolHandler", type: "address" },
        { internalType: "uint256", name: "rasing_cycle", type: "uint256" }
      ],
      name: "createFTO",
      outputs: [{ internalType: "address", name: "pair", type: "address" }],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [{ internalType: "address", name: "depositer", type: "address" }],
      name: "events",
      outputs: [{ internalType: "address[]", name: "pairs", type: "address[]" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "address", name: "", type: "address" }
      ],
      name: "getPair",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "i_link",
      outputs: [
        {
          internalType: "contract LinkTokenInterface",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "i_registrar",
      outputs: [
        {
          internalType: "contract AutomationRegistrarInterface",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [{ internalType: "address", name: "caller", type: "address" }],
      name: "removeWhiteList",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "whitelists",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function"
    }
  ]