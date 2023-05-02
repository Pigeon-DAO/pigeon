import Head from "next/head";
import Button from "~/components/ui/button";

import OutlineBox from "~/components/ui/outlineBox";

import whatIsPigeon from "~/assets/svg/whatIsPigeon.svg";
import Image from "next/image";

import blocks from "~/assets/svg/icons/blocks.svg";
import msgs from "~/assets/svg/icons/msgs.svg";
import trigGrear from "~/assets/svg/icons/trig-gear.svg";
import juring from "~/assets/svg/icons/juring.svg";

import InfoBox from "~/components/ui/infoBox";

import landingMap from "~/assets/landingMap.png";
import HeroLayout from "~/components/layout/heroLayout";

import ellipse13 from "~/assets/halos/ellipse-13.png";
import ellipse14 from "~/assets/halos/ellipse-14.png";

import pigeonHalo from "~/assets/halos/pigeon-halo.png";

import ellipse15 from "~/assets/halos/ellipse-15.png";
import ellipse43 from "~/assets/halos/ellipse-43.png";

import ellipse44 from "~/assets/halos/ellipse-44.png";
import ellipse45 from "~/assets/halos/ellipse-45.png";

export default function Home() {
  return (
    <div className="relative w-full">
      <Head>
        <title>Pigeon DAO | The beta dApp</title>
        <meta
          name="description"
          content="Pigeon DAO is an entirely decentralized backend for transportation, designed with Solidity, smart contracts, Web3 protocols and much more!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSection />
      <StatsSection />
      <WhatIsPigeonDAOSection />
      <NewToPigeonDAOSection />
      <CommunitySection />
      <ResourcesSection />
    </div>
  );
}

function HeroSection() {
  return (
    <HeroLayout>
      <>
        <h1 className="py-4">
          PIGEON DAO, THE<br></br> COURIER DAPP
        </h1>
        <p className="max-w-xl text-[#D9F7F5] text-shadow">
          The world's first decentralized courier for any driver, business, or
          organization, built on blockchain technology.
        </p>
        <div className="mt-12">
          <div className="flex w-full gap-3">
            <Button styleType="accentFill" type="link" href="/whats-next">
              what's next
            </Button>
            <Button styleType="whiteOutline" type="link" href="/app">
              join beta
            </Button>
          </div>
        </div>
      </>
    </HeroLayout>
  );
}
function StatsSection() {
  return (
    <div className="relative flex flex-col items-center bg-primaryDarker px-8 py-28">
      <OutlineBox>
        <div className="text-center">
          <h4 className="font-bold">+256</h4>
          <p>Finished Transactions</p>
        </div>
        <div className="text-center">
          <h4 className="font-bold">21</h4>
          <p>Verified Drivers</p>
        </div>
        <div className="text-center">
          <h4 className="font-bold">$43.2</h4>
          <p>Total Fees Collected</p>
        </div>
        <div className="text-center">
          <h4 className="font-bold">600</h4>
          <p>Users Registered</p>
        </div>
      </OutlineBox>
    </div>
  );
}
function WhatIsPigeonDAOSection() {
  return (
    <div className="relative w-full px-8 py-20 md:px-16">
      <div className="opacity-80">
        <Image
          src={ellipse14.src}
          alt=""
<<<<<<< HEAD
          className="absolute -top-32 left-0 object-contain"
=======
          className="pointer-events-none absolute left-0 -top-32 object-contain"
>>>>>>> 7e0ac3c05649a3c18ee79ece99e5b4c29aa271fe
          width={ellipse14.width}
          height={ellipse14.height}
        />
        <Image
          src={ellipse13.src}
          alt=""
<<<<<<< HEAD
          className="absolute -top-32 right-0 object-contain"
=======
          className="pointer-events-none absolute right-0 -top-32 object-contain"
>>>>>>> 7e0ac3c05649a3c18ee79ece99e5b4c29aa271fe
          width={ellipse13.width}
          height={ellipse13.height}
        />
      </div>
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-between md:flex-row">
        <div className="flex flex-col gap-8">
          <h2 className="capitalize">
            WHAT IS <span className="text-accent">PIGEON DAO</span>?
          </h2>
          <span className="max-w-xl font-semibold">
            Pigeon is the frontier in Web3 to enable crypto participants and
            courier drivers together to build an accessible marketplace for
            e-commerce and package delivery. We are building a future where
            Decentralized Courier Protocols (DCPs) are a standard for anyone,
            globally.
          </span>
        </div>
        <div className="relative w-80">
          <Image
            src={whatIsPigeon.src}
            alt="what is pigeon dao"
            width={whatIsPigeon.width}
            height={whatIsPigeon.height}
            className="mb-12 w-80 object-contain"
          />
          <Image
            src={pigeonHalo.src}
            alt=""
<<<<<<< HEAD
            className="absolute left-0 right-0 top-0 -mb-96 object-contain"
=======
            className="pointer-events-none absolute right-0 top-0 left-0 -mb-96 object-contain"
>>>>>>> 7e0ac3c05649a3c18ee79ece99e5b4c29aa271fe
            width={pigeonHalo.width * 3}
            height={pigeonHalo.height * 3}
          />
        </div>
      </div>
    </div>
  );
}
function NewToPigeonDAOSection() {
  return (
    <div className="relative w-full  px-16 py-28 text-center">
      <div className="opacity-80">
        <Image
          src={ellipse43.src}
          alt=""
          className="pointer-events-none absolute left-0 top-8 object-contain"
          width={ellipse43.width}
          height={ellipse43.height}
        />
        <Image
          src={ellipse15.src}
          alt=""
          className="pointer-events-none absolute right-0 top-48 object-contain"
          width={ellipse15.width}
          height={ellipse15.height}
        />
      </div>
      <div className="max-w-8xl mx-auto flex w-full flex-col items-center justify-between">
        <div className="flex flex-col gap-4">
          <h2 className="capitalize">
            NEW TO <span className="text-accent">PIGEON DAO</span>?
          </h2>
          <h3 className="capitalize">LEARN HOW WE'RE USING BLOCKCHAINS HERE</h3>
        </div>
        <div className="w-full max-w-7xl">
          <div className="mx-auto mt-24 grid w-full grid-cols-1 items-center justify-between gap-4 md:grid-cols-2 xl:grid-cols-4">
            <InfoBox
              title="SMART CONTRACTS"
              t1="Effortless scalability."
              t2="Transparent digital agreements."
              t3="Inevitable trustworthiness"
              icon={blocks.src}
              link="/smart-contracts"
            />
            <InfoBox
              title="WAKU MESSAGING"
              t1="Live communication."
              t2="Encrypted Base64 messaging."
              t3="Censorship resistant."
              icon={msgs.src}
              link="/waku"
            />
            <InfoBox
              title="Data tracking"
              t1="Verified contracts."
              t2="Contribute to data decentralization."
              t3="Absolutely verifiable GPS tracking."
              icon={trigGrear.src}
              link="/data-tracking"
            />
            <InfoBox
              title="Juring protocol"
              t1="Helps prevent losses."
              t2="All outsourced disputes respected."
              t3="Fully transparent disputing mechanism."
              icon={juring.src}
              link="/juring"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
function CommunitySection() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="opacity-80">
        <Image
          src={ellipse45.src}
          alt=""
<<<<<<< HEAD
          className="absolute -top-48 left-0 object-contain"
=======
          className="pointer-events-none absolute left-0 -top-48 object-contain"
>>>>>>> 7e0ac3c05649a3c18ee79ece99e5b4c29aa271fe
          width={ellipse45.width}
          height={ellipse45.height}
        />
        <Image
          src={ellipse44.src}
          alt=""
<<<<<<< HEAD
          className="absolute -top-24 right-0 object-contain"
=======
          className="pointer-events-none absolute right-0 -top-24 object-contain"
>>>>>>> 7e0ac3c05649a3c18ee79ece99e5b4c29aa271fe
          width={ellipse44.width}
          height={ellipse44.height}
        />
      </div>
      <h2 className="mb-24 max-w-4xl text-center capitalize">
        A GLOBALLY COMPLIANT MARKETPLACE FOR{" "}
        <span className="text-accent">YOU</span> AND YOUR{" "}
        <span className="text-accent">COMMUNITY</span>
      </h2>
      <div className="max-w-4xl px-4">
        <Image
          src={landingMap.src}
          alt="loading map"
          width={landingMap.width}
          height={landingMap.height}
          className="mb-36 w-fit object-contain"
        />
      </div>
    </div>
  );
}

function ResourcesSection() {
  return (
    <div className="mb-72 flex flex-col items-center text-center">
      <h2>
        GUIDES, ARTICLES, RESOURCES BY{" "}
        <span className="text-accent">PIGEON</span>
      </h2>
      <h4>OUR RESOURCES</h4>
    </div>
  );
}
