export const pigeonContractAddress2 =
  "0xaAC8528B048055131dEE08DBffD2A186eE66f481";
export const pigeonContractAbi2 = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_userName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_pickupAddress",
        type: "string",
      },
      {
        internalType: "string",
        name: "_dropoffAddress",
        type: "string",
      },
    ],
    name: "createPackage",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "packageId",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "address",
                name: "userAddress",
                type: "address",
              },
              {
                internalType: "string",
                name: "userName",
                type: "string",
              },
            ],
            internalType: "struct Pigeon.User",
            name: "owner",
            type: "tuple",
          },
          {
            internalType: "string",
            name: "pickupAddress",
            type: "string",
          },
          {
            internalType: "string",
            name: "dropoffAddress",
            type: "string",
          },
        ],
        internalType: "struct Pigeon.Package",
        name: "",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPackages",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "packageId",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "address",
                name: "userAddress",
                type: "address",
              },
              {
                internalType: "string",
                name: "userName",
                type: "string",
              },
            ],
            internalType: "struct Pigeon.User",
            name: "owner",
            type: "tuple",
          },
          {
            internalType: "string",
            name: "pickupAddress",
            type: "string",
          },
          {
            internalType: "string",
            name: "dropoffAddress",
            type: "string",
          },
        ],
        internalType: "struct Pigeon.Package[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "idToPackage",
    outputs: [
      {
        internalType: "uint256",
        name: "packageId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "userName",
            type: "string",
          },
        ],
        internalType: "struct Pigeon.User",
        name: "owner",
        type: "tuple",
      },
      {
        internalType: "string",
        name: "pickupAddress",
        type: "string",
      },
      {
        internalType: "string",
        name: "dropoffAddress",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
