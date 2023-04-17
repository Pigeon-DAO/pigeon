import Link from "next/link";
import { useEffect, useId, useState } from "react";
// import { useTranslation } from "next-i18next";
import ListboxUI from "../ui/listBox";

const FooterLinks: {
  title: string;
  href: string;
}[] = [
  {
    title: "Home",
    href: "/",
  },
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Terms of Use", href: "/terms-of-use" },
  { title: "Content Policy", href: "/content-policy" },
  { title: "Code of Ethics", href: "/code-of-ethics" },
];

import { FaDiscord } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import { IconType } from "react-icons";

const FooterIcons: {
  icon: IconType;
  href: string;
}[] = [
  { icon: FaDiscord, href: "/" },
  { icon: FaTwitter, href: "/" },
  { icon: FaLinkedin, href: "/" },
  { icon: FaInstagram, href: "/" },
];

export default function Footer() {
  const id = useId();
  const id2 = useId();
  return (
    <div className="relative flex w-full flex-col items-center justify-between gap-8 bg-black/40 py-6 px-8">
      <div className="lg:absolute lg:left-4 lg:top-2">
        <LanguageSelector />
      </div>

      <ul className="flex flex-col items-center gap-8 md:flex-row md:flex-wrap">
        {FooterLinks.map((link, i) => (
          <li key={`${link.title}-${i}`}>
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
      <ul className="flex flex-wrap gap-6">
        {FooterIcons.map((link, i) => (
          <li key={`${"footer-icon"}-${i}`}>
            <Link href={link.href}>
              <link.icon size={24} />
            </Link>
          </li>
        ))}
      </ul>

      <p>&copy; {new Date().getFullYear()} Pigeon DAO LLC</p>
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
      console.log(localStorage.getItem("i18nextLng"));
      setDefaultLanguage(localStorage.getItem("i18nextLng") as string);
    }
  }, []);
  console.log(
    LanguageSelections[
      LanguageSelections.findIndex((s) => s.value === defaultLanguage)
    ]!
  );
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
