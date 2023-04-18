import HeroLayout from "~/components/layout/heroLayout";
import Button from "~/components/ui/button";

export default function Profile() {
  return (
    <HeroLayout>
      <h1 className="mb-6">My Profile</h1>
      <h3>Your profile will be an important part of how you use Pigeon.</h3>
      <h4>If you have beta access, you may check your beta profile here.</h4>
      <Button styleType="accentOutline" type="link" href="/app/profile">
        View Beta Profile
      </Button>
    </HeroLayout>
  );
}
