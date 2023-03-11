import { ParticipantSteps } from "@components/stepProcess";
import { abi, contractAddress } from "contracts/Pigeon";
import { ethers } from "ethers";
import { useState } from "react";
import { useAppStore } from "stores/useAppStore";
import { useContractEvent, useContractWrite } from "wagmi";

import NoSSR from "react-no-ssr";
import SmartContractWrite from "@components/ui/smartContractWrite";

export default function PCreateAgreement({
  address,
  onSolidityEvent,
}: {
  address: string;
  onSolidityEvent: () => void;
}) {
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

  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "AgreementCreated",
    listener: (event) => {
      if (event !== address) return;
      console.log("AgreementCreated", event);
      onSolidityEvent();
    },
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
        localStorage.setItem(
          "pSmartContractWritePending",
          String(ParticipantSteps.CreateListing)
        );
      })
      .catch((e) => {
        setLoading(false);
        setLoadingMessage("");
        console.error(e);
      });
  }
  const pSmartContractWritePending =
    typeof window !== "undefined" &&
    localStorage.getItem("pSmartContractWritePending") ===
      String(ParticipantSteps.CreateListing);

  return (
    <>
      <h2>Create Agreement</h2>
      <NoSSR>
        {pSmartContractWritePending ? (
          <SmartContractWrite
            name="Create an Agreement"
            tx={createAgreement.data?.hash}
          />
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
      </NoSSR>
    </>
  );
}
