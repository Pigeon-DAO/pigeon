import { signIn, signOut, useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import ConnectWalletButton from "web3/connectWalletButton";

export default function Header() {
  const account = useAccount();
  const session = useSession();
  const user = session.data?.user;
  return (
    <div className="absolute right-0 left-0 top-0 flex h-16 w-full justify-end">
      <div className="flex">
        {session.status === "authenticated" && (
          <>
            <button
              className="btn flex items-center gap-2"
              onClick={!!session.data ? () => signOut() : () => signIn()}>
              <div className="flex flex-col text-end">
                <span>{user?.name}</span>
                {account && <span>{account.address}</span>}
              </div>

              {user?.image && (
                <img src={user.image} className="h-10 w-10 rounded-full"></img>
              )}
            </button>
            {!account.address && <ConnectWalletButton />}
          </>
        )}
        {session.status === "unauthenticated" && (
          <button className="btn" onClick={() => signIn()}>
            Sign in
          </button>
        )}
      </div>
    </div>
  );
}
