import { ThemeName, useUserTheme } from "./ThemeContext";

import styled from "@emotion/styled";

const ToggleButton = styled.div(
  {
    position: "absolute",
    top: 20,
    right: 20,
    cursor: "pointer",
  },
  ({ theme }) => ({
    borderRadius: theme.borderRadius,
    padding: theme.space.xs,
    fontSize: theme.fontSize.xl,
    "&:hover": {
      backgroundColor: theme.color.surface2,
    },
  })
);

export const ThemeToggle = () => {
  const { userTheme, setUserTheme } = useUserTheme();

  return (
    <ToggleButton
      onClick={() => {
        setUserTheme(userTheme === ThemeName.Light ? ThemeName.Dark : ThemeName.Light);
      }}
    >
      {userTheme === ThemeName.Light ? "🌞" : "🌛"}
    </ToggleButton>
  );
};
