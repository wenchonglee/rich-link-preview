import { Global } from "@emotion/react";
import { ThemeName } from "components/ThemeContext";

/** @jsxImportSource @emotion/react */

export const GlobalStyles = ({ userTheme }: { userTheme: ThemeName | null }) => {
  return (
    <Global
      styles={(theme) => ({
        ":root": {
          colorScheme: userTheme === ThemeName.Dark ? "dark" : "light",
        },
        "*": {
          boxSizing: "border-box",
          margin: 0,
        },
        html: {
          blockSize: "100%",
        },
        body: {
          minBlockSize: "100%",
          padding: theme.space.md,
          fontFamily: "system-ui, Segoe UI, Roboto, sans-serif",
          background: theme.color.surface1,
          "@media (orientation: landscape) and (min-width: 40ch)": {
            padding: theme.space.xl,
          },
        },
      })}
    />
  );
};
