import { useSession } from "next-auth/react";
import { createContext, ReactNode, useState, useEffect } from "react";

import { trpc } from "@utils/trpc";
import { useQuery } from "@tanstack/react-query";

interface UserContextI {
  signedIn: boolean;
}

const Context = createContext<UserContextI>({
  signedIn: false,
});

const UserContext = ({ children }: { children: ReactNode }) => {
  const nextAuthSession = useSession();

  const [signedIn, setSignedIn] = useState(false);

  const test = trpc.useContext();

  const [user, setUser] = useState<any | undefined>(undefined);

  const query = useQuery(["pigeon.user"], {
    enabled: signedIn,
  });

  useEffect(() => {
    const authenticated = nextAuthSession.status === "authenticated";

    setSignedIn(authenticated);
    if (authenticated) {
      setSignedIn(true);
    }
  }, [nextAuthSession]);

  const exposed = {
    signedIn,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export default UserContext;
