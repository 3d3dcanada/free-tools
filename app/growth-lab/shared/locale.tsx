import { createContext, useContext, type ReactNode } from "react";
import { localizedPath, type Locale } from "../seo/guide";
import { translate } from "./translate";
import { sitePath } from "../seo/site-links";
export { translate } from "./translate";
export const LocaleContext = createContext<Locale>("en");
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}
export const useLocale = () => useContext(LocaleContext);
export function useT() {
  const locale = useLocale();
  return (text: string) => translate(text, locale);
}
export function useLocalLink() {
  const locale = useLocale();
  return (path: string) =>
    /^\/(tools|learn\/academy)(\/|$)/.test(path) ? localizedPath(path, locale) : sitePath(path, locale);
}
