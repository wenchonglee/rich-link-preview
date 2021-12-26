import styled from "@emotion/styled";

export const Input = styled.input(
  {
    border: "none",
    width: "50ch",
    borderRadius: "6px",
    // transition:
    //   "box-shadow 200ms ease-out,background-image 200ms ease-out,background-size 200ms ease-out,background-color 200ms ease-out",
    backgroundSize: "0% 100%",
    backgroundRepeat: "no-repeat",
    "&:focus": {
      outline: "none",
      backgroundSize: "100% 100%",
      backgroundImage: "linear-gradient(to top, #07C, #07C 2px, transparent 2px, transparent 100%)",
    },
    "&:invalid": {
      backgroundImage: "linear-gradient(to top, #BD271E, #BD271E 2px, transparent 2px, transparent 100%)!important",
      backgroundSize: "100% 100%",
    },
  },
  ({ theme }) => ({
    backgroundColor: theme.color.surface2,
    color: theme.color.text1,
    padding: theme.space.s,
    "&:focus": {
      backgroundColor: theme.color.surface3,
    },
  })
);
