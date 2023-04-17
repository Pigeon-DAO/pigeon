import Link from "next/link";

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

export default function Footer() {
  return (
    <div className="flex w-full justify-between bg-black/40 py-12 px-8">
      <ul className="flex flex-wrap gap-8">
        {FooterLinks.map((link) => (
          <li key={link.title}>
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
      <p>&copy; {new Date().getFullYear()} Pigeon DAO LLC</p>
    </div>
  );
}
