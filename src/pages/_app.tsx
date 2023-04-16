import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import Layout from "~/components/layout/layout";
import Web3Provider from "~/web3/web3Provider";

import "~/styles/globals.css";

import "@rainbow-me/rainbowkit/styles.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Web3Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Web3Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
