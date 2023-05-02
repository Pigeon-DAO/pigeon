import Link from "next/link";
import { useEffect, useId, useState } from "react";

import ListboxUI from "../ui/listBox";

import { FaDiscord } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import { IconType } from "react-icons";

const FooterLinks: {
  title: string;
  href: string;
  newTab?: boolean;
}[] = [
  {
    title: "Home",
    href: "/",
  },

  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms of Use", href: "/terms" },
  { title: "Content Policy", href: "/content-policy" },
  {
    title: "Docs",
    href: "https://docs.pigeondao.org/documentation/",
    newTab: true,
  },
];

const FooterIcons: {
  icon: IconType;
  href: string;
}[] = [
  { icon: FaDiscord, href: "https://discord.gg/YJ8ngD3mtq" },
  {
    icon: FaTwitter,
    href: "https://twitter.com/pigeondao",
  },
  { icon: FaLinkedin, href: "https://www.linkedin.com/company/pigeondao" },
  { icon: FaInstagram, href: "https://www.instagram.com/pigeondao/" },
];

export default function Footer() {
  const id = useId();
  const id2 = useId();
  return (
    <div className="absolute bottom-0 w-full bg-primaryDarker px-8 py-6">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-black/30"></div>
      <div className="relative flex w-full flex-col items-center justify-between gap-8">
        <div className="lg:absolute lg:left-0 lg:top-0">
          <LanguageSelector />
        </div>
        <ul className="flex flex-col items-center gap-8 md:flex-row md:flex-wrap">
          {FooterLinks.map((link, i) => (
            <li key={`${link.title}-${i}`}>
              <Link href={link.href} target={link.newTab ? "_blank" : "_self"}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-6">
          {FooterIcons.map((link, i) => (
            <li key={`${"footer-icon"}-${i}`}>
              <a href={link.href} target="_blank" rel="noreferrer noopener">
                <link.icon size={24} />
              </a>
            </li>
          ))}
        </ul>
        <p>&copy; {new Date().getFullYear()} Pigeon DAO LLC</p>
      </div>
    </div>
  );
}

const LanguageSelections = [
  { name: "Spanish", value: "es" },
  { name: "English", value: "en" },
];

function LanguageSelector() {
  // const { t, i18n } = useTranslation();
  // const [language, setLanguage] = useState(i18n.language);
  const [defaultLanguage, setDefaultLanguage] = useState("en");
  const changeLanguage = (lng: string) => {
    // i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
    // setLanguage(lng);
  };

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")) {
      changeLanguage(localStorage.getItem("i18nextLng") as string);
      // console.log(localStorage.getItem("i18nextLng"));
      setDefaultLanguage(localStorage.getItem("i18nextLng") as string);
    }
  }, []);
  // console.log(
  //   LanguageSelections[
  //     LanguageSelections.findIndex((s) => s.value === defaultLanguage)
  //   ]!
  // );
  return (
    <div className="w-36">
      <ListboxUI
        selections={LanguageSelections}
        defaultSel={
          LanguageSelections[
            LanguageSelections.findIndex((s) => s.value === defaultLanguage)
          ]!
        }
        onSelectValue={(v) => {
          changeLanguage(v);
        }}
      />
    </div>
  );
}
