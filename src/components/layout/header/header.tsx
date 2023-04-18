import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

import Link from "next/link";

import pigeonlogo from "~/assets/svg/logo.svg";
import HeaderLink from "./headerLink";
import Button from "~/components/ui/button";

import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useId, useState } from "react";

const HeaderLinks: {
  text: string;
  link: string;
  list?: { name: string; link: string }[];
}[] = [
  {
    text: "products",
    link: "/products",
    list: [
      { name: "Explore", link: "/app" },
      { name: "Send Package", link: "/app/participant" },
      { name: "Drive & Earn", link: "/app/courier" },
    ],
  },
  {
    text: "developers",
    link: "/developers",
  },
  {
    text: "integration",
    link: "/integration",
  },
];

export default function Header() {
  const account = useAccount();
  const session = useSession();
  const pathname = useRouter().pathname;
  const user = session.data?.user;
  const id = useId();
  const [menuOpen, setMenuOpen] = useState(false);

  const [headerText, setHeaderText] = useState("Home");

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "unset";
    }
  }, [menuOpen]);

  useEffect(() => {
    setHeaderText(
      pathname === "/"
        ? "Home"
        : pathname === "/profile"
        ? "My Account"
        : pathname === "/whats-next"
        ? "What's Next"
        : // Header
        pathname === "/products"
        ? "Products"
        : pathname === "/developers"
        ? "Developers"
        : pathname === "/integration"
        ? "Integration"
        : // Footer
        pathname === "/privacy"
        ? "Privacy Policy"
        : pathname === "/terms"
        ? "Terms of Use"
        : pathname === "/content-policy"
        ? "Content Policy"
        : ""
    );
  }, [pathname]);

  return (
    <>
      <div className="absolute right-0 left-0 top-0 z-10 flex h-20 w-full select-none items-center justify-between bg-black/40 py-12 px-8 backdrop-blur-sm md:px-16">
        <Link href="/">
          <div className="flex items-center gap-5">
            <img src={pigeonlogo.src} className="h-14 w-14"></img>
            <div className="flex flex-col">
              <p className="font-Nunito text-2xl font-bold text-white text-shadow-lg">
                Pigeon DAO
              </p>
              {headerText.length > 0 && (
                <div className="flex items-center gap-1">
                  <p className="">|</p>
                  <p className="pl-[1px] pt-[3px]">{headerText}</p>
                </div>
              )}
            </div>
          </div>
        </Link>

        <div className="items-center gap-2">
          <ul className="hidden items-center gap-8 lg:flex">
            {HeaderLinks.map((link, i) => (
              <HeaderLink
                text={link.text}
                link={link.link}
                list={link.list}
                key={`${id}-${i}`}
              />
            ))}
            <Button type="link" href="/profile" styleType="accentOutline">
              connect wallet
            </Button>
          </ul>
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}>
            <RxHamburgerMenu className="h-8 w-8 text-gray-300 transition-all hover:scale-105 hover:text-white" />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-20 flex h-full min-h-[300px] touch-none flex-col items-center justify-center overflow-y-scroll bg-black/80 py-12 backdrop-blur-lg">
          <ul className="flex h-full flex-col gap-6 text-center text-3xl">
            <Button
              type="link"
              href="/profile"
              styleType="accentOutline"
              onClick={() => setMenuOpen(false)}>
              connect wallet
            </Button>
            <HeaderLink
              text="Home"
              link="/"
              isMobile={true}
              onClick={() => setMenuOpen(false)}
            />
            {HeaderLinks.map((link, i) => (
              <HeaderLink
                text={link.text}
                link={link.link}
                list={link.list}
                isMobile={true}
                key={`${id}-${i}`}
                onClick={() => setMenuOpen(false)}
              />
            ))}
            <HeaderLink
              text="Close menu"
              link=""
              isMobile={true}
              onClick={() => setMenuOpen(false)}
            />
          </ul>
        </div>
      )}
    </>
  );
}
