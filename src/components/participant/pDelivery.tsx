import { abi, contractAddress } from "contracts/Pigeon";
import { useContractEvent } from "wagmi";

export default function PDelivery({
  address,
  onSolidityEvent,
}: {
  address: string;
  onSolidityEvent: () => void;
}) {
  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "CourierMarkedDeliveryFinished",
    listener: (event) => {
      onSolidityEvent();
      console.log("CourierMarkedDeliveryFinished");
    },
  });
  return (
    <div>
      <span>
        The courier is delivering. Wait until they mark it as delivered.
      </span>
    </div>
  );
}
