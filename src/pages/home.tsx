import Layout from "@components/layout";
import { signOut, useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount, useDisconnect, useProvider } from "wagmi";
import ConnectWalletButton from "web3/connectWalletButton";

const Home = () => {
  const session = useSession();
  const account = useAccount();
  const router = useRouter();

  const { disconnect } = useDisconnect();
  const provider = useProvider();

  const removeWallet = async () => {
    disconnect();
    const items = { ...localStorage };
    console.log(Object.keys(items));
    Object.keys(items).map((item: string) => {
      if (item?.includes("wagmi") || item?.includes("walletlink")) {
        localStorage.removeItem(item);
      }
    });
  };

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/");
    }
  }, [session.status]);

  return (
    <Layout>
      <h1>Welcome to Pigeon</h1>

      {!session.status && <p>Loading...</p>}
      {!!session.data?.user && (
        <div className="flex flex-col gap-2">
          <h2>Name: {session.data.user.name}</h2>
          <h3>Email: {session.data.user.email}</h3>
          <img
            src={session.data.user.image!}
            alt="Profile"
            className="mx-auto h-32 w-32 object-cover"></img>
          {account.status === "connected" && (
            <div>
              <p>Account connected: {account.address}</p>
              <button
                className="btn"
                onClick={() => {
                  removeWallet();
                }}>
                Remove Wallet
              </button>
              <em>Metamask users must disconnect from the extension.</em>
            </div>
          )}
          {account.status === "connecting" && <p>Connecting...</p>}
          {account.status === "disconnected" && <ConnectWalletButton />}
          {account.status === "reconnecting" && <p>Reconnecting...</p>}
        </div>
      )}
    </Layout>
  );
};

export default Home;
