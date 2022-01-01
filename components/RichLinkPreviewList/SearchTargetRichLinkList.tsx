import { useEffect, useState } from "react";

import { RichLinkPreview } from "../RichLinkPreview";
import { SearchTarget } from "../../pages";
import { UrlMetaData } from "../../pages/api/scrape";
import { fetchMetadataFromSearch } from "api/client/fetchMetadata";

/** @jsxImportSource @emotion/react */

type SearchTargetRichLinkListProps = { searchTarget: SearchTarget };
export const SearchTargetRichLinkList = (props: SearchTargetRichLinkListProps) => {
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
