import { signIn, signOut, useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

import ConnectWalletButton from "web3/connectWalletButton";
import Pigeon from "assets/pigeon.png";
import Link from "next/link";

export default function Header() {
  const account = useAccount();
  const session = useSession();
  const pathname = useRouter().pathname;
  const user = session.data?.user;
  return (
    <div className="fixed right-0 left-0 top-0 flex h-20 w-full items-center justify-between bg-black/40 pl-4 pr-8 backdrop-blur-sm">
      <Link href="/">
        <div className="flex items-center">
          <img src={Pigeon.src} className="h-20 w-20"></img>
          <h2 className="mb-1 text-white">
            {pathname === "/" && "Pigeon MVP • Home"}
            {pathname === "/profile" && "Pigeon MVP • My Profile"}
            {pathname === "/courier" && "Pigeon MVP • Courier"}
            {pathname === "/participant" && "Pigeon MVP • Participant"}
          </h2>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        {session.status === "authenticated" && (
          <div className="flex gap-2">
            <div className="dropdown-bottom dropdown-end dropdown">
              <label tabIndex={0} className="btn m-1 flex gap-4">
                {user?.image && (
                  <img src={user.image} className="h-8 w-8 rounded-full" />
                )}
                <span>{user?.name}</span>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow">
                <li>
                  <Link href="/profile">My Profile</Link>
                </li>
                <li>
                  <span onClick={() => signOut()}>Sign Out</span>
                </li>
              </ul>
            </div>
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
