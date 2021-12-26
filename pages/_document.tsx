import Document, { Head, Html, Main, NextScript } from "next/document";

function setThemeInLocalStorage() {
  const localStoragePreference = window.localStorage.getItem("theme");

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const mediaQueryPreference = mediaQuery ? "dark" : "light";
  window.localStorage.setItem("theme", localStoragePreference ?? mediaQueryPreference);
}

const blockingSetThemeInLocalStorage = `(function() {
      ${setThemeInLocalStorage.toString()}
      setThemeInLocalStorage();
  })()
  `;

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: blockingSetThemeInLocalStorage,
            }}
          ></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
