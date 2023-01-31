import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "@utils/api";

import Layout from "@components/layout";
import Web3Provider from "web3/web3Provider";

import "@styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import UserContext from "userContext/userContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <UserContext>
        <Web3Provider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Web3Provider>
      </UserContext>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
