import { abi, contractAddress } from "~/contracts/Pigeon";
import { useContractEvent } from "wagmi";

export default function CWaitingParticipantAgreeDelivery({
  address,
  onSolidityEvent,
}: {
  address: string;
  onSolidityEvent: () => void;
}) {
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
  return (
    <div>
      Delivery was marked complete. We are waiting for the participant to
      approve this.
    </div>
  );
}
