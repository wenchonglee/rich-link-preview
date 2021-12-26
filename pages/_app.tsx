import type { AppProps } from "next/app";
import { UserThemeProvider } from "components/ThemeContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <UserThemeProvider>
      <Component {...pageProps} />
    </UserThemeProvider>
  );
}
export default App;
