import { useEffect, useState } from "react";

import { RichLinkPreview } from "./RichLinkPreview";
import { UrlMetaData } from "../pages/api/scrape";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

/** @jsxImportSource @emotion/react */

export const RichLinkPreviewListContainer = styled.div({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "20px",
});
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

export { RedditList };
