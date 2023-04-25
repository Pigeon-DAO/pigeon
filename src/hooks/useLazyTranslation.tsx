// import { useTranslation } from "next-i18next";
// import { useEffect } from "react";

// export default function useLazyTranslation() {
//   const { t, i18n } = useTranslation(["lazy-reload-page", "footer"], {
//     bindI18n: "languageChanged loaded",
//   });
//   // bindI18n: loaded is needed because of the reloadResources call
//   // if all pages use the reloadResources mechanism, the bindI18n option can also be defined in next-i18next.config.js
//   useEffect(() => {
//     i18n.reloadResources(i18n.resolvedLanguage, ["lazy-reload-page", "footer"]);
//   }, []);
//   return [t, i18n];
// }

export default function useLazyTranslation() {}
