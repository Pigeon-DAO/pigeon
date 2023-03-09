import { ethers } from "ethers";
import { FaEthereum } from "react-icons/fa";
import { useAccount } from "wagmi";

export default function FindCourier({
  pickup,
  dropoff,
  cost,
}: {
  pickup: string;
  dropoff: string;
  cost: string;
}) {
  const account = useAccount();
  return (
    <div className="flex flex-col">
      <h3>Congrats! Your package is out there!</h3>
      <span>We are now waiting for a driver to select your package.</span>
      <span>Your address: {account.address}</span>
      <span>Pickup: {pickup}</span>
      <span>Dropoff: {dropoff}</span>
      <div className="flex items-center">
        <span>Price: {ethers.utils.formatEther(cost)} ETH</span>
        <FaEthereum />
      </div>
    </div>
  );
}
