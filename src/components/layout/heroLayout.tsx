import { ReactNode } from "react";

import dotsVector from "~/assets/svg/dotsVector.svg";

import ellipse9 from "~/assets/halos/hero/ellipse-9.png";
import ellipse10 from "~/assets/halos/hero/ellipse-10.png";
import ellipse11 from "~/assets/halos/hero/ellipse-11.png";
import ellipse12 from "~/assets/halos/hero/ellipse-12.png";

import Image from "next/image";

export default function HeroLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative w-full bg-primary px-4">
      {/* halos */}
      <div className="opacity-80">
        <Image
          src={ellipse10.src}
          alt=""
          className="absolute left-0 -top-5 w-80"
          width={ellipse10.width}
          height={ellipse10.height}
        />
        <Image
          src={ellipse9.src}
          alt=""
          className="absolute -left-20 top-20"
          width={ellipse9.width / 1.4}
          height={ellipse9.height / 1.4}
        />

        <Image
          src={ellipse11.src}
          alt=""
          className="absolute -right-10 top-10 h-full"
          width={ellipse11.width / 1.4}
          height={ellipse11.height / 1.4}
        />
        <Image
          src={ellipse12.src}
          alt=""
          className="absolute -right-10 top-10 h-full"
          width={ellipse12.width / 1.4}
          height={ellipse12.height / 1.4}
        />
      </div>

      <div className="absolute left-0"></div>
      <div className="absolute right-0 top-0 w-full">
        <img
          src={dotsVector.src}
          alt=""
          className="h-[850px] object-right-top"
        />
      </div>
      <div className="relative flex h-[740px] min-h-screen w-full flex-col items-center justify-center text-center">
        {children}
      </div>
    </main>
  );
}
