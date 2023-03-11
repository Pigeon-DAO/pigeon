export const contractAddress = "0x38C9303EBCD73B90da7781b6048fECf8026B1708";
export const abi = [
  {
    inputs: [],
    name: "acceptCourier",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "agreeDeliveryFinished",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "participant",
        type: "address",
      },
    ],
    name: "AgreementCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "participant",
        type: "address",
      },
    ],
    name: "CourierMarkedDeliveryFinished",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "participant",
        type: "address",
      },
    ],
    name: "CourierSelectedAgreement",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_pickup",
        type: "string",
      },
      {
        internalType: "string",
        name: "_dropoff",
        type: "string",
      },
    ],
    name: "createAgreement",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_participant",
        type: "address",
      },
    ],
    name: "markDeliveryFinished",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "participant",
        type: "address",
      },
    ],
    name: "ParticipantAcceptedCourier",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "participant",
        type: "address",
      },
    ],
    name: "ParticipantAgreedDeliveryFinished",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "participant",
        type: "address",
      },
    ],
    name: "ParticipantRejectedCourier",
    type: "event",
  },
  {
    inputs: [],
    name: "rejectCourier",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_participant",
        type: "address",
      },
    ],
    name: "selectAgreement",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
    ],
    name: "withdrawFees",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "agreements",
    outputs: [
      {
        internalType: "string",
        name: "pickup",
        type: "string",
      },
      {
        internalType: "string",
        name: "dropoff",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "cost",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "participant",
        type: "address",
      },
      {
        internalType: "address",
        name: "courier",
        type: "address",
      },
      {
        internalType: "enum Courier.AgreementState",
        name: "state",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_participant",
        type: "address",
      },
    ],
    name: "getAgreement",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "pickup",
            type: "string",
          },
          {
            internalType: "string",
            name: "dropoff",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "cost",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "participant",
            type: "address",
          },
          {
            internalType: "address",
            name: "courier",
            type: "address",
          },
          {
            internalType: "enum Courier.AgreementState",
            name: "state",
            type: "uint8",
          },
        ],
        internalType: "struct Courier.Agreement",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
