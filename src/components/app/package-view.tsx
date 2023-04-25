import { BigNumber, ethers } from "ethers";
import { useContractRead } from "wagmi";
import Button from "~/components/ui/button";
import { abi, contractAddress } from "~/contracts/Pigeon";

export default function PackageView({ id }: { id: string }) {
  const p = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getPackage",
    args: [BigNumber.from(id)],
  });
  return (
    <div className="rounded-2xl bg-primary p-4">
      <h3 className="break-all">Package {id}</h3>
      <p>Pickup: {p.data?.pickup}</p>
      <p>Dropoff: {p.data?.dropoff}</p>
      <p>Reward: {ethers.utils.formatEther(p.data?.cost || 0)} ETH</p>
      <p>Sender: {p.data?.sender.toString()}</p>
      <p>Driver: {p.data?.driver.toString()}</p>
      <Button type="link" href={`/app/view/${id}`}>
        View
      </Button>
    </div>
  );
}
