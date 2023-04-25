import { BigNumber, ethers } from "ethers";
import { useRouter } from "next/router";
import { useId, useState } from "react";
import { useContractWrite } from "wagmi";
import Button from "~/components/ui/button";
import { abi, contractAddress } from "~/contracts/Pigeon";
import { useAppStore } from "~/stores/useAppStore";

export default function SendCreate() {
  const createPackage = useContractWrite({
    address: contractAddress,
    abi: abi,
    mode: "recklesslyUnprepared",
    functionName: "createPackage",
  });

  const id = useId();

  const router = useRouter();

  const loading = useAppStore((s) => s.loading);
  const setLoading = useAppStore((s) => s.setLoading);
  const setLoadingMessage = useAppStore((s) => s.setLoadingMessage);

  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [priceEth, setPriceETH] = useState("");

  const [errors, setErrors] = useState<string[]>([]);

  async function SubmitCreate() {
    let localErrors: string[] = [];
    if (pickupAddress.length < 3) {
      localErrors = [...localErrors, "Pickup address is too short."];
    }
    if (dropoffAddress.length < 3) {
      localErrors = [...localErrors, "Dropoff address is too short."];
    }
    let price = BigNumber.from(0);

    if (priceEth.length > 0 && typeof parseInt(priceEth) === "number") {
      price = ethers.utils.parseEther(priceEth);
    } else {
      localErrors = [
        ...localErrors,
        "Payment price is not entered or formated incorrectly.",
      ];
    }
    if (localErrors.length > 0) {
      setErrors(localErrors);
      return;
    }
    setLoading(true);
    setLoadingMessage("Creating package...");
    const tx = await createPackage.writeAsync({
      recklesslySetUnpreparedArgs: [pickupAddress, dropoffAddress],
      recklesslySetUnpreparedOverrides: {
        value: price,
      },
    });
    setLoadingMessage("Waiting transaction on blockchain (do not refresh)");
    await tx.wait();
    setLoading(false);
    setTimeout(() => {
      router.push("/app/send");
    }, 2000);
  }

  return (
    <div className="flex flex-col gap-2 pt-32">
      <h1>Create</h1>
      <p>Create a package on the blockchain.</p>
      {errors.map((e, i) => (
        <p className="text-red-500" key={`${id}-${i}`}>
          {e}
        </p>
      ))}
      <label htmlFor="pickupAddress">Pickup Address</label>
      <input
        type="text"
        id="pickupAddress"
        value={pickupAddress}
        onChange={(e) => setPickupAddress(e.target.value)}
        className="text-black"
      />
      <label htmlFor="dropoffAddress">Dropoff Address</label>
      <input
        type="text"
        id="dropoffAddress"
        value={dropoffAddress}
        onChange={(e) => setDropoffAddress(e.target.value)}
        className="text-black"
      />
      <label htmlFor="priceEth">Price in ETH</label>
      <input
        type="text"
        id="priceEth"
        value={priceEth}
        onChange={(e) => setPriceETH(e.target.value)}
        className="text-black"
      />
      <Button onClick={() => SubmitCreate()}>Create</Button>
    </div>
  );
}
