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

export default function Home() {
  return (
    <div className="relative w-full">
      <Head>
        <title>Pigeon MVP</title>
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
    <div className="relative w-full py-20 px-8 md:px-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between md:flex-row">
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
        <div className="w-80">
          <Image
            src={whatIsPigeon.src}
            alt="what is pigeon dao"
            width={whatIsPigeon.width}
            height={whatIsPigeon.height}
            className="mb-12 w-80 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
function NewToPigeonDAOSection() {
  return (
    <div className="relative w-full  py-28 px-16 text-center">
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
    <div className="flex flex-col items-center">
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
