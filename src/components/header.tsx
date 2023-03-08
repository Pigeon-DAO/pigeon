import { signIn, signOut, useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import ConnectWalletButton from "web3/connectWalletButton";
import Pigeon from "assets/pigeon.png";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const account = useAccount();
  const session = useSession();
  const pathname = useRouter().pathname;
  const user = session.data?.user;
  return (
    <div className="absolute right-0 left-0 top-0 flex h-20 w-full items-center justify-between px-4">
      <Link href="/">
        <img src={Pigeon.src} className="h-20 w-20"></img>
      </Link>
      <h2 className="text-white">
        {pathname === "/" && "Home"}
        {pathname === "/courier" && "Courier"}
        {pathname === "/participant" && "Participant"}
      </h2>
      <div className="flex items-center gap-2">
        {session.status === "authenticated" && (
          <div className="flex w-full flex-col items-end">
            {!account.address && <ConnectWalletButton />}
            <button
              className="btn flex w-fit items-center justify-end gap-2 py-1"
              onClick={!!session.data ? () => signOut() : () => signIn()}>
              <div className="flex flex-col text-end">
                <span>{user?.name}</span>
              </div>

              {user?.image && (
                <img src={user.image} className="h-10 w-10 rounded-full"></img>
              )}
            </button>
            {account && (
              <span className="text-sm text-white">{account.address}</span>
            )}
          </div>
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
