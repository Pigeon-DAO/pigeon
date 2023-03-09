import { ParticipantSteps } from "@components/stepProcess";
import { abi, contractAddress } from "contracts/Pigeon";
import { useAppStore } from "stores/useAppStore";
import { useContractWrite } from "wagmi";

export default function PCompleteAgreement() {
  const setLoading = useAppStore((state) => state.setLoading);
  const setLoadingMessage = useAppStore((state) => state.setLoadingMessage);
  const complete = useContractWrite({
    address: contractAddress,
    abi: abi,
    mode: "recklesslyUnprepared",
    functionName: "agreeDeliveryFinished",
  });
  function onSubmit() {
    setLoading(true);
    setLoadingMessage("Accepting package...");
    complete
      .writeAsync()
      .then(() => {
        setLoading(false);
        setLoadingMessage("");
        localStorage.setItem(
          "pSmartContractWritePending",
          String(ParticipantSteps.AgreeCompletion)
        );
      })
      .catch((e) => {
        setLoading(false);
        setLoadingMessage("");
        console.log(e);
      });
  }

  const pSmartContractWritePending =
    localStorage.getItem("pSmartContractWritePending") ===
    String(ParticipantSteps.AgreeCompletion);

  return (
    <div className="flex flex-col">
      {pSmartContractWritePending ? (
        <span>
          The smart contract agreement is being confirmed on the blockchain.
        </span>
      ) : (
        <>
          <span>
            By clicking agree, I agree the package was delivered and the funds
            will be sent to the courier.
          </span>
          <button className="btn" onClick={() => onSubmit()}>
            Agree
          </button>
        </>
      )}
    </div>
  );
}
