/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";

import { UrlMetaData } from "pages/api/scrape";
import { fetchMetadata } from "api/client/fetchMetadata";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

/** @jsxImportSource @emotion/react */

const pulse = keyframes`
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
`;
const RichLinkPreviewContainer = styled(motion.div)<{ isLoading: boolean }>(
  ({ theme }) => ({
    maxWidth: "50ch",
    minWidth: "40ch",
    borderRadius: theme.borderRadius,
    padding: theme.space.xs,
    backgroundColor: theme.color.surface2,
    color: theme.color.text1,
    position: "relative",
  }),
  ({ isLoading }) => ({
    animation: isLoading ? `${pulse} 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite` : undefined,
  })
);

const RichLinkPreviewIcon = styled.img({
  width: "20px",
  height: "20px",
  marginRight: "8px",
});

const RichLinkPreviewImage = styled(motion.img)<{ isLoading: boolean }>(
  ({ theme }) => ({
    maxWidth: "-webkit-fill-available",
    borderRadius: theme.borderRadius,
    maxHeight: "120px",
  }),
  ({ isLoading }) => ({
    animation: isLoading ? `${pulse} 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite` : undefined,
  })
);

type RichLinkPreviewProps = {
  url: string;
  scrapeResponse: UrlMetaData | null;
};

const RichLinkPreview = (props: RichLinkPreviewProps) => {
  const { url } = props;

  const [scrapeResponse, setScrapeResponse] = useState<UrlMetaData | null>(props.scrapeResponse);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const scrape = async () => {
      if (!scrapeResponse) {
        setIsLoading(true);
        const data = await fetchMetadata(url);

        setScrapeResponse(data !== null ? data[0] : null);
        setIsLoading(false);
      }
    };

    scrape();
  }, [url, scrapeResponse]);

  return (
    <RichLinkPreviewContainer
      animate={{
        opacity: 1,
        height: isLoading && !isImageLoaded ? "120px" : "auto",
      }}
      initial={{
        opacity: 0,
      }}
      transition={{
        height: { delay: 0, duration: 0.4 },
        opacity: { delay: 0.5, duration: 0.5 },
      }}
      isLoading={isLoading && !isImageLoaded}
    >
      {scrapeResponse && (
        <div>
          <div css={{ display: "flex" }}>
            <div>
              <RichLinkPreviewIcon src={scrapeResponse.icon} alt="Icon" />
            </div>

            <a
              css={(theme) => ({
                fontWeight: theme.fontWeight.lg,
              })}
              href={url}
            >
              {scrapeResponse.title}
            </a>
          </div>

          <div
            css={(theme) => ({
              fontSize: theme.fontSize.s,
            })}
          >
            {scrapeResponse.description}
          </div>

          {scrapeResponse.image && (
            <div
              css={(theme) => ({
                marginTop: theme.space.xxs,
              })}
            >
              <RichLinkPreviewImage
                isLoading={isLoading}
                animate={{
                  opacity: isLoading && !isImageLoaded ? 0 : 1,
                  // maxHeight: isLoading && !isImageLoaded ? "120px" : "auto",
                }}
                initial={{
                  opacity: 0,
                }}
                transition={{
                  maxHeight: { delay: 0, duration: 0.4 },
                  opacity: { delay: 0.5, duration: 0.5 },
                }}
                src={scrapeResponse.image}
                alt="Content image"
                onLoad={() => setIsImageLoaded(true)}
              />
            </div>
          )}
        </div>
      )}
    </RichLinkPreviewContainer>
  );
};

export { RichLinkPreview };
