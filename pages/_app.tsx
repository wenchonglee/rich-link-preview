import { darkTheme, lightTheme } from "../styles/theme";
import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import { GlobalStyles } from "../styles/global";
import { ThemeProvider } from "@emotion/react";

function App({ Component, pageProps }: AppProps) {
  const [shouldMount, setShouldMount] = useState(false);
  const [isPreferDarkScheme, setIsPreferDarkScheme] = useState(false);

  useEffect(() => {
    /** little hack around because window only present in hooks */
    setIsPreferDarkScheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
    setShouldMount(true);
  }, []);

  if (!shouldMount) {
    return null;
  }

  return (
    <ThemeProvider theme={isPreferDarkScheme ? darkTheme : lightTheme}>
      <GlobalStyles isPreferDarkScheme={isPreferDarkScheme} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default App;
