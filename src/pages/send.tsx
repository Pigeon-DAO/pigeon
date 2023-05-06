import HeroLayout from "~/components/layout/heroLayout";

import monitorWithArm from "~/assets/send/monitor-with-arm.png";
import Image from "next/image";
import Button from "~/components/ui/button";

export default function Send() {
  return (
    <HeroLayout>
      <div className="flex h-full w-full max-w-5xl items-center justify-center md:justify-between md:px-4">
        <div className="text-left">
          <h1>Send a Package</h1>
          <p className="my-8 max-w-md">
            Get your package listed anywhere in the world in 7 steps. Then get
            it{" "}
            <span className="text-accent">delivered anywhere, at anytime</span>.
          </p>
          <div className="my-12 flex gap-6">
            <Button styleType="accentFill">Get Started</Button>
            <Button styleType="whiteOutline">Start Test</Button>
          </div>
        </div>
        <div>
          <Image
            src={monitorWithArm}
            alt="monitor with package"
            width={monitorWithArm.width}
            height={monitorWithArm.height}
            className="mb-12 hidden md:block md:w-60 lg:w-72"
          />
        </div>
      </div>
    </HeroLayout>
  );
}
