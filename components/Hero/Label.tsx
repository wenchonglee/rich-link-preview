import styled from "@emotion/styled";

export const Label = styled.label(
  {
    display: "block",
  },
  ({ theme }) => ({
    color: theme.color.text1,
    fontWeight: theme.fontWeight.xl,
    marginBottom: theme.space.xs,
  })
);
