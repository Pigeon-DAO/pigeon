import { abi, contractAddress } from "~/contracts/Pigeon";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import StepProcess, { CourierSteps } from "~/components/stepProcess";

import NoSSR from "react-no-ssr";
import CAgreement from "~/components/courier/cAgreement";
import CComplete from "~/components/courier/cComplete";
import CDelivery from "~/components/courier/cDelivery";
import CFindListing from "~/components/courier/cFindListing";
import CWaitingParticipantAgreeDelivery from "~/components/courier/cWaitingParticipantAgreeDelivery";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { env } from "~/env/server.mjs";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session?.user?.hasBetaAccess && env.NODE_ENV !== "development") {
    return {
      redirect: {
        destination: "/whitelisted",
        permanent: true,
      },
    };
  }

  return { props: {} };
};

export default function Courier() {
  const account = useAccount();
  const [step, setStep] = useState<CourierSteps>(CourierSteps.FindListing);
  const [address, setAddress] = useState<string | null>(
    ethers.constants.AddressZero
  );
  console.log("adr ", address);
  // const agreement = useContractRead({
  //   address: contractAddress,
  //   abi: abi,
  //   functionName: "getAgreement",

  //   args: [(address as `0x${string}`) || ethers.constants.AddressZero],
  // });

  const agreement = {
    data: {
      pickup: "Pickup Address",
      dropoff: "Droppoff Address",
      cost: BigNumber.from(ethers.utils.parseEther("0.25")),
      participant: account.address,
      courier: "0x000000",
      state: 1,
    },
  };

  const agreementProbablyExists = (agreement.data?.pickup.length || 0) > 0;

  function UpdateStates() {
    setStep(CourierSteps.Complete);
    return;
    if (typeof window === "undefined") return;
    const validAdrInLocalStorage = ethers.utils.isAddress(
      localStorage.getItem("selectedPackageAddress") || ""
    );
    if (agreementProbablyExists) {
      switch (agreement.data?.state) {
        case 0:
          setStep(CourierSteps.FindListing);
          break;
        case 1:
          setStep(CourierSteps.Agreement);
          break;
        case 2:
          setStep(CourierSteps.Delivery);
          break;
        case 3:
          setStep(CourierSteps.WaitingCompletion);
          break;
        case 4:
          setStep(CourierSteps.Complete);
          break;
      }
    }

    // change to database later
    if (validAdrInLocalStorage) {
      setAddress(localStorage.getItem("selectedPackageAddress")!);
    }

    // if you select a package that you are responsible
    // for, automatically assign in the state
    if (agreement.data?.courier === account.address) {
      setAddress(agreement.data?.participant!);
      localStorage.setItem(
        "selectedPackageAddress",
        agreement.data?.participant!
      );
    }
  }

  useEffect(() => {
    UpdateStates();
  }, [agreement.data?.state]);

  const onSolidityEvent = () => {
    // agreement.refetch();
    console.log("Agreement State", agreement.data?.state);
    UpdateStates();
  };

  return (
    <div className="pt-36">
      <NoSSR>
        <StepProcess type="courier" step={step} />
      </NoSSR>
      {step === CourierSteps.FindListing && (
        <CFindListing address={address} setAddress={setAddress} />
      )}
      {step === CourierSteps.Agreement && (
        <CAgreement
          address={address as string}
          state={agreement.data?.state || 0}
          onSolidityEvent={onSolidityEvent}
        />
      )}
      {step === CourierSteps.Delivery && (
        <CDelivery
          address={address as string}
          onSolidityEvent={onSolidityEvent}
        />
      )}
      {step === CourierSteps.WaitingCompletion && (
        <CWaitingParticipantAgreeDelivery
          onSolidityEvent={onSolidityEvent}
          address={address as string}
        />
      )}
      {step === CourierSteps.Complete && (
        <CComplete
          onClickComplete={() => {
            setStep(CourierSteps.FindListing);
            setAddress(ethers.constants.AddressZero);
            localStorage.removeItem("selectedPackageAddress");
            localStorage.removeItem("cSmartContractWritePending");
          }}
        />
      )}
    </div>
  );
}
