import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaDiscord, FaGithub } from "react-icons/fa";

export default function SignIn({ providers }: any) {
  const router = useRouter();

  const [signingIn, setSigningIn] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col">
      <section className="fixed-center text-center">
        <h1>Welcome to Pigeon</h1>
        <div className="mt-2 flex flex-col rounded-lg bg-black bg-opacity-50 px-4 py-8 backdrop-blur-md md:flex-row">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="h-40 md:h-80"
          />
          <div className="mr-4 flex flex-col items-center">
            <h1 className="">Sign In to Continue</h1>
            {Object.values(providers).map((provider: any) => (
              <button
                key={provider.name}
                className="btn flex items-center justify-start gap-3"
                onClick={() => {
                  setSigningIn(true);
                  signIn(provider.id, {
                    callbackUrl: router.query.callbackUrl as string,
                  });
                }}>
                {provider.name == "GitHub" && <FaGithub></FaGithub>}
                {provider.name == "Discord" && <FaDiscord></FaDiscord>}
                <div className="pb-[2px]">Sign in with {provider.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* {signingIn && <LoadingScreen text='Signing In' />} */}
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
