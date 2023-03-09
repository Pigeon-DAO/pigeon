import { abi, contractAddress } from "contracts/Pigeon";
import { ethers } from "ethers";
import { useContractRead } from "wagmi";

export default function CAgreement({ address }: { address: string }) {
  const agreement = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getAgreement",
    args: [(address as `0x${string}`) || ethers.constants.AddressZero],
  });
  return (
    <div>
      {agreement.data?.state === 0 && (
        <span>Awaiting smart contract write</span>
      )}
      {agreement.data?.state === 1 && (
        <span>
          Package has been selected. Waiting for participant to agree.
        </span>
      )}
    </div>
  );
}
