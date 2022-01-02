import { createContext, useContext, useEffect, useState } from "react";
import { darkTheme, lightTheme } from "styles/theme";

import { GlobalStyles } from "styles/global";
import { ThemeProvider } from "@emotion/react";

export enum ThemeName {
  Light = "light",
  Dark = "dark",
}

/** This causes hydration errors */
// const getUserTheme = (): ThemeName => {
//   if (typeof window === "undefined") return ThemeName.Light;
//   const localStorageTheme = window.localStorage.getItem("theme") as ThemeName | null;

//   return localStorageTheme ?? ThemeName.Light;
// };

export const UserThemeContext = createContext<
  | {
      userTheme: ThemeName | null;
      setUserTheme(theme: ThemeName): void;
    }
  | undefined
>(undefined);

export const UserThemeProvider: React.FC = ({ children }) => {
  const [userTheme, setUserTheme] = useState<ThemeName | null>(null);

  useEffect(() => {
    const localStorageTheme = window.localStorage.getItem("theme") as ThemeName | null;

    setUserTheme(localStorageTheme ?? ThemeName.Light);
  }, []);

  useEffect(() => {
    if (userTheme) {
      window.localStorage.setItem("theme", userTheme);
    }
  }, [userTheme]);

  return (
    <UserThemeContext.Provider
      value={{
        userTheme,
        setUserTheme,
      }}
    >
      <ThemeProvider theme={userTheme === ThemeName.Dark ? darkTheme : lightTheme}>
        <GlobalStyles userTheme={userTheme} />
        <div
          style={{
            visibility: userTheme === null ? "hidden" : "visible",
          }}
        >
          {children}
        </div>
      </ThemeProvider>
    </UserThemeContext.Provider>
  );
};

export const useUserTheme = () => {
  const context = useContext(UserThemeContext);
  if (context === undefined) {
    throw new Error("useUserTheme must be used within a UserThemeProvider");
  }

  return context;
};
