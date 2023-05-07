import HeroLayout from "~/components/layout/heroLayout";

import monitorWithArm from "~/assets/send/monitor-with-arm.png";
import Image from "next/image";
import Button from "~/components/ui/button";

import delivery from "~/assets/send/delivery.jpeg";
import food from "~/assets/send/food.jpeg";
import packagePicture from "~/assets/send/package.jpeg";
import plane from "~/assets/send/plane.jpeg";

export default function Send() {
  return (
    <>
      <HeroLayout>
        <div className="flex h-full w-full max-w-5xl items-center justify-center md:justify-between md:px-4">
          <div className="text-left">
            <h1>Send a Package</h1>
            <p className="my-8 max-w-md">
              Get your package listed anywhere in the world in 7 steps. Then get
              it{" "}
              <span className="text-accent">
                delivered anywhere, at anytime
              </span>
              .
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
      <div className="relative flex w-full flex-col items-center gap-8 py-28">
        <div className="flex w-full max-w-4xl items-center justify-between">
          <div className="max-w-xl">
            <h3 className="pb-4">Are you hungry?</h3>
            <p className="text-gray-200">
              Get food from your favorite restaurant or groceries off the shelf.
              Your drivers will get it delivered for you.
            </p>
          </div>
          <Image
            src={food.src}
            width={food.width}
            height={food.height}
            className="h-64 w-64 rounded-2xl border-4 border-white object-cover"
            alt="food"></Image>
        </div>
        <div className="flex w-full max-w-4xl items-center justify-between">
          <div className="order-2 max-w-xl">
            <h3 className="pb-4">
              Is anything better than receiving a package?
            </h3>
            <p className="text-gray-200">
              Pigeon DAO allows you to have a package dropped to your desired
              address. This can be anything from an envelope or a small gift,
              allowing you to trade products to your potential customers.
            </p>
          </div>
          <Image
            src={packagePicture.src}
            width={packagePicture.width}
            height={packagePicture.height}
            className="h-64 w-64 rounded-2xl border-4 border-white object-cover"
            alt="a person wrapping a package with tape"></Image>
        </div>
        <div className="flex w-full max-w-4xl items-center justify-between">
          <div className="max-w-xl">
            <h3 className="pb-4">We believe in you</h3>
            <p className="text-gray-200">
              Even if you are a small company, you can use our delivery service.
              We will deliver industrial goods instead of the hassle of changing
              your operator.
            </p>
          </div>
          <Image
            src={delivery.src}
            width={delivery.width}
            height={delivery.height}
            className="h-64 w-64 rounded-2xl border-4 border-white object-cover"
            alt="delivery people in a warehouse"></Image>
        </div>
        <div className="flex w-full max-w-4xl items-center justify-between">
          <div className="order-2 max-w-xl">
            <h3 className="pb-4">Make your package fly</h3>
            <p className="text-gray-200">
              If you need to send a large-scale package to another country, you
              can use our platform to pay someone directly for your service. You
              will receive instant compensation while having transparent
              tracking and encrypted messaging.
            </p>
          </div>
          <Image
            src={plane.src}
            width={plane.width}
            height={plane.height}
            className="h-64 w-64 rounded-2xl border-4 border-white object-cover"
            alt="delivery people in a warehouse"></Image>
        </div>
      </div>
    </>
  );
}
