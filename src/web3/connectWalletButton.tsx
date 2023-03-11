import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";

const ConnectWalletButton = () => {
  const { openConnectModal } = useConnectModal();
  return (
    <div className="mx-auto w-72">
      <button onClick={openConnectModal}>Connect Wallet</button>
    </div>
  );
};

export default ConnectWalletButton;
