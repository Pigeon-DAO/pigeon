import { ReactNode } from "react";

export default function OutlineBox({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 flex w-fit flex-wrap justify-between gap-10 rounded-3xl border-2 border-accent px-12 py-10">
      {children}
    </div>
  );
}
