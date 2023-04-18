import Link from "next/link";
import { ReactNode } from "react";

export default function Button({
  children,
  type = "button",
  styleType,
  href = "/",
  onClick,
}: {
  children: ReactNode;
  type?: "button" | "link";
  styleType: "accentFill" | "accentOutline" | "whiteFill" | "whiteOutline";
  href?: string;
  onClick?: () => void;
}) {
  function getClassName() {
    return `rounded-md px-4 my-4 py-2 font-Nunito font-semibold transition-all duration-500 uppercase ${
      styleType === "accentFill"
        ? "border-2 border-accent bg-accent text-black hover:bg-primary hover:text-accent"
        : styleType === "accentOutline"
        ? "border-2 border-accent text-accent hover:bg-accent hover:text-black"
        : styleType === "whiteFill"
        ? "border-2 border-white bg-white text-black hover:bg-primary hover:text-white"
        : "border-2 border-white text-white hover:bg-white hover:text-primary"
    }`;
  }
  return type === "button" ? (
    <button className={getClassName()} onClick={onClick}>
      {children}
    </button>
  ) : (
    <Link className={getClassName()} href={href} onClick={onClick}>
      {children}
    </Link>
  );
}
