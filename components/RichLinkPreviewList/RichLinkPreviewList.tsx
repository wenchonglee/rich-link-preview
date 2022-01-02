import { ScrapeTarget, isUrl } from "../../pages";

import { RichLinkPreview } from "../RichLinkPreview";
import { RichLinkPreviewListContainer } from "./RichLinkPreviewListContainer";
import { SearchTargetRichLinkList } from "./SearchTargetRichLinkList";

/** @jsxImportSource @emotion/react */

type RichLinkPreviewListProps = { scrapeTargets: ScrapeTarget[] };
export const RichLinkPreviewList = (props: RichLinkPreviewListProps) => {
  const { scrapeTargets } = props;

  return (
    <RichLinkPreviewListContainer>
      <div>
        <h3>Your queries </h3>
      </div>

      {scrapeTargets.map((scrapeTarget, index) => {
        if (isUrl(scrapeTarget)) {
          return <RichLinkPreview scrapeResponse={null} url={scrapeTarget.url} key={scrapeTarget.url} />;
        } else {
          return <SearchTargetRichLinkList searchTarget={scrapeTarget} key={index} />;
        }
      })}
      <RichLinkPreview scrapeResponse={null} url={"https://github.com/wenchonglee/rich-link-preview"} />
    </RichLinkPreviewListContainer>
  );
};
