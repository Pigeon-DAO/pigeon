import { CourierSteps } from "~/components/stepProcess";
import { abi, contractAddress } from "~/contracts/Pigeon";
import { ethers } from "ethers";
import { Dispatch, SetStateAction, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { useAppStore } from "~/stores/useAppStore";
import { useContractEvent, useContractRead, useContractWrite } from "wagmi";

import NoSSR from "react-no-ssr";
import SmartContractWrite from "~/components/ui/smartContractWrite";

export default function CFindListing({
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
    functionName: "selectAgreement",
    args: [address as `0x${string}`],
  });

  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "CourierSelectedAgreement",
    listener: (event) => {
      if (event !== address) return;
      console.log("result ", event);
      agreement.refetch();
    },
  });

  function onSubmitFindPackage() {
    setErrors([]);
    if (!ethers.utils.isAddress(inputAddress)) {
      setErrors(["Invalid address"]);
      return;
    }
    setAddress(inputAddress);
  }

  function onSelectPackage() {
    setLoading(true);
    setLoadingMessage("Selecting Package...");
    setAddress(address!);

    writeAgreement
      .writeAsync()
      .then(() => {
        setLoading(false);
        setLoadingMessage("");
        localStorage.setItem("selectedPackageAddress", address!);
        localStorage.setItem(
          "cSmartContractWritePending",
          String(CourierSteps.FindListing)
        );
      })
      .catch((e) => {
        setLoading(false);
        setLoadingMessage("");
        console.error(e);
      });
  }

  const agreement = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getAgreement",

    args: [(address as `0x${string}`) || ethers.constants.AddressZero],
  });

  const cSmartContractWritePending =
    typeof window !== "undefined" &&
    localStorage.getItem("cSmartContractWritePending") ===
      String(CourierSteps.FindListing);

  return (
    <div>
      <div className="flex flex-col">
        <NoSSR>
          <>
            {cSmartContractWritePending ? (
              <SmartContractWrite
                name="Select Listing"
                tx={writeAgreement.data?.hash}
              />
            ) : (
              <>
                <label htmlFor="createAgreementPickup">Pickup</label>
                <span className="text-red-500">{errors[0] ?? errors[0]}</span>
                <input
                  type="text"
                  id="createAgreementPickup"
                  value={inputAddress}
                  onChange={(e) => setInputAddress(e.target.value)}
                />
                <button className="btn" onClick={() => onSubmitFindPackage()}>
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
                      {ethers.utils.formatEther(
                        agreement.data?.cost.toString()!
                      )}{" "}
                      ETH
                      <FaEthereum />
                    </div>
                    {agreement.data?.state === 0 && (
                      <button className="btn" onClick={() => onSelectPackage()}>
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
              </>
            )}
          </>
        </NoSSR>
      </div>
    </div>
  );
}
