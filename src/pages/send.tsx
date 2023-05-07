import HeroLayout from "~/components/layout/heroLayout";

import monitorWithArm from "~/assets/send/monitor-with-arm.png";
import Image, { StaticImageData } from "next/image";
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
              <Button styleType="accentFill" link>
                Get Started
              </Button>
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
      <div className="relative my-28 flex w-full flex-col items-center gap-8">
        <Section
          heading="Are you hungry?"
          description="Get food from your favorite restaurant or groceries off the shelf. Your drivers will get it delivered for you."
          image={food}
          imageAlt="food"
        />
        <Section
          heading="Is anything better than receiving a package?"
          description="Pigeon DAO allows you to have a package dropped to your desired address. This can be anything from an envelope or a small gift, allowing you to trade products to your potential customers."
          image={packagePicture}
          imageAlt="a person wrapping a package with tape"
          flip
        />
        <Section
          heading="We believe in you"
          description="Even if you are a small company, you can use our delivery service. We will deliver industrial goods instead of the hassle of changing your operator."
          image={delivery}
          imageAlt="delivery people in a warehouse"
        />
        <Section
          heading="Make your package fly"
          description="If you need to send a large-scale package to another country, you can use our platform to pay someone directly for your service. You will receive instant compensation while having transparent tracking and encrypted messaging."
          image={plane}
          imageAlt="delivery people in a warehouse"
          flip
        />
      </div>
      <div className="flex w-full max-w-3xl flex-col justify-center gap-10 px-4 pt-24 pb-56">
        <h2>Talk to our experts</h2>
        <input type="text" placeholder="Full Name" className="input" />
        <div className="flex flex-col justify-center gap-8 md:flex-row">
          <input type="text" placeholder="Email" className="input flex-1" />
          <input type="text" placeholder="Company" className="input flex-1" />
        </div>
        <textarea
          placeholder="Type your request"
          className="input resize-none"
        />
        <Button styleType="blueSquare" className="w-40">
          Submit
        </Button>
      </div>
    </>
  );
}

// Reusable component for a section with text and image
const Section = ({
  heading,
  description,
  image,
  imageAlt,
  flip,
}: {
  heading: string;
  description: string;
  image: StaticImageData;
  imageAlt: string;
  flip?: boolean;
}) => {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-between gap-4 px-4 lg:flex-row">
      <div className={`max-w-xl ${flip ? "lg:order-2" : "lg:order-0"}`}>
        <h3 className="pb-4">{heading}</h3>
        <p className="text-gray-200">{description}</p>
      </div>
      <Image
        src={image.src}
        className="h-64 w-96 rounded-2xl border-4 border-white object-cover lg:w-64"
        alt={imageAlt}
        width={image.width}
        height={image.height}
      />
    </div>
  );
};
