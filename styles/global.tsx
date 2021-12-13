import { Global } from "@emotion/react";

/** @jsxImportSource @emotion/react */

/** 
create a theme system in pure css
- media queries (color scheme, no animation, ...)
- try to use logical css rules

also:
- use label and form input and tie them tgt
*/
export const GlobalStyles = ({ isPreferDarkScheme }: { isPreferDarkScheme: boolean }) => {
  return (
    <Global
      styles={(theme) => ({
        ":root": {
          colorScheme: isPreferDarkScheme ? "dark" : "light",
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
          "@media (orientation: landscape) and (min-width: 640px)": {
            padding: theme.space.xl,
          },
        },
      })}
    />
  );
};
