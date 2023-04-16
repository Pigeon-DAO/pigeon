import Link from "next/link";

export default function HeaderLink({
  text,
  link,
}: {
  text: string;
  link: string;
}) {
  return (
    <li className="font-Nunito text-gray-300 transition-all hover:text-white">
      <Link href={link}>{text.toUpperCase()}</Link>
    </li>
  );
}
