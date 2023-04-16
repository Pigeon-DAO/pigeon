import { ParticipantSteps } from "~/components/stepProcess";
import { api } from "~/utils/api";
import { abi, contractAddress } from "~/contracts/Pigeon";
import { useAppStore } from "~/stores/useAppStore";
import { useContractEvent, useContractWrite } from "wagmi";

import NoSSR from "react-no-ssr";
import SmartContractWrite from "~/components/ui/smartContractWrite";

export default function PAcceptCourier({
  address,
  onSolidityEvent,
}: {
  address: string;
  onSolidityEvent: () => void;
}) {
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
  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "ParticipantAcceptedCourier",
    listener: (event) => {
      if (event !== address) return;
      console.log("CourierAccepted", event);
      onSolidityEvent();
    },
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
        localStorage.setItem(
          "pSmartContractWritePending",
          String(ParticipantSteps.AcceptCourier)
        );
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
        localStorage.setItem(
          "pSmartContractWritePending",
          String(ParticipantSteps.AcceptCourier)
        );
      })
      .catch(() => {
        setLoading(false);
        setLoadingMessage("");
      });
  };

  const pSmartContractWritePending =
    typeof window !== "undefined" &&
    localStorage.getItem("pSmartContractWritePending") ===
      String(ParticipantSteps.AcceptCourier);

  return (
    <div>
      <NoSSR>
        {pSmartContractWritePending ? (
          <span>
            <SmartContractWrite
              name={`${
                !!acceptCourer.data?.hash ? "Accept" : "Reject"
              } Courier`}
              tx={acceptCourer.data?.hash ?? rejectCourier.data?.hash}
            />
          </span>
        ) : (
          <div className="flex flex-col gap-2">
            <h3>Accept this Courier?</h3>
            {!courier.data ? (
              <h2>
                WARNING: This courier does not have an account here. It is NOT
                recommended to accept them.
              </h2>
            ) : (
              <>
                {courier.data?.image && (
                  <img
                    src={courier.data?.image}
                    alt="courier"
                    className="h-32 w-32 rounded-full"
                  />
                )}
                <span>Name: {courier.data?.name}</span>
                <span>Address: {courier.data?.address}</span>
              </>
            )}
            <button className="btn" onClick={() => onAccept()}>
              Accept {courier.data?.name}
            </button>
            <button className="btn" onClick={() => onReject()}>
              Reject {courier.data?.name}
            </button>
          </div>
        )}
      </NoSSR>
    </div>
  );
}
