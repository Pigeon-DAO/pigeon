import StepProcess, {
  CourierSteps,
  ParticipantSteps,
} from "@components/stepProcess";
import { abi, contractAddress } from "contracts/Pigeon";
import { ethers } from "ethers";
import { computeAddress } from "ethers/lib/utils.js";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import NoSSR from "react-no-ssr";
import { useAppStore } from "stores/useAppStore";
import { useContractRead, useContractWrite } from "wagmi";

export default function Courier() {
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

  useEffect(() => {
    if (localStorage.getItem("selectedPackage")) {
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

      if (localStorage.getItem("cSelectedPackage") === "true") {
        setAddress(localStorage.getItem("selectedPackage")!);
        console.log("asdf222");
        console.log(localStorage.getItem("selectedPackage")!);
      }

      console.log("asdf");
      // }
    }
  }, [address]);

  return (
    <div>
      <NoSSR>
        <StepProcess type="courier" step={step} />
      </NoSSR>
      {step === CourierSteps.FindListing && (
        <FindListing address={address} setAddress={setAddress} />
      )}
      {step === CourierSteps.Agreement && (
        <Agreement address={address as string} />
      )}
      {step === CourierSteps.Delivery && (
        <Delivery address={address as string} />
      )}
      {step === CourierSteps.WaitingCompletion && <WaitingCompletion />}
      {step === CourierSteps.Complete && (
        <Complete
          onClickComplete={() => {
            setStep(CourierSteps.FindListing);
            setAddress(ethers.constants.AddressZero);
            localStorage.removeItem("selectedPackage");
          }}
        />
      )}
    </div>
  );
}

function FindListing({
  address,
  setAddress,
}: {
  address: string | null;
  setAddress: Dispatch<SetStateAction<string | null>>;
}) {
  const [errors, setErrors] = useState<string[]>([]);
  const setLoading = useAppStore((state) => state.setLoading);
  const setLoadingMessage = useAppStore((state) => state.setLoadingMessage);
  const [inputAddress, setInputAddress] = useState<string>(
    ethers.constants.AddressZero
  );

  const writeAgreement = useContractWrite({
    address: contractAddress,
    abi: abi,
    mode: "recklesslyUnprepared",
    functionName: "selectPackage",
    args: [address as `0x${string}`],
  });

  function onSubmit() {
    setErrors([]);
    if (!ethers.utils.isAddress(inputAddress)) {
      setErrors(["Invalid address"]);
      return;
    }
    setAddress(inputAddress);
  }

  const agreement = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getAgreement",

    args: [(address as `0x${string}`) || ethers.constants.AddressZero],
  });

  return (
    <div>
      <div className="flex flex-col">
        <label htmlFor="createAgreementPickup">Pickup</label>
        <span className="text-red-500">{errors[0] ?? errors[0]}</span>
        <input
          type="text"
          id="createAgreementPickup"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
        />
        <button className="btn" onClick={() => onSubmit()}>
          Find Agreement
        </button>
        {(agreement.data?.pickup.length || 0) > 0 ? (
          <div>
            <h3>Congrats! The agreement was found.</h3>
            <p>Pickup: {agreement.data?.pickup}</p>
            <p>Dropoff: {agreement.data?.dropoff}</p>
            <p>Owner: {agreement.data?.participant}</p>
            <p>
              Status:{" "}
              {agreement.data?.state === 0
                ? "READY"
                : `NOT AVAILABLE (${agreement.data?.state})`}
            </p>
            <div className="flex items-center gap-2">
              <span>Price: </span>
              {ethers.utils.formatEther(agreement.data?.cost.toString()!)} ETH
              <FaEthereum />
            </div>
            {agreement.data?.state === 0 && (
              <button
                className="btn btn-warning"
                onClick={() => {
                  setLoading(true);
                  setLoadingMessage("Selecting Package...");
                  setAddress(address!);
                  localStorage.setItem("selectedPackage", address!);
                  localStorage.setItem("cSelectedPackage", "true");
                  writeAgreement
                    .writeAsync()
                    .then(() => {
                      setLoading(false);
                      setLoadingMessage("");
                    })
                    .catch((e) => {
                      setLoading(false);
                      setLoadingMessage("");
                      console.error(e);
                    });
                }}>
                Select this Package
              </button>
            )}
          </div>
        ) : (
          address && (
            <div>
              <p>No agreement found.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function Agreement({ address }: { address: string }) {
  const agreement = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getAgreement",
    args: [(address as `0x${string}`) || ethers.constants.AddressZero],
  });
  return (
    <div>
      {agreement.data?.state === 0 && (
        <span>Awaiting smart contract write</span>
      )}
      {agreement.data?.state === 1 && (
        <span>
          Package has been selected. Waiting for participant to agree.
        </span>
      )}
    </div>
  );
}

function Delivery({ address }: { address: string | null }) {
  const agreement = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getAgreement",

    args: [(address as `0x${string}`) || ethers.constants.AddressZero],
  });
  const markAsDelivered = useContractWrite({
    address: contractAddress,
    abi: abi,
    mode: "recklesslyUnprepared",
    functionName: "markDeliveryFinished",
    args: [address as `0x${string}`],
  });
  const setLoading = useAppStore((state) => state.setLoading);
  const setLoadingMessage = useAppStore((state) => state.setLoadingMessage);

  function onSubmit() {
    markAsDelivered
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
    <div>
      <h3>Agreement made. Delivery Ready.</h3>
      <p>You are out to deliver the package.</p>
      <button className="btn" onClick={() => onSubmit()}>
        Mark as delivered.
      </button>
    </div>
  );
}
function WaitingCompletion() {
  return (
    <div>
      Delivery was marked complete. We are waiting for the participant to
      approve this.
    </div>
  );
}

function Complete({ onClickComplete }: { onClickComplete: () => void }) {
  return (
    <div>
      <h3>Delivery Complete</h3>
      <p>Thank you for using our service.</p>
      <button className="btn" onClick={() => onClickComplete()}>
        Return to package selection
      </button>
    </div>
  );
}
