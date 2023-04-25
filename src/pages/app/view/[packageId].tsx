import { BigNumber, ethers } from "ethers";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import NoSSR from "react-no-ssr";
import { useContractEvent } from "wagmi";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import Alert from "~/components/ui/alert";
import Button from "~/components/ui/button";
import { abi, contractAddress } from "~/contracts/Pigeon";
import { useAppStore } from "~/stores/useAppStore";
import { api } from "~/utils/api";

export default function ViewByID() {
  const { packageId } = useRouter().query;
  const router = useRouter();

  const getPackage = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getPackage",

    args: [BigNumber.from(packageId || 0)],
    enabled: packageId !== undefined,
  });

  const account = useAccount();

  const isSender = account.address === getPackage.data?.sender;
  const isDriver = account.address === getPackage.data?.driver;
  const contractStep = getPackage.data?.state;

  function isStep(step: number) {
    return contractStep !== undefined && contractStep === step - 1;
  }

  function isStepComplete(step: number) {
    return contractStep !== undefined && contractStep > step - 1;
  }

  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "DriverSelectedPackage",
    listener: onContractEvent,
  });
  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "SenderAcceptedDriver",
    listener: onContractEvent,
  });
  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "SenderRejectedDriver",
    listener: onContractEvent,
  });
  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "DriverMarkedDeliveryFinished",
    listener: onContractEvent,
  });
  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "DriverMarkedDeliveryFinished",
    listener: onContractEvent,
  });
  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "SenderAgreedDeliveryFinished",
    listener: onContractEvent,
  });

  function onContractEvent(event: BigNumber) {
    if (event.toString() != packageId?.toString()) return;
    getPackage.refetch();
  }

  const [funcName, setFuncname] = useState("");
  const [args, setArgs] = useState<Array<any>>([]);
  const setLoading = useAppStore((s) => s.setLoading);
  const setLoadingMessage = useAppStore((s) => s.setLoadingMessage);

  //@ts-expect-error: Typescript simply cannot understand this dynamic way of writing to the contract
  const writer = useContractWrite({
    address: contractAddress,
    abi: abi,
    mode: "recklesslyUnprepared",
    functionName: funcName,
    args: args,
  });

  useEffect(() => {
    if (funcName.length > 0) {
      setLoading(true);
      setLoadingMessage("Selecting package...");
      writer
        .writeAsync()
        .then((tx) => {
          setLoading(true);
          setLoadingMessage("Waiting for transaction... (do not refresh)");
          tx.wait()
            .then(() => {
              onComplete();
              setLoading(false);
              onComplete();
            })
            .catch((e) => {
              setLoading(false);
              console.error(e);
            });
        })
        .catch((e) => {
          setLoading(false);
          console.error(e);
        });
    }
  }, [funcName, args]);

  function doBlockchainWrite(funcName: string, args: Array<any>) {
    setFuncname(funcName);
    setArgs(args);
  }

  function onComplete() {
    getPackage.refetch();
  }

  return (
    <div className="py-32">
      <NoSSR>
        <div className="flex flex-col rounded-2xl bg-primary">
          {isSender && (
            <Alert text="You are the sender of this package." type="info" />
          )}
          {isDriver && (
            <Alert text="You are the driver of this package." type="info" />
          )}
        </div>
        <div
          className="flex cursor-pointer items-center text-gray-300 hover:text-white"
          onClick={() => router.back()}>
          <IoIosArrowBack size={64} className="" />
          <h1>View Package</h1>
        </div>

        <p>Package ID: {packageId}</p>
        {getPackage.data?.sender === ethers.constants.AddressZero ? (
          <p>Package does not exist</p>
        ) : (
          <div className="flex flex-col items-start">
            <h2>Package Status</h2>
            <div className="w-full rounded-xl bg-primary">
              <StepBase number={1} name="Package Listed" state={contractStep}>
                <>
                  <p>Package Created by: {getPackage.data?.sender}</p>
                  {isStep(1) && (
                    <>
                      <Alert text="Waiting for a driver..." type="info" />
                      {!isSender && (
                        <Button
                          onClick={() =>
                            doBlockchainWrite("selectPackage", [
                              BigNumber.from(packageId),
                            ])
                          }>
                          Be the driver
                        </Button>
                      )}
                    </>
                  )}
                </>
              </StepBase>
              <StepBase
                number={2}
                name="Agree on the driver"
                state={contractStep}>
                <>
                  {isStep(2) && isDriver && (
                    <Alert
                      text="Waiting for courier to accept you..."
                      type="info"
                    />
                  )}
                  {isStep(2) && isSender && (
                    <>
                      <Alert
                        text="Waiting for you to accept the driver..."
                        type="info"
                      />
                      <DriverProfile
                        address={getPackage.data?.driver as string}
                      />
                      <Button
                        onClick={() =>
                          doBlockchainWrite("acceptDriver", [
                            BigNumber.from(packageId),
                          ])
                        }>
                        Accept Driver
                      </Button>
                      <Button
                        onClick={() =>
                          doBlockchainWrite("rejectDriver", [
                            BigNumber.from(packageId),
                          ])
                        }>
                        Reject Driver
                      </Button>
                    </>
                  )}
                  {isStepComplete(2) && (
                    <DriverProfile
                      address={getPackage.data?.driver as string}
                    />
                  )}
                </>
              </StepBase>
              <StepBase number={3} name="Delivery" state={contractStep}>
                {isStep(3) && isSender && (
                  <p>The driver is delivering your package.</p>
                )}
                {isStep(3) && isDriver && (
                  <>
                    <p>
                      You are now delivering the package. <br />
                      When you are complete, mark the pacakge as delivered.
                      <br />
                      The courier will have to agree to it to complete the
                      transaction.
                    </p>
                    <Button
                      onClick={() =>
                        doBlockchainWrite("markDeliveryFinished", [
                          BigNumber.from(packageId),
                        ])
                      }>
                      Mark as delivered
                    </Button>
                  </>
                )}
                {isStepComplete(3) && <p>Congrats on the delivery!</p>}
              </StepBase>
              <StepBase number={4} name="Confirm Delivery" state={contractStep}>
                {isStep(4) && isSender && (
                  <>
                    <p>Time to accept the delivery!</p>
                    <Button
                      onClick={() =>
                        doBlockchainWrite("agreeDeliveryFinished", [
                          BigNumber.from(packageId),
                        ])
                      }>
                      Accept Delivery
                    </Button>
                  </>
                )}
                {isStep(4) && isDriver && (
                  <>
                    <Alert
                      type="info"
                      text="Waiting for the sender to accept your delivery."></Alert>
                  </>
                )}
                {isStepComplete(4) && (
                  <p>Congrats on completing the transaction!</p>
                )}
              </StepBase>
              <StepBase number={5} name="Finalization" state={contractStep}>
                {isStep(5) && (
                  <>
                    <p>Thank you for using Pigeon Courier.</p>
                    <p>The funds have been sent out to the Courier.</p>
                    <p>
                      Amount:{" "}
                      {ethers.utils.formatEther(
                        getPackage.data?.cost.mul(90).div(100)!
                      )}
                      ETH
                    </p>
                  </>
                )}
              </StepBase>
            </div>
          </div>
        )}
      </NoSSR>
    </div>
  );
}

function StepBase({
  children,
  number,
  name,
  state,
}: {
  children: ReactNode;
  number: number;
  name: string;
  state?: number;
}) {
  const completed =
    (state === undefined ? false : state > number - 1) || state === 4;
  const isStep = state === number - 1;
  return (
    <div className="flex w-full flex-col items-start border-b-4 border-accent3 p-8">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            completed
              ? "bg-green-500"
              : isStep
              ? "bg-yellow-500"
              : "bg-gray-700"
          }`}>
          <span className="text-white">{number}</span>
        </div>
        <h3 className="text-xl">{name}</h3>
      </div>

      <div className="my-8 flex flex-col gap-4 px-1">{children}</div>
    </div>
  );
}

function DriverProfile({ address }: { address: string }) {
  const driver = api.pigeon.getUserByAddress.useQuery(
    { address },
    { enabled: !!address }
  );

  return (
    <div>
      <span>Driver:{address}</span>
      {driver.data ? (
        <div className="flex flex-col gap-4 rounded-xl bg-accent3 p-4">
          <span>Name: {driver.data?.name}</span>
          <span>Email: {driver.data?.email}</span>
          {driver.data?.image && (
            <img
              src={driver.data?.image}
              className="h-32 w-32 rounded-full"
              alt="Driver"
            />
          )}
        </div>
      ) : (
        driver.isFetched &&
        !driver.data && (
          <Alert
            type="warning"
            text="Driver is not associated with Pigeon. It is not recommended to accept them."></Alert>
        )
      )}
    </div>
  );
}
