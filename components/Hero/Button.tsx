import styled from "@emotion/styled";

export const Button = styled.button(({ theme }) => ({
  backgroundColor: theme.color.surface2,
  border: "none",
  borderRadius: theme.borderRadius,
  padding: theme.space.xs,
  fontWeight: theme.fontWeight.xl,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.color.surface3,
  },
}));
