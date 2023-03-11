import { abi, contractAddress } from "contracts/Pigeon";
import { useContractEvent } from "wagmi";

export default function CWaitingCompletion({
  onSolidityEvent,
}: {
  onSolidityEvent: () => void;
}) {
  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "ParticipantAgreedDeliveryFinished",
    listener: (event) => {
      onSolidityEvent();
      console.log("ParticipantAgreedDeliveryFinished");
    },
  });
  return (
    <div>
      Delivery was marked complete. We are waiting for the participant to
      approve this.
    </div>
  );
}
