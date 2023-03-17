import Alert from "@components/ui/alert";
import { api } from "@utils/api";
import { signIn, useSession } from "next-auth/react";
import NoSSR from "react-no-ssr";
import { useAccount } from "wagmi";
import ConnectWalletButton from "web3/connectWalletButton";

export default function Profile() {
  const account = useAccount();
  const session = useSession();
  const user = api.user.getUser.useQuery(undefined, {
    enabled: session.status === "authenticated",
  });

  const walletLinkCorrect =
    !!account.address && user.data?.address === account.address;

  const linkAddress = api.user.linkAddress.useMutation({
    onSuccess: () => {
      console.log("sucessful");
      user.refetch();
    },
  });

  return (
    <div className="w-full max-w-3xl">
      <h1>My Profile</h1>
      <NoSSR>
        <div className="flex flex-col gap-10 pb-24">
          <div>
            <h3>Account Standing</h3>
            <div className="flex items-center gap-2">
              <span
                className={`inline-block h-4 w-4 rounded-full ${
                  session.status === "authenticated"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}></span>
              <span>Signed in with web2 account.</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-block h-4 w-4 rounded-full ${
                  account.address ? "bg-green-500" : "bg-red-500"
                }`}></span>
              <span>Signed in with web3 account.</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-block h-4 w-4 rounded-full ${
                  walletLinkCorrect ? "bg-green-500" : "bg-red-500"
                }`}></span>
              <span>Web3 address linked with our database.</span>
            </div>
          </div>

          <div>
            <h3>My web2 account</h3>
            {session.status === "authenticated" ? (
              <>
                {user.data?.image && (
                  <img
                    src={user.data.image}
                    className="h-28 w-28 rounded-full"
                  />
                )}
                <h4 className="font-bold">{user.data?.name}</h4>
                <h4>{user.data?.email}</h4>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <h4>Not signed in.</h4>
                <button className="btn-primary btn" onClick={() => signIn()}>
                  Sign In
                </button>
              </div>
            )}
          </div>

          <div>
            <h3>My web3 account</h3>
            <h4>Status: {account.status}</h4>
            {!account.address ? (
              <ConnectWalletButton />
            ) : (
              <h4>{account.address}</h4>
            )}
          </div>

          <div>
            <h3>Wallet linking</h3>
            {walletLinkCorrect ? (
              <h4>Your current wallet is linked correctly.</h4>
            ) : user.data?.address && account.address ? (
              <div>
                <h4 className="py-4">
                  <Alert
                    type="warning"
                    text="There is a wallet mismatch. You can either sign in with the
                  address on file, or link with your current wallet."></Alert>
                </h4>
                <div className="py-4 pb-8">
                  <h4>
                    <b>Wallet on file: </b>
                    {user.data?.address}
                  </h4>
                  <h4>
                    <b>Your wallet: </b>
                    {account.address}
                  </h4>
                </div>

                <button
                  className="btn-primary btn"
                  onClick={() =>
                    linkAddress.mutate({ address: account.address as string })
                  }>
                  Link Current Wallet
                </button>
              </div>
            ) : account.address ? (
              <div>
                <div>
                  <h4>You need to link your wallet to your account.</h4>
                  <span>
                    The address is UNIQUE to this account, and cannot be used
                    anywhere. It is used to identify you on this platform. It
                    may be changed later.
                  </span>
                  <button
                    className="btn-primary btn"
                    onClick={() =>
                      linkAddress.mutate({ address: account.address as string })
                    }>
                    Link Wallet
                  </button>
                </div>
                <span></span>
              </div>
            ) : (
              <span>Please connect your wallet first.</span>
            )}
          </div>
        </div>
      </NoSSR>
    </div>
  );
}
