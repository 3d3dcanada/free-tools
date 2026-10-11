import moduleStyles from "./module.css?url";
import fontStyles from "./fonts.css?url";
export const moduleLinks = () => [
  { rel: "stylesheet", href: fontStyles },
  { rel: "stylesheet", href: moduleStyles },
];
