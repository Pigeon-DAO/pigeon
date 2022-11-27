import Layout from "@components/layout";
import { signOut, useSession } from "next-auth/react";
import Router from "next/router";

const Home = () => {
  const session = useSession();

  return (
    <Layout>
      <h1>Welcome to Pigeon</h1>
      {!session.data && <p>Loading...</p>}
      {!!session.data?.user && (
        <div className="flex flex-col gap-2">
          <h2>Name: {session.data.user.name}</h2>
          <h3>Email: {session.data.user.email}</h3>
          <img
            src={session.data.user.image!}
            alt="Profile"
            className="mx-auto h-32 w-32 object-cover"></img>
          <button
            className="btn"
            onClick={() => {
              signOut();
              Router.push("/");
            }}>
            Sign Out
          </button>
        </div>
      )}
    </Layout>
  );
};

export default Home;
