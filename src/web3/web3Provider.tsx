import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { ReactNode } from "react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, arbitrumGoerli, mainnet } from "@wagmi/core/chains";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { env } from "@env/client.mjs";

const { chains, provider, webSocketProvider } = configureChains(
  [
    ...(env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [mainnet, goerli, arbitrumGoerli]
      : [mainnet]),
  ],
  [
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
