import { ReactNode } from "react";
import { useAppStore } from "stores/useAppStore";

import NoSSR from "react-no-ssr";
import Header from "./header";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { Container, Engine, SizeMode } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import conf from "../particles";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );
  const loading = useAppStore((state) => state.loading);
  const loadingMessage = useAppStore((state) => state.loadingMessage);

  return (
    <div className="relative">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        // @ts-ignore
        options={conf}
      />
      <Header />

      <div className="flex min-h-screen flex-col items-center bg-gradient-to-b pt-24 text-white">
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
