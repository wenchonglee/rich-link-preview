import { useEffect, useState } from "react";

import { LoadingDots } from "../LoadingDots";
import { RichLinkPreview } from "../RichLinkPreview";
import { RichLinkPreviewListContainer } from "./RichLinkPreviewListContainer";
import { Subtext } from "../Hero/Subtext";
import { UrlMetaData } from "../../pages/api/scrape";
import { fetchMetadata } from "api/client/fetchMetadata";
import { fetchRedditUrls } from "api/client/fetchRedditUrls";

/** @jsxImportSource @emotion/react */

export const RedditList = () => {
  const [scrapeResponses, setScrapeResponses] = useState<UrlMetaData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const redditUrls = await fetchRedditUrls();
      const response = await fetchMetadata(redditUrls);

      if (response) {
        setScrapeResponses(response);
      }
      setIsLoading(false);
    };

    fetch();
  }, []);

  return (
    <RichLinkPreviewListContainer>
      <div>
        <h3>Examples from Reddit </h3>
        <Subtext>r/worldnews</Subtext>

        {isLoading && (
          <>
            <br />
            <LoadingDots />
          </>
        )}
      </div>

      {scrapeResponses.map((scrapeResponse, index) => {
        return <RichLinkPreview scrapeResponse={scrapeResponse} url={scrapeResponse.url} key={index} />;
      })}
    </RichLinkPreviewListContainer>
  );
};
