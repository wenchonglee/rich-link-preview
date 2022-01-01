import styled from "@emotion/styled";

export const HeroGrid = styled.div({
  display: "grid",
  placeContent: "center",
  justifyContent: "flex-start",
  maxWidth: "60ch",
  "@media (orientation: portrait) and (min-width: 40ch)": {
    gridColumnStart: "1",
    gridColumnEnd: "2",
    placeContent: "flex-start",
  },
  "@media (orientation: landscape) and (min-width: 80ch)": {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  },
  "@media (orientation: landscape) and (min-width: 200ch)": {
    gridColumnStart: "1",
    gridColumnEnd: "2",
  },
});
