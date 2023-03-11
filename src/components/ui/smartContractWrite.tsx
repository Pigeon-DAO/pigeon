import { SiSolidity } from "react-icons/si";
import { TfiWrite } from "react-icons/tfi";

export default function SmartContractWrite({
  name,
  tx,
}: {
  name: string;
  tx: string | undefined;
}) {
  return (
    <div className="rounded-2xl bg-slate-800 px-4 py-4">
      <h1>Waiting for confirmation on the blockchain...</h1>
      <div className="my-2 flex gap-2">
        <SiSolidity size={64} className="text-blue-500" />
        <TfiWrite size={64} className="text-gray-500" />
      </div>
      <h2>Type: {name}</h2>
      <h3>TX: {tx || "Unconfirmed...."}</h3>
    </div>
  );
}
