import { ReactNode } from "react";

import dotsVector from "~/assets/svg/dotsVector.svg";

export default function HeroLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative w-full bg-primary px-4">
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
