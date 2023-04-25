export default function Alert({
  text,
  type,
}: {
  text: string;
  type: "none" | "info" | "success" | "warning" | "error";
}) {
  return (
    <div
      className={`alert mb-2 flex gap-2 rounded-2xl px-2 py-4 text-xl shadow-lg ${
        type === "info"
          ? "bg-blue-600"
          : type === "success"
          ? "bg-green-500"
          : type === "warning"
          ? "bg-yellow-600"
          : type === "error"
          ? "bg-red-500"
          : ""
      }`}>
      <div className="flex items-center gap-2">
        {type === "info" ? (
          <InfoSVG />
        ) : type === "success" ? (
          <SuccessSVG />
        ) : type === "warning" ? (
          <WarningSVG />
        ) : type === "error" ? (
          <ErrorSVG />
        ) : (
          <NormalSVG />
        )}
        <span>{text}</span>
      </div>
    </div>
  );
}

const NormalSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="stroke-info h-6 w-6 flex-shrink-0">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const InfoSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="h-6 w-6 flex-shrink-0 stroke-current">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const SuccessSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 flex-shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const WarningSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 flex-shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

const ErrorSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 flex-shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
