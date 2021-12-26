import styled from "@emotion/styled";

export const Main = styled.main(({ theme }) => ({
  display: "grid",
  flexDirection: "column",
  gap: theme.space.md,
  placeContent: "center",
  height: "88vh",
  "@media (orientation: portrait) and (min-width: 60ch)": {
    gridTemplateColumns: "60ch",
  },
  "@media (orientation: landscape) and (min-width: 80ch)": {
    gridTemplateColumns: "60ch 60ch",
  },
  "@media (orientation: landscape) and (min-width: 200ch)": {
    gridTemplateColumns: "60ch 60ch 60ch",
  },
}));
