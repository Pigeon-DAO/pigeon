import { useId } from "react";
import NoSSR from "react-no-ssr";
import { useAccount, useContractRead } from "wagmi";
import PackageView from "~/components/app/package-view";
import Button from "~/components/ui/button";
import { abi, contractAddress } from "~/contracts/Pigeon";

export default function Send() {
  const account = useAccount();
  const myPackages = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getMyPackages",
    overrides: {
      from: account.address,
    },
  });
  const id = useId();
  return (
    <div className="flex flex-col gap-4 py-32">
      <h1>Send</h1>
      <p>Send a package</p>
      <NoSSR>
        <Button type="link" href="/app/send/create">
          Create Package
        </Button>
        <p>My packages ({myPackages.data?.length})</p>
        {myPackages.data?.map((id, i) => (
          <div className="p-4" key={`${id}-${i}`}>
            <PackageView id={id.toString()} />
          </div>
        ))}
        {myPackages.data?.length === 0 && <p>You have no packages.</p>}
      </NoSSR>
    </div>
  );
}
