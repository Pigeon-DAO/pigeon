import { AiOutlineRight } from "react-icons/ai";

export enum Steps {
  CreateListing,
  FindCourier,
  AcceptCourier,
  Delivery,
  Complete,
}

export default function StepProcess({ step }: { step: Steps }) {
  return (
    <div className="flex items-center gap-4">
      <StepBox text="Create Listing" currStep={step} number={0} />
      <AiOutlineRight size={24} />
      <StepBox text="Find Courier" currStep={step} number={1} />
      <AiOutlineRight size={24} />
      <StepBox text="Accept Courier" currStep={step} number={2} />
      <AiOutlineRight size={24} />
      <StepBox text="Delivery" currStep={step} number={3} />
      <AiOutlineRight size={24} />
      <StepBox text="Complete" currStep={step} number={4} />
    </div>
  );
}
export function StepBox({
  text,
  currStep,
  number,
}: {
  text: string;
  currStep: number;
  number: number;
}) {
  const active = currStep === number;
  const completed = currStep > number;
  return (
    <div
      className={`flex h-12 w-32 flex-col items-center justify-center border border-solid bg-slate-900 ${
        completed
          ? "border-green-500"
          : active
          ? "border-orange-500"
          : "border-white"
      }`}>
      <span className="text-center">{text}</span>
    </div>
  );
}
