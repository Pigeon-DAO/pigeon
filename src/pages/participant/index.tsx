import StepProcess, { ParticipantSteps } from "@components/stepProcess";
import { useEffect, useState } from "react";
import { useAccount, useContractEvent, useContractRead } from "wagmi";
import { abi, contractAddress } from "contracts/Pigeon";
import PCreateAgreement from "../../components/participant/pCreateAgreement";
import PFindCourier from "../../components/participant/pFindCourier";
import NoSSR from "react-no-ssr";
import PAcceptCourier from "@components/participant/pAcceptCourier";
import PDelivery from "@components/participant/pDelivery";
import PCompleteAgreement from "@components/participant/pCompleteAgreement";
import PComplete from "@components/participant/pComplete";

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

  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "CommenceDelivery",
    listener: (result) => {
      agreement.refetch();
    },
  });

  useEffect(() => {
    // problem
    if (!agreementProbablyExists) return;
    // assumes zero if no contract
    // zero is agreement was created
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
  }, [agreement.data?.state]);

  return (
    <div className="flex flex-col gap-4">
      <NoSSR>
        <StepProcess type="participant" step={step} />
        {step === ParticipantSteps.CreateListing && <PCreateAgreement />}
        {step === ParticipantSteps.FindCourier && (
          <PFindCourier
            cost={agreement.data?.cost.toString()!}
            dropoff={agreement.data?.dropoff!}
            pickup={agreement.data?.pickup!}
          />
        )}
        {step === ParticipantSteps.AcceptCourier && (
          <PAcceptCourier address={agreement.data?.courier!} />
        )}
        {step === ParticipantSteps.Delivery && (
          <PDelivery address={agreement.data?.courier!} />
        )}
        {step === ParticipantSteps.AgreeCompletion && <PCompleteAgreement />}
        {step === ParticipantSteps.Complete && <PComplete />}
      </NoSSR>
    </div>
  );
}
