import HeroLayout from "~/components/layout/heroLayout";
import Button from "~/components/ui/button";
import car from "~/assets/drive/car.png";
import Image from "next/image";

export default function Drive() {
  return (
    <HeroLayout>
      <div className="flex h-full max-w-6xl items-center px-2 text-start">
        <div className="flex w-full max-w-xl flex-col gap-4">
          <h1>Welcome to Drive & Earn</h1>
          <p>
            Get your package listed anywhere in the world in 7 steps. Then get
            it{" "}
            <span className="text-accent">delivered anywhere, at anytime.</span>
          </p>
          <div className="flex gap-8">
            <Button
              link
              href="/app/drive"
              styleType="accentFill"
              className="w-36">
              Earn
            </Button>
            <Button link styleType="whiteOutline">
              Apply Now
            </Button>
          </div>
        </div>
        <div>
          <Image
            src={car.src}
            alt="car"
            width={car.width}
            height={car.height}
            className="-mr-32 hidden pl-12 md:block"
          />
        </div>
      </div>
    </HeroLayout>
  );
}
