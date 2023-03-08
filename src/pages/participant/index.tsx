import StepProcess, { ParticipantSteps } from "@components/stepProcess";
import { useEffect, useState } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { abi, contractAddress } from "contracts/Pigeon";
import { useAppStore } from "stores/useAppStore";
import { ethers } from "ethers";
import NoSSR from "react-no-ssr";
import { FaEthereum } from "react-icons/fa";
import { api } from "@utils/api";

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

  const contractProbablyExists = (agreement.data?.pickup.length || 0) > 0;

  useEffect(() => {
    // problem
    if (!contractProbablyExists) return;
    // assumes zero if no contract
    // zero is agreement was created
    if (agreement.data?.state === 0) {
      setStep(ParticipantSteps.FindCourier);
    } else if (agreement.data?.state === 1) {
      setStep(ParticipantSteps.AcceptCourier);
    } else if (agreement.data?.state === 2) {
      setStep(ParticipantSteps.Delivery);
    } else if ((agreement.data?.state || 0) === 3) {
      setStep(ParticipantSteps.AgreeCompletion);
    } else if ((agreement.data?.state || 0) === 4) {
      setStep(ParticipantSteps.Complete);
    } else {
      setStep(ParticipantSteps.CreateListing);
    }
    console.log(agreement.data?.state);
  }, [agreement.data?.state]);

  const hasAgreement = (agreement.data?.pickup.length || 0) > 0;
  return (
    <div className="flex flex-col gap-4">
      <NoSSR>
        <StepProcess type="participant" step={step} />
        {!hasAgreement && step === ParticipantSteps.CreateListing && (
          <CreateAgreement />
        )}
        {step === ParticipantSteps.FindCourier && (
          <FindCourier
            cost={agreement.data?.cost.toString()!}
            dropoff={agreement.data?.dropoff!}
            pickup={agreement.data?.pickup!}
          />
        )}
        {step === ParticipantSteps.AcceptCourier && (
          <AcceptCourier address={agreement.data?.courier!} />
        )}
        {step === ParticipantSteps.Delivery && (
          <Delivery address={agreement.data?.courier!} />
        )}
        {step === ParticipantSteps.AgreeCompletion && <CompleteAgreement />}
        {step === ParticipantSteps.Complete && <Complete />}
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
        localStorage.setItem("pCreatedAgreement", "true");
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
      {localStorage.getItem("pCreatedAgreement") === "true" ? (
        <>
          <h3>Agreement was created on a smart contract.</h3>
          <span>The smart contract is processing your request...</span>
        </>
      ) : (
        <div className="flex flex-col gap-2">
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
        </div>
      )}
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

function AcceptCourier({ address }: { address: string }) {
  const courier = api.user.getUserByAddress.useQuery({ address });
  const acceptCourer = useContractWrite({
    address: contractAddress,
    abi: abi,
    mode: "recklesslyUnprepared",
    functionName: "acceptCourier",
  });
  const rejectCourier = useContractWrite({
    address: contractAddress,
    abi: abi,
    mode: "recklesslyUnprepared",
    functionName: "rejectCourier",
  });
  const setLoading = useAppStore((state) => state.setLoading);
  const setLoadingMessage = useAppStore((state) => state.setLoadingMessage);

  const onAccept = () => {
    setLoading(true);
    setLoadingMessage("Accepting Courier...");
    acceptCourer
      .writeAsync()
      .then(() => {
        setLoading(false);
        setLoadingMessage("");
      })
      .catch(() => {
        setLoading(false);
        setLoadingMessage("");
      });
  };

  const onReject = () => {
    setLoading(true);
    setLoadingMessage("Rejecting Courier...");
    rejectCourier
      .writeAsync()
      .then(() => {
        setLoading(false);
        setLoadingMessage("");
      })
      .catch(() => {
        setLoading(false);
        setLoadingMessage("");
      });
  };

  return (
    <div>
      <h3>Accept this Courier?</h3>
      <div className="flex flex-col gap-2">
        {courier.data?.image && (
          <img
            src={courier.data?.image}
            alt="courier"
            className="h-32 w-32 rounded-full"
          />
        )}
        <span>Name: {courier.data?.name}</span>
        <span>Address: {courier.data?.address}</span>
        <button className="btn" onClick={() => onAccept()}>
          Accept {courier.data?.name}
        </button>
        <button className="btn" onClick={() => onReject()}>
          Reject {courier.data?.name}
        </button>
      </div>
    </div>
  );
}
function Delivery({ address }: { address: string }) {
  return (
    <div>
      <span>
        The courier is delivering. Wait until they mark it as delivered.
      </span>
    </div>
  );
}

function CompleteAgreement() {
  const setLoading = useAppStore((state) => state.setLoading);
  const setLoadingMessage = useAppStore((state) => state.setLoadingMessage);
  const complete = useContractWrite({
    address: contractAddress,
    abi: abi,
    mode: "recklesslyUnprepared",
    functionName: "agreeDeliveryFinished",
  });
  function onSubmit() {
    setLoading(true);
    setLoadingMessage("Accepting package...");
    complete
      .writeAsync()
      .then(() => {
        setLoading(false);
        setLoadingMessage("");
      })
      .catch((e) => {
        setLoading(false);
        setLoadingMessage("");
        console.log(e);
      });
  }
  return (
    <div className="flex flex-col">
      <span>
        By clicking agree, I agree the package was delivered and the funds will
        be sent to the courier.
      </span>
      <button className="btn" onClick={() => onSubmit()}>
        Agree
      </button>
    </div>
  );
}

function Complete() {
  useEffect(() => {
    localStorage.setItem("pCreatedAgreement", "false");
  });
  return (
    <div>
      <h1>Transaction completed.</h1>
      <span>You may do another agreement.</span>
      <CreateAgreement />
    </div>
  );
}
