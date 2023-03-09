import { CourierSteps } from "@components/stepProcess";
import { abi, contractAddress } from "contracts/Pigeon";
import { ethers } from "ethers";
import NoSSR from "react-no-ssr";
import { useAppStore } from "stores/useAppStore";
import { useContractRead, useContractWrite } from "wagmi";

export default function CDelivery({ address }: { address: string | null }) {
  // const agreement = useContractRead({
  //   address: contractAddress,
  //   abi: abi,
  //   functionName: "getAgreement",

  //   args: [(address as `0x${string}`) || ethers.constants.AddressZero],
  // });
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
        localStorage.setItem(
          "cSmartContractWritePending",
          String(CourierSteps.Delivery)
        );
      })
      .catch((e) => {
        setLoading(false);
        setLoadingMessage("");
        console.log(e);
      });
  }

  const cSmartContractWritePending =
    typeof window !== "undefined" &&
    localStorage.getItem("cSmartContractWritePending") ===
      String(CourierSteps.Delivery);

  return (
    <div>
      <NoSSR>
        {cSmartContractWritePending ? (
          <span>Smart contract write pending on blockchain...</span>
        ) : (
          <>
            <h3>Agreement made. Delivery Ready.</h3>
            <p>You are out to deliver the package.</p>
            <button className="btn" onClick={() => onSubmit()}>
              Mark as delivered.
            </button>
          </>
        )}
      </NoSSR>
    </div>
  );
}
