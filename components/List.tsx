import { ScrapeTarget, SearchTarget, isUrl } from "../pages";
import { fetchMetadata, fetchMetadataFromSearch } from "api/client/fetchMetadata";
import { useEffect, useState } from "react";

import { RichLinkPreview } from "./RichLinkPreview";
import { UrlMetaData } from "../pages/api/scrape";
import { css } from "@emotion/react";
import { fetchRedditUrls } from "api/client/fetchRedditUrls";
import styled from "@emotion/styled";

/** @jsxImportSource @emotion/react */

const RichLinkPreviewListContainer = styled.div(({ theme }) => ({
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
type RichLinkPreviewListProps = { scrapeTargets: ScrapeTarget[] };

const RichLinkPreviewList = (props: RichLinkPreviewListProps) => {
  const { scrapeTargets } = props;

  return (
    <RichLinkPreviewListContainer>
      {scrapeTargets.map((scrapeTarget, index) => {
        if (isUrl(scrapeTarget)) {
          return <RichLinkPreview scrapeResponse={null} url={scrapeTarget.url} key={index} />;
        } else {
          return <SearchTargetRichLinkList searchTarget={scrapeTarget} key={index} />;
        }
      })}
    </RichLinkPreviewListContainer>
  );
};
type SearchTargetRichLinkListProps = { searchTarget: SearchTarget };

const SearchTargetRichLinkList = (props: SearchTargetRichLinkListProps) => {
  const { searchTarget } = props;
  const [scrapeResponses, setScrapeResponses] = useState<UrlMetaData[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchMetadataFromSearch(searchTarget);

      if (response) {
        setScrapeResponses(response);
      }
    };

    fetch();
  }, [searchTarget]);

  return (
    <>
      {scrapeResponses.map((scrapeResponse, index) => {
        return <RichLinkPreview scrapeResponse={scrapeResponse} url={scrapeResponse.url} key={index} />;
      })}
    </>
  );
};

const RedditList = () => {
  const [scrapeResponses, setScrapeResponses] = useState<UrlMetaData[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const redditUrls = await fetchRedditUrls();
      const response = await fetchMetadata(redditUrls);

      if (response) {
        setScrapeResponses(response);
      }
    };

    fetch();
  }, []);

  return (
    <RichLinkPreviewListContainer>
      {scrapeResponses.map((scrapeResponse, index) => {
        return <RichLinkPreview scrapeResponse={scrapeResponse} url={scrapeResponse.url} key={index} />;
      })}
    </RichLinkPreviewListContainer>
  );
};

export { RedditList, RichLinkPreviewList };
