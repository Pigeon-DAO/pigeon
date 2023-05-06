import { ReactNode } from "react";

import dotsVector from "~/assets/svg/dotsVector.svg";

import ellipse9 from "~/assets/halos/hero/ellipse-9.png";
import ellipse10 from "~/assets/halos/hero/ellipse-10.png";
import ellipse11 from "~/assets/halos/hero/ellipse-11.png";
import ellipse12 from "~/assets/halos/hero/ellipse-12.png";

import Image from "next/image";
import space from "~/assets/space.jpeg";

export default function HeroLayout({
  children,
  showLines = false,
}: {
  children: ReactNode;
  showLines?: boolean;
}) {
  return (
    <main
      className="relative w-full bg-cover"
      style={{
        backgroundImage: `url(${space.src})`,
      }}>
      <div className="bg-primary/90 px-4">
        {/* halos */}
        <div className="absolute top-0 right-10 left-0 bottom-0 opacity-80">
          <Image
            src={ellipse10.src}
            alt=""
            className="pointer-events-none absolute left-0 -top-5 w-80"
            width={ellipse10.width}
            height={ellipse10.height}
          />
          <Image
            src={ellipse9.src}
            alt=""
            className="pointer-events-none absolute -left-20 top-20"
            width={ellipse9.width / 1.4}
            height={ellipse9.height / 1.4}
          />

          <Image
            src={ellipse11.src}
            alt=""
            className="pointer-events-none absolute -right-10 top-10 h-full overflow-hidden"
            width={ellipse11.width / 1.4}
            height={ellipse11.height / 1.4}
          />
          <Image
            src={ellipse12.src}
            alt=""
            className="pointer-events-none absolute -right-10 top-10 h-full overflow-hidden"
            width={ellipse12.width / 1.4}
            height={ellipse12.height / 1.4}
          />
        </div>

        {showLines && (
          <div className="absolute right-0 top-0 w-full">
            <img
              src={dotsVector.src}
              alt=""
              className="h-[850px] object-right-top"
            />
          </div>
        )}

        <div className="relative flex h-[740px] min-h-screen w-full flex-col items-center justify-center text-center">
          {children}
        </div>
      </div>
    </main>
  );
}
