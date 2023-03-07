import { ReactNode } from "react";
import NoSSR from "react-no-ssr";
import { useAppStore } from "stores/useAppStore";
import Header from "./header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const loading = useAppStore((state) => state.loading);
  const loadingMessage = useAppStore((state) => state.loadingMessage);
  console.log(loading);
  console.log(loadingMessage);
  return (
    <>
      <Header />

      <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] pt-24 text-white">
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
    </>
  );
};

export default Layout;
