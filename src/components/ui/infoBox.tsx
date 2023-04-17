import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import check from "~/assets/svg/check.svg";

export default function InfoBox({
  title,
  t1,
  t2,
  t3,
  icon,
  link,
}: {
  title: string;
  t1: string;
  t2: string;
  t3: string;
  icon: string;
  link: string;
}) {
  const id = useId();

  return (
    <div className="outlint my-8 mx-auto w-full max-w-[300px] rounded-3xl bg-gradient-to-b from-accent to-primaryDarker p-[3px]">
      <div className="flex h-full flex-col items-center gap-8 rounded-3xl bg-primaryDarker px-2 py-4">
        <Image src={icon} alt="" width={30} height={30} className="h-32 w-32" />

        <h3 className="text-accent">{title.toUpperCase()}</h3>
        <div className="flex flex-col items-start gap-4">
          {[t1, t2, t3].map((t, i) => (
            <div
              className="flex h-[40px] items-center gap-2 text-start"
              key={`${id}-${i}`}>
              <Image
                src={check.src}
                alt=""
                width={check.width}
                height={check.height}
              />
              <p>{t}</p>
            </div>
          ))}
        </div>

        <Link
          className="rounded-md bg-accent3 px-7 py-1 font-Poppins text-white transition-all duration-300 hover:bg-accent hover:text-black"
          href={link}>
          Learn More
        </Link>
      </div>
    </div>
  );
}
