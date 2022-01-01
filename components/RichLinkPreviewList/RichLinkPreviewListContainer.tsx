import styled from "@emotion/styled";

export const RichLinkPreviewListContainer = styled.div(({ theme }) => ({
  display: "grid",
  gap: theme.space.md,
  alignItems: "start",
  alignContent: "flex-start",
  flexDirection: "column",
  maxHeight: "88vh",
  overflow: "scroll",
  "&::-webkit-scrollbar": {
    width: "12px",
    height: "12px",
  },
  "&::-webkit-scrollbar-corner, html::-webkit-scrollbar-track": {
    backgroundColor: theme.color.surface1,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.color.surface5,
    backgroundClip: "content-box",
    borderRadius: "8px",
    border: `4px solid ${theme.color.surface1}`,
  },
}));
