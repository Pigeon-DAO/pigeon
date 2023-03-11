import { useEffect } from "react";
import PCreateAgreement from "./pCreateAgreement";

export default function PComplete({
  address,
  onSolidityEvent,
}: {
  address: string;
  onSolidityEvent: () => void;
}) {
  useEffect(() => {
    localStorage.setItem("pCreatedAgreement", "false");
  }, []);
  return (
    <div>
      <h1>Transaction completed.</h1>
      <span>You may do another agreement.</span>
      <PCreateAgreement onSolidityEvent={onSolidityEvent} address={address} />
    </div>
  );
}
