import { GetServerSidePropsContext, PreviewData } from "next";
import { getSession } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";
import { env } from "~/env/server.mjs";

export default async function ensureBetaAccess(
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
  const session = await getSession(ctx);

  if (!session?.user?.hasBetaAccess && env.NODE_ENV !== "development") {
    return {
      redirect: {
        destination: "/whitelisted",
        permanent: true,
      },
    };
  }

  return { props: {} };
}
