import { CourierSteps } from "~/components/stepProcess";
import SmartContractWrite from "~/components/ui/smartContractWrite";
import { abi, contractAddress } from "~/contracts/Pigeon";
import NoSSR from "react-no-ssr";
import { useAppStore } from "~/stores/useAppStore";
import { useContractEvent, useContractWrite } from "wagmi";

export default function CDelivery({
  address,
  onSolidityEvent,
}: {
  address: string | null;
  onSolidityEvent: () => void;
}) {
  const markAsDelivered = useContractWrite({
    address: contractAddress,
    abi: abi,
    mode: "recklesslyUnprepared",
    functionName: "markDeliveryFinished",
    args: [address as `0x${string}`],
  });
  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "CourierMarkedDeliveryFinished",
    listener: (event) => {
      if (event !== address) return;
      onSolidityEvent();
      console.log("CourierMarkedDeliveryFinished");
    },
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
          <SmartContractWrite
            name="Mark delivery as finidhed"
            tx={markAsDelivered.data?.hash}
          />
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
