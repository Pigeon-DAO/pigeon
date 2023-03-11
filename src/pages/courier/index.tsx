import { abi, contractAddress } from "contracts/Pigeon";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import StepProcess, { CourierSteps } from "@components/stepProcess";
import NoSSR from "react-no-ssr";

import CAgreement from "../../components/courier/cAgreement";
import CComplete from "../../components/courier/cComplete";
import CDelivery from "../../components/courier/cDelivery";
import CFindListing from "../../components/courier/cFindListing";
import CWaitingCompletion from "../../components/courier/cWaitingCompletion";

export default function Courier() {
  const account = useAccount();
  const [step, setStep] = useState<CourierSteps>(CourierSteps.FindListing);
  const [address, setAddress] = useState<string | null>(
    ethers.constants.AddressZero
  );
  console.log("adr ", address);
  const agreement = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getAgreement",

    args: [(address as `0x${string}`) || ethers.constants.AddressZero],
  });

  const agreementProbablyExists = (agreement.data?.pickup.length || 0) > 0;

  function UpdateStates() {
    if (typeof window === "undefined") return;
    const validAdrInLocalStorage = ethers.utils.isAddress(
      localStorage.getItem("selectedPackageAddress") || ""
    );
    if (agreementProbablyExists) {
      // setStep(CourierSteps.Agreement);
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
    // replace with curr smart contract step write complete as int for step
    // track step, once step changes, reset to false
    if (validAdrInLocalStorage) {
      setAddress(localStorage.getItem("selectedPackageAddress")!);
      // find a nicer solution for this or make sure it works ^^^
    }
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
    agreement.refetch()
    console.log("Agreement State", agreement.data?.state);
    UpdateStates();
  };

  return (
    <div>
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
        <CWaitingCompletion onSolidityEvent={onSolidityEvent} />
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
