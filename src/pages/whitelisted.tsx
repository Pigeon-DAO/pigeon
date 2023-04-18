import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useAccount } from "wagmi";

import Head from "next/head";
import Button from "~/components/ui/button";

export default function Home() {
  const session = useSession();
  const account = useAccount();
  const user = api.user.getUser.useQuery(undefined, {
    enabled: session.status === "authenticated",
  });

  return (
    <>
      <Head>
        <title>Pigeon MVP</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen">
        <div className="container mt-14 flex flex-col items-center gap-12 px-4 pt-20">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Welcome to Pigeon <span className="text-accent">BETA</span>
          </h1>

          <h2>
            The Pigeon Beta is the sucessor to the first functional MVP of
            Pigeon.
          </h2>
          <h3>
            You are not whitelisted yet. But hold tight! The beta will be
            released publicly soon!
          </h3>

          <Button type="link" href="/" styleType="accentOutline">
            return home
          </Button>
        </div>
      </main>
    </>
  );
}
