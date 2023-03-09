export default function CComplete({
  onClickComplete,
}: {
  onClickComplete: () => void;
}) {
  return (
    <div>
      <h3>Delivery Complete</h3>
      <p>Thank you for using our service.</p>
      <button className="btn" onClick={() => onClickComplete()}>
        Return to package selection
      </button>
    </div>
  );
}
