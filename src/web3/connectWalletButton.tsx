import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";

const ConnectWalletButton = () => {
  const { openConnectModal } = useConnectModal();
  return (
    <div className="mx-auto">
      <button onClick={openConnectModal} className="btn">
        Connect Wallet
      </button>
    </div>
  );
};

export default ConnectWalletButton;
