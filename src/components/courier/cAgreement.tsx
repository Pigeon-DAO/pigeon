import SmartContractWrite from "~/components/ui/smartContractWrite";
import { abi, contractAddress } from "~/contracts/Pigeon";
import { useContractEvent } from "wagmi";

export default function CAgreement({
  address,
  state,
  onSolidityEvent,
}: {
  address: string;
  state: number;
  onSolidityEvent: () => void;
}) {
  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "ParticipantAcceptedCourier",
    listener: (event) => {
      if (event !== address) return;
      onSolidityEvent();
      console.log("ParticipantAcceptedCourier");
    },
  });
  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "ParticipantRejectedCourier",
    listener: (event) => {
      if (event !== address) return;
      onSolidityEvent();
      console.log("ParticipantRejectedCourier");
    },
  });
  return (
    <div>
      {state === 0 && <span>How are you here?</span>}
      {state === 1 && (
        <span>
          Package has been selected. Waiting for participant to agree.
        </span>
      )}
    </div>
  );
}
