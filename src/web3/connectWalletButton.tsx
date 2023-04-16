import { useConnectModal } from "@rainbow-me/rainbowkit";

const ConnectWalletButton = () => {
  const { openConnectModal } = useConnectModal();
  return (
    <div className="mx-auto">
      <button onClick={openConnectModal} className="btn-primary btn">
        Connect Wallet
      </button>
    </div>
  );
};

export default ConnectWalletButton;
