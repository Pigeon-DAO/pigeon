import Button from "~/components/ui/button";

export default function Profile() {
  return (
    <div className="flex w-fit max-w-3xl flex-col gap-8 pt-32">
      <h1 className="mb-6">My Profile</h1>
      <h3>Your profile will be an important part of how you use Pigeon.</h3>
      <h4>If you have beta access, you may check your beta profile here.</h4>
      <Button styleType="accentOutline" type="nextLink" href="/app/profile">
        View Beta Profile
      </Button>
    </div>
  );
}
