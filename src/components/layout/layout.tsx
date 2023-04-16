import { ReactNode } from "react";
import { useAppStore } from "~/stores/useAppStore";

import NoSSR from "react-no-ssr";
import Header from "./header/header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const loading = useAppStore((state) => state.loading);
  const loadingMessage = useAppStore((state) => state.loadingMessage);

  return (
    <div className="relative w-full text-white">
      <Header />
      <div className="flex min-h-screen w-full flex-col items-center bg-primary text-white">
        {children}
      </div>
      <NoSSR>
        {/* Loading */}
        {loading && (
          <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black bg-opacity-70">
            <div className="relative flex flex-col items-center gap-4">
              <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-white"></div>
              <span className="absolute -mt-10 h-full w-80 break-before-avoid font-bold text-white">
                {loadingMessage}
              </span>
            </div>
          </div>
        )}
      </NoSSR>
    </div>
  );
};

export default Layout;
