import Layout from "@components/layout";
import {
  pigeonContractAbi2,
  pigeonContractAddress2,
} from "contracts/pigeon/2/pigeonContract2";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

export default function Contract_NoSSR() {
  return (
    <Layout>
      <div className="flex w-full max-w-[900px] flex-col items-center justify-center gap-4">
        <h1>Contract Testing Page</h1>
        <AllPackagesSection />
        <IdToPackageSection />
        <CreatePackageSection />
      </div>
    </Layout>
  );
}

function AllPackagesSection() {
  const allPackages = useContractRead({
    address: pigeonContractAddress2,
    abi: pigeonContractAbi2,
    functionName: "getPackages",
  });
  return (
    <div className="w-full gap-2 rounded-xl bg-slate-700 px-6 pb-4">
      <h1>All Packages</h1>{" "}
      <button onClick={() => allPackages.refetch()}>Refresh</button>
      <div className="flex max-h-[400px] flex-col items-center gap-4 overflow-y-scroll">
        {allPackages?.data?.map((p, i) => (
          <Package p={p} key={i} />
        ))}
      </div>
    </div>
  );
}

function IdToPackageSection() {
  const [idToPackageId, setIdToPackageId] = useState<BigNumber | null>(null);

  const idToPackage = useContractRead({
    address: pigeonContractAddress2,
    abi: pigeonContractAbi2,
    functionName: "idToPackage",
    args: [idToPackageId || BigNumber.from(0)],
  });

  function fetchPackage() {
    try {
      setIdToPackageId(BigNumber.from(inputId));
    } catch {
      console.error("invalid");
      setIdToPackageId(null);
    }
  }
  const [inputId, setInputId] = useState<string>("");

  return (
    <div className="w-full gap-2 rounded-xl bg-slate-700 px-6 pb-4">
      <h1>ID To Package</h1>
      <input
        type="text"
        value={inputId}
        onChange={(e) => setInputId(e.currentTarget.value)}
      />
      <button onClick={() => fetchPackage()}>Submit</button>
      <div className="flex flex-col items-center">
        {idToPackage.data && <Package p={idToPackage.data} />}
      </div>
    </div>
  );
}

function CreatePackageSection() {
  const [username, setUsername] = useState<string>("");
  const [pickupAddress, setPickupAddress] = useState<string>("");
  const [dropoffAddress, setDropoffAddress] = useState<string>("");

  const [createPackageArgs, setCreatePackageArgs] = useState<string[]>([
    "",
    "",
    "",
  ]);

  const contract = useContractWrite({
    mode: "recklesslyUnprepared",
    address: pigeonContractAddress2,
    abi: pigeonContractAbi2,
    functionName: "createPackage",
    args: [createPackageArgs[0]!, createPackageArgs[1]!, createPackageArgs[2]!],
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: contract.data?.hash,
  });

  const [submitting, setSubmitting] = useState<boolean>(false);

  function submit() {
    setCreatePackageArgs([username, pickupAddress, dropoffAddress]);
    setSubmitting(true);
  }

  useEffect(() => {
    if (!!createPackageArgs && submitting) {
      if (
        createPackageArgs[0]!.length > 0 &&
        createPackageArgs[1]!.length > 0 &&
        createPackageArgs[2]!.length > 0
      ) {
        contract!.write();
        setSubmitting(false);
      }
    }
  }, [createPackageArgs, submitting]);
  return (
    <div className="w-full gap-2 rounded-xl bg-rose-900 px-6 pb-4">
      <h1>Create Package</h1>
      <div className="flex flex-col">
        <label className="pl-2">Username</label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => {
            setUsername(e.currentTarget.value);
          }}></input>
      </div>
      <div className="flex flex-col">
        <label className="pl-2">Pickup Address</label>
        <input
          type="text"
          required
          value={pickupAddress}
          onChange={(e) => {
            setPickupAddress(e.currentTarget.value);
          }}></input>
      </div>
      <div className="flex flex-col">
        <label className="pl-2">Dropoff Address</label>
        <input
          type="text"
          required
          value={dropoffAddress}
          onChange={(e) => {
            setDropoffAddress(e.currentTarget.value);
          }}></input>
      </div>
      <button onClick={submit}>
        {contract.status === "loading" ? "Loading..." : "Submit"}
      </button>
      <div>Data: {JSON.stringify(contract.data)}</div>
      <div>Error: {JSON.stringify(contract.error)}</div>
      <div>Loading: {JSON.stringify(isLoading)}</div>
      <div>Success: {JSON.stringify(isSuccess)}</div>
    </div>
  );
}

function Package({ p }: { p: any }) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
      <h3 className="break-all text-2xl font-bold">
        Package ID: <p>{p.packageId.toString()}</p>
      </h3>
      <div className="w-fit text-lg">
        <p>Dropoff Address: {p.dropoffAddress}</p>
        <p>Pickup Address: {p.pickupAddress}</p>
        <p>Owner: </p>
        <p>
          Address: <span className="block">{p.owner.userAddress}</span>
        </p>
        <p>Name: {p.owner.userName}</p>
      </div>
    </div>
  );
}
