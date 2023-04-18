import { signIn, signOut, useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

import Link from "next/link";

import pigeonlogo from "~/assets/svg/logo.svg";
import HeaderLink from "./headerLink";
import Button from "~/components/ui/button";

import { RxHamburgerMenu } from "react-icons/rx";

export default function Header() {
  const account = useAccount();
  const session = useSession();
  const pathname = useRouter().pathname;
  const user = session.data?.user;

  return (
    <div className="absolute right-0 left-0 top-0 z-20 flex h-20 w-full items-center justify-between bg-black/40 py-12 px-8 backdrop-blur-sm md:px-20">
      <Link href="/">
        <div className="flex items-center gap-5">
          <img src={pigeonlogo.src} className="h-14 w-14"></img>
          <p className="mb-1 font-Nunito text-2xl font-bold text-white text-shadow-lg">
            {pathname === "/" && "Pigeon DAO"}
          </p>
        </div>
      </Link>

      <div className="items-center gap-2">
        <ul className="hidden items-center gap-10 md:flex">
          <HeaderLink text={"Products"} link="/products" />
          <HeaderLink text={"Developers"} link="/developers" />
          <HeaderLink text={"Integration"} link="/integration" />
          <Button type="nextLink" href="/profile" styleType="accentOutline">
            my account
          </Button>
        </ul>
        <div className="md:hidden">
          <RxHamburgerMenu className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  );
}

/* {session.status === "authenticated" && (
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
                className="dropdown-content menu rounded-box bg-base-100 w-52 p-2 shadow">
                <li>
                  <Link href="/profile">My Profile</Link>
                </li>
                <li>
                  <span onClick={() => signOut()}>Sign Out</span>
                </li>
              </ul>
            </div>
          </div>
        )} */

/* {session.status === "unauthenticated" && (
          <button className="btn" onClick={() => signIn()}>
            Sign in
          </button>
        )} */
