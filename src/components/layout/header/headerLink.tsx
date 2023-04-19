import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function HeaderLink({
  text,
  link,
  list,
  isMobile,
  onClick,
}: {
  text: string;
  link: string;
  list?: { name: string; link: string; icon: any }[];
  isMobile?: boolean;
  onClick?: () => void;
}) {
  const [menuShown, setMenuShown] = useState(false);
  const isList = !!list && list?.length > 0;

  return (
    <>
      <li
        className="relative font-Nunito text-gray-300 transition-all"
        onMouseEnter={() => setMenuShown(true)}
        onMouseLeave={() => setMenuShown(false)}
        onClick={() => setMenuShown((menu) => !menu)}>
        <Link
          href={isList ? "" : link}
          onClick={isList ? undefined : onClick}
          className={`
          flex items-center gap-2
          ${
            isList
              ? menuShown && !isMobile
                ? "text-accent"
                : "text-gray-300"
              : "hover:text-accent"
          }`}>
          <span>{text.toUpperCase()}</span>
          {isList && <IoIosArrowDown className="" />}
        </Link>

        {isMobile && isList && (
          <ul className={`transition-all duration-500`}>
            <div className="relative z-10 -ml-3 flex w-[200px] flex-col gap-4 py-2 px-3 text-end">
              {!!list &&
                list.map((l, i) => (
                  <li key={`${text}-${i}`} className="flex items-center gap-4">
                    <Image
                      src={l.icon}
                      width={16}
                      height={16}
                      alt="icon"></Image>
                    <Link
                      href={l.link}
                      onClick={onClick}
                      className="font-Nunito text-xl text-gray-300 transition-all hover:text-accent">
                      {l.name}
                    </Link>
                  </li>
                ))}
            </div>
          </ul>
        )}
        {isList && !isMobile && (
          <ul
            className={`transition-all duration-500 ${
              menuShown ? "opacity-100" : "hidden opacity-0"
            }`}>
            <div className="absolute z-10 -ml-3 w-[200px]">
              <div className="mt-9 flex flex-col gap-5 rounded-b-lg bg-primaryDarker py-3 px-3">
                {list.map((l, i) => (
                  <li
                    key={`${text}-${i}`}
                    className="group flex items-center gap-3">
                    <Image
                      src={l.icon}
                      width={16}
                      height={16}
                      alt="icon"
                      className="group-hover:text-accent"></Image>

                    <Link
                      href={l.link}
                      onClick={onClick}
                      className="font-Nunito text-xl text-gray-300 transition-all hover:text-accent">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </div>
            </div>
          </ul>
        )}
      </li>
    </>
  );
}
