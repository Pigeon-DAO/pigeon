import { abi, contractAddress } from "contracts/Pigeon";
import { ethers } from "ethers";
import { useContractEvent, useContractRead } from "wagmi";

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
      onSolidityEvent();
      console.log("ParticipantAcceptedCourier");
    },
  });
  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "ParticipantRejectedCourier",
    listener: (event) => {
      onSolidityEvent();
      console.log("ParticipantRejectedCourier");
    },
  });
  return (
    <div>
      {state === 0 && <span>Awaiting smart contract write</span>}
      {state === 1 && (
        <span>
          Package has been selected. Waiting for participant to agree.
        </span>
      )}
    </div>
  );
}
