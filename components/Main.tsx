import styled from "@emotion/styled";

export const Main = styled.main(({ theme }) => ({
  display: "grid",
  flexDirection: "column",
  gap: theme.space.md,
  placeContent: "center",
  height: "88vh",
  "@media (orientation: landscape) and (min-width: 640px)": {
    gridTemplateColumns: "minmax(40ch,60ch) minmax(40ch,60ch) minmax(40ch,60ch)",
  },
}));
