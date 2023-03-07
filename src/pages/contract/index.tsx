import { redirect } from "next/dist/server/api-utils";
import dynamic from "next/dynamic";

// import contract without ssr
const Contract_NoSSR = dynamic(() => import("./contract_noSSR"), {
  ssr: false,
});

export default function Contract() {
  return <div></div>;
}
