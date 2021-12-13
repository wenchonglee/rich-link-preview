import { RichLinkPreview } from "./RichLinkPreview";
import { UrlMetaData } from "../pages/api/scrape";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

/** @jsxImportSource @emotion/react */

export const RichLinkPreviewListContainer = styled.div(({ theme }) => ({
  display: "grid",
  gap: theme.space.md,
  alignItems: "start",
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
type RichLinkPreviewListProps = { urls: string[] };

const RichLinkPreviewList = (props: RichLinkPreviewListProps) => {
  const { urls } = props;

  return (
    <RichLinkPreviewListContainer>
      {urls.map((url, index) => {
        return <RichLinkPreview scrapeResponse={null} url={url} key={index} />;
      })}
    </RichLinkPreviewListContainer>
  );
};

type RedditListProps = { scrapeResponses: (UrlMetaData | null)[] };

const RedditList = (props: RedditListProps) => {
  const { scrapeResponses } = props;

  return (
    <RichLinkPreviewListContainer>
      {scrapeResponses.map((scrapeResponse, index) => {
        if (!scrapeResponse) {
          return null;
        }

        return <RichLinkPreview scrapeResponse={scrapeResponse} url={scrapeResponse.url} key={index} />;
      })}
    </RichLinkPreviewListContainer>
  );
};

export { RedditList, RichLinkPreviewList };
