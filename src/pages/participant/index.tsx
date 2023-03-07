import StepProcess, { Steps } from "@components/stepProcess";
import { useEffect, useState } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { abi, contractAddress } from "contracts/Pigeon";
import { useAppStore } from "stores/useAppStore";
import { ethers } from "ethers";
import NoSSR from "react-no-ssr";
import { FaEthereum } from "react-icons/fa";

export default function Participant() {
  const [step, setStep] = useState<Steps>(Steps.CreateListing);
  const account = useAccount();

  const agreement = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getAgreement",
    args: [account.address!],
  });

  useEffect(() => {
    if (agreement.data?.state === 0) {
      setStep(Steps.FindCourier);
    } else if (agreement.data?.state === 1) {
      setStep(Steps.AcceptCourier);
    } else if (agreement.data?.state === 2) {
      setStep(Steps.Delivery);
    } else if (agreement.data?.state === 3) {
      setStep(Steps.Complete);
    } else if (agreement.data?.state === 4) {
      // ????
    }
    console.log(agreement.data?.state);
  }, [agreement.data?.state]);

  const hasAgreement = agreement.data?.pickup.length || 0 > 0;
  return (
    <div className="flex flex-col gap-4">
      <NoSSR>
        <StepProcess step={step} />
        {!hasAgreement && step === 0 && <CreateAgreement />}
        {step === 1 && (
          <FindCourier
            cost={agreement.data?.cost.toString()!}
            dropoff={agreement.data?.dropoff!}
            pickup={agreement.data?.pickup!}
          />
        )}
      </NoSSR>
    </div>
  );
}

function CreateAgreement() {
  const [createAgreementArgs, setCreateAgreementArgs] = useState<
    [string, string, string]
  >(["", "", ""]);
  const [errors, setErrors] = useState<string[]>([]);

  const setLoading = useAppStore((state) => state.setLoading);
  const setLoadingMessage = useAppStore((state) => state.setLoadingMessage);

  const createAgreement = useContractWrite({
    address: contractAddress,
    abi: abi,
    mode: "recklesslyUnprepared",
    functionName: "createAgreement",

    // args are readonly [string, string]
    args: [createAgreementArgs[0]!, createAgreementArgs[1]!],
  });

  function onSubmit() {
    const errors = [];
    setErrors([]);
    if (createAgreementArgs[0]?.length < 1) {
      errors[0] = "Pickup must be at least 1 character";
    }
    if (createAgreementArgs[1]?.length < 1) {
      errors[1] = "Dropoff must be at least 1 character";
    }

    if (
      createAgreementArgs[2]?.length < 1 &&
      Number(createAgreementArgs[2]) > 0
    ) {
      errors[1] = "Price must be a valid number over one";
    }

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }
    setLoading(true);
    setLoadingMessage("Creating Agreement in Smart Contract...");
    createAgreement
      .writeAsync({
        recklesslySetUnpreparedOverrides: {
          value: ethers.utils.parseEther(createAgreementArgs[2]),
        },
      })
      .then(() => {
        // listen for smart contact event ?

        setLoading(false);
        setLoadingMessage("");
      })
      .catch((e) => {
        setLoading(false);
        setLoadingMessage("");
        console.error(e);
      });
  }

  return (
    <>
      <h2>Create Agreement</h2>
      <div className="flex flex-col">
        <label htmlFor="createAgreementPickup">Pickup</label>
        <span className="text-red-500">{errors[0] ?? errors[0]}</span>
        <input
          type="text"
          id="createAgreementPickup"
          value={createAgreementArgs[0]}
          onChange={(e) => {
            setCreateAgreementArgs((args) => {
              return [e.target.value, args[1], args[2]];
            });
          }}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="createAgreementDropoff">Dropoff</label>
        <span className="text-red-500">{errors[1] ?? errors[1]}</span>
        <input
          type="text"
          id="createAgreementDropoff"
          value={createAgreementArgs[1]}
          onChange={(e) => {
            setCreateAgreementArgs((args) => {
              return [args[0], e.target.value, args[2]];
            });
          }}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="createAgreementDropoff">Price (ETH)</label>
        <span className="text-red-500">{errors[2] ?? errors[2]}</span>
        <input
          type="number"
          id="createAgreementDropoff"
          value={createAgreementArgs[2]}
          onChange={(e) => {
            setCreateAgreementArgs((args) => {
              return [args[0], args[1], e.target.value];
            });
          }}
        />
      </div>

      <button className="btn" onClick={() => onSubmit()}>
        Commence Agreement!
      </button>
    </>
  );
}

function FindCourier({
  pickup,
  dropoff,
  cost,
}: {
  pickup: string;
  dropoff: string;
  cost: string;
}) {
  const account = useAccount();
  return (
    <div className="flex flex-col">
      <h3>Congrats! Your package is out there!</h3>
      <span>We are now waiting for a driver to select your package.</span>
      <span>Your address: {account.address}</span>
      <span>Pickup: {pickup}</span>
      <span>Dropoff: {dropoff}</span>
      <div className="flex items-center">
        <span>Price: {ethers.utils.formatEther(cost)} ETH</span>
        <FaEthereum />
      </div>
    </div>
  );
}
