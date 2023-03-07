import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import NoSSR from "react-no-ssr";
import { api } from "@utils/api";
import { useAccount } from "wagmi";
import ConnectWalletButton from "web3/connectWalletButton";

export default function Home() {
  const session = useSession();
  const account = useAccount();

  return (
    <>
      <Head>
        <title>Pigeon MVP</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen">
        <div className="container flex flex-col items-center gap-12 px-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Pigeon MVP
          </h1>
          <div className="flex flex-col">
            <h3>{session.status === "loading" && <p>Loading...</p>}</h3>
            {session.status === "unauthenticated" && (
              <span>Please sign in.</span>
            )}
            <NoSSR>
              {!account.address && <span>Please connect your wallet.</span>}
            </NoSSR>

            {session.status === "authenticated" && account.isConnected && (
              <>
                <h3>How are you going to use Pigeon?</h3>
                <div className="flex flex-col gap-2">
                  <span>
                    By being a participant, you will create the agreement and
                    work with the driver.
                  </span>
                  <Link href="/participant">
                    <button>Participate</button>
                  </Link>
                  <span>
                    By being the courier, you will be responsible for delivering
                    to participants' needs.
                  </span>
                  <Link href="/courier">
                    <button>Be a courier</button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
