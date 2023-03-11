import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { ReactNode } from "react";
import { Chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, arbitrumGoerli, mainnet } from "@wagmi/core/chains";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { env } from "@env/client.mjs";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const ganacheChain: Chain = {
  /** ID in number form */
  id: 1337,
  /** Human-readable name */
  name: "ganache",

  /** Internal network name */
  network: "ganache",

  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:7545"],
    },
    public: {
      http: ["http://127.0.0.1:7545"],
    },
  },
  testnet: true,
};

const { chains, provider, webSocketProvider } = configureChains(
  [
    ...(env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [mainnet, goerli, arbitrumGoerli, ganacheChain]
      : [mainnet]),
  ],
  [
    jsonRpcProvider({ rpc: () => ({ http: "http://127.0.0.1:7545" }) }),
    alchemyProvider({ apiKey: "_c61zld3NCwcTetLWN9F0ku279Sa8GYK" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Pigeon DAO",
  chains,
});

const appInfo = {
  appName: "Pigeon DAO",
};

// const connectors = connectorsForWallets([
//   ...wallets,
//   {
//     groupName: "Other",
//     wallets: [
//       argentWallet({ chains }),
//       trustWallet({ chains }),
//       ledgerWallet({ chains }),
//     ],
//   },
// ]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

interface Web3ProviderProps {
  children: ReactNode;
}
const Web3Provider = ({ children }: Web3ProviderProps) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitSiweNextAuthProvider>
        <RainbowKitProvider
          appInfo={appInfo}
          chains={chains}
          theme={midnightTheme({
            accentColor: "transparent",
            accentColorForeground: "white",
            borderRadius: "small",
            fontStack: undefined,
          })}>
          {children}
        </RainbowKitProvider>
      </RainbowKitSiweNextAuthProvider>
    </WagmiConfig>
  );
};

export default Web3Provider;
