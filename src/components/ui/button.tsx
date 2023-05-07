import Link from "next/link";
import { ReactNode } from "react";

export default function Button({
  children,
  link = false,
  styleType = "accentOutline",
  href = "/",
  className = "",
  onClick,
}: {
  children?: ReactNode;
  link?: boolean;
  styleType?:
    | "accentFill"
    | "accentOutline"
    | "whiteFill"
    | "whiteOutline"
    | "blueSquare";
  href?: string;
  className?: string;
  onClick?: () => void;
}) {
  function getClassName() {
    return `inline-block rounded-md px-6 my-2 py-2 font-Nunito font-semibold transition-all duration-500 uppercase ${
      styleType === "accentFill"
        ? "border-2 border-accent bg-accent text-black hover:bg-primary hover:text-accent"
        : styleType === "accentOutline"
        ? "border-2 border-accent text-accent hover:bg-accent hover:text-black"
        : styleType === "whiteFill"
        ? "border-2 border-white bg-white text-black hover:bg-primary hover:text-white"
        : styleType === "blueSquare"
        ? "border-none bg-blue-600 text-white hover:bg-blue-600 hover:text-white rounded-none"
        : "border-2 border-white text-white hover:bg-white hover:text-primary"
    } ${className}`;
  }
  return !link ? (
    <button className={getClassName()} onClick={onClick}>
      {children}
    </button>
  ) : (
    <Link className={getClassName()} href={href} onClick={onClick}>
      {children}
    </Link>
  );
}
