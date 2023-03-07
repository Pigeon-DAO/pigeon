export const contractAddress = "0xEa9ecBfAb7E9061518cdc1BD4563a94b57422C02";
export const abi = [
  {
    inputs: [],
    name: "acceptCourier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "agreeDeliveryFinished",
    outputs: [],
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
      {
        indexed: true,
        internalType: "address",
        name: "courier",
        type: "address",
      },
    ],
    name: "AgreementSelected",
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
      {
        indexed: true,
        internalType: "address",
        name: "courier",
        type: "address",
      },
    ],
    name: "CommenceDelivery",
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
    outputs: [],
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
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rejectCourier",
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
    name: "selectPackage",
    outputs: [],
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
] as const;
