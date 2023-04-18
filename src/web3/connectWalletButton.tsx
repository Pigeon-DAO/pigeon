import { useConnectModal } from "@rainbow-me/rainbowkit";
import Button from "~/components/ui/button";

const ConnectWalletButton = () => {
  const { openConnectModal } = useConnectModal();
  return (
    <div className="mx-auto">
      <Button
        onClick={openConnectModal}
        text="Connect Wallet"
        styleType="accentOutline"
        type="button"
      />
    </div>
  );
};

export default ConnectWalletButton;
