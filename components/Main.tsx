import styled from "@emotion/styled";

export const Main = styled.main(({ theme }) => ({
  display: "grid",
  flexDirection: "column",
  gap: theme.space.md,
  height: "88vh",
  "@media (orientation: portrait) and (min-width: 40ch)": {
    gridTemplateColumns: "60ch",
    placeContent: "flex-start",
  },
  "@media (orientation: landscape) and (min-width: 80ch)": {
    gridTemplateColumns: "minmax(40ch,60ch) minmax(40ch,60ch)",
    placeContent: "center",
  },
  "@media (orientation: landscape) and (min-width: 200ch)": {
    gridTemplateColumns: "60ch minmax(40ch,60ch) minmax(40ch,60ch)",
    placeContent: "center",
  },
}));
