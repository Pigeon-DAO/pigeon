import { ParticipantSteps } from "~/components/stepProcess";
import SmartContractWrite from "~/components/ui/smartContractWrite";
import { abi, contractAddress } from "~/contracts/Pigeon";
import { useAppStore } from "~/stores/useAppStore";
import { useContractEvent, useContractWrite } from "wagmi";

export default function PAgreeDeliveryFinished({
  address,
  onSolidityEvent,
}: {
  address: string;
  onSolidityEvent: () => void;
}) {
  const setLoading = useAppStore((state) => state.setLoading);
  const setLoadingMessage = useAppStore((state) => state.setLoadingMessage);
  const complete = useContractWrite({
    address: contractAddress,
    abi: abi,
    mode: "recklesslyUnprepared",
    functionName: "agreeDeliveryFinished",
  });
  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "ParticipantAgreedDeliveryFinished",
    listener: (event) => {
      if (event !== address) return;
      onSolidityEvent();
      console.log("ParticipantAgreedDeliveryFinished");
    },
  });
  function onSubmit() {
    setLoading(true);
    setLoadingMessage("Accepting package...");
    complete
      .writeAsync()
      .then(() => {
        setLoading(false);
        setLoadingMessage("");
        localStorage.setItem(
          "pSmartContractWritePending",
          String(ParticipantSteps.AgreeCompletion)
        );
      })
      .catch((e) => {
        setLoading(false);
        setLoadingMessage("");
        console.log(e);
      });
  }

  const pSmartContractWritePending =
    localStorage.getItem("pSmartContractWritePending") ===
    String(ParticipantSteps.AgreeCompletion);

  return (
    <div className="flex flex-col">
      {pSmartContractWritePending ? (
        <SmartContractWrite
          name="Agree Delivery is Finished"
          tx={complete.data?.hash}
        />
      ) : (
        <>
          <span>
            By clicking agree, I agree the package was delivered and the funds
            will be sent to the courier.
          </span>
          <button className="btn" onClick={() => onSubmit()}>
            Agree
          </button>
        </>
      )}
    </div>
  );
}
