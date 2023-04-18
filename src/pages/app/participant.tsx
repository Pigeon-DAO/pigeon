import StepProcess, { ParticipantSteps } from "~/components/stepProcess";
import { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { abi, contractAddress } from "~/contracts/Pigeon";
import PCreateAgreement from "~/components/participant/pCreateAgreement";
import PFindCourier from "~/components/participant/pFindCourier";
import NoSSR from "react-no-ssr";
import PAcceptCourier from "~/components/participant/pAcceptCourier";
import PWaitForDelivery from "~/components/participant/pWaitForDelivery";
import PAgreeDeliveryFinished from "~/components/participant/pAgreeDeliveryFinished";
import PComplete from "~/components/participant/pComplete";
import { GetServerSideProps } from "next";

import ensureBetaAccess from "~/tools/ensureBetaAccess";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return ensureBetaAccess(ctx);
};

export default function Participant() {
  const [step, setStep] = useState<ParticipantSteps>(
    ParticipantSteps.CreateListing
  );
  const account = useAccount();

  const agreement = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getAgreement",
    args: [account.address!],
  });

  const agreementProbablyExists = (agreement.data?.pickup.length || 0) > 0;

  const onSolidityEvent = () => {
    agreement.refetch();
    console.log("Agreement State", agreement.data?.state);
  };

  function UpdateStates() {
    if (!agreementProbablyExists) return;
    if (agreement.data?.state === 0) {
      setStep(ParticipantSteps.FindCourier);
    } else if (agreement.data?.state === 1) {
      setStep(ParticipantSteps.AcceptCourier);
    } else if (agreement.data?.state === 2) {
      setStep(ParticipantSteps.Delivery);
    } else if (agreement.data?.state === 3) {
      setStep(ParticipantSteps.AgreeCompletion);
    } else if (agreement.data?.state === 4) {
      setStep(ParticipantSteps.Complete);
    } else {
      setStep(ParticipantSteps.CreateListing);
    }
    console.log("Smart Contract Agreement State: ", agreement.data?.state);
    if (Number(localStorage.getItem("pSmartContractWritePending")) != step) {
      localStorage.removeItem("pSmartContractWritePending");
    }
  }

  useEffect(() => {
    UpdateStates();
  }, [agreement.data?.state]);

  return (
    <div className="flex flex-col gap-4 pt-36">
      <NoSSR>
        <StepProcess type="participant" step={step} />
        {step === ParticipantSteps.CreateListing && (
          <PCreateAgreement
            onSolidityEvent={onSolidityEvent}
            address={account.address as string}
          />
        )}
        {step === ParticipantSteps.FindCourier && (
          <PFindCourier
            cost={agreement.data?.cost.toString()!}
            dropoff={agreement.data?.dropoff!}
            pickup={agreement.data?.pickup!}
            onSolidityEvent={onSolidityEvent}
          />
        )}
        {step === ParticipantSteps.AcceptCourier && (
          <PAcceptCourier
            address={agreement.data?.courier!}
            onSolidityEvent={onSolidityEvent}
          />
        )}
        {step === ParticipantSteps.Delivery && (
          <PWaitForDelivery
            address={agreement.data?.courier!}
            onSolidityEvent={onSolidityEvent}
          />
        )}
        {step === ParticipantSteps.AgreeCompletion && (
          <PAgreeDeliveryFinished
            onSolidityEvent={onSolidityEvent}
            address={account.address as string}
          />
        )}
        {step === ParticipantSteps.Complete && (
          <PComplete
            onSolidityEvent={onSolidityEvent}
            address={account.address as string}
          />
        )}
      </NoSSR>
    </div>
  );
}
