import { abi, contractAddress } from "~/contracts/Pigeon";
import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";

import NoSSR from "react-no-ssr";
import PackageView from "~/components/app/package-view";

export default function Drive() {
  const getAllPackageIds = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getAllPackageIds",
  });

  return (
    <div className="pt-32">
      <h1>
        Drive & Earn with Pigeon starts{" "}
        <span className="text-accent">here</span>
      </h1>
      <h4>Available Packages</h4>
      <NoSSR>
        {getAllPackageIds.data?.map((id: BigNumber, i) => (
          <div className="p-4" key={`${id}-${i}`}>
            <PackageView id={id.toString()} />
          </div>
        ))}
        {getAllPackageIds.data?.length === 0 && (
          <div className="">
            <p>No packages available</p>
          </div>
        )}
      </NoSSR>
    </div>
  );
}
