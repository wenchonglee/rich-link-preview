/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";

import { LoadingCover } from "./LoadingCover";
import { LoadingDots } from "./LoadingDots";
import { UrlMetaData } from "../pages/api/scrape";
import { css } from "@emotion/react";
import { fetchMetadata } from "../api/client/fetchMetadata";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

/** @jsxImportSource @emotion/react */

const RichLinkPreviewContainer = styled(motion.div)(({ theme }) => ({
  // maxWidth: "420px",
  // minWidth: "420px",
  // minHeight: "200px",
  borderRadius: theme.borderRadius,
  padding: theme.space.xs,
  backgroundColor: "#fafafa",
  position: "relative",
}));

const RichLinkPreviewIcon = styled.img({
  width: "20px",
  height: "20px",
  marginRight: "8px",
});

const RichLinkPreviewImage = styled.img(({ theme }) => ({
  maxWidth: "-webkit-fill-available",
  borderRadius: theme.borderRadius,
  maxHeight: "120px",
}));

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
        // y: 0,
      }}
      initial={{
        opacity: 0,
        // y: -12
      }}
    >
      {!scrapeResponse && <LoadingCover isLoading={isLoading || !isImageLoaded} />}

      {scrapeResponse && (
        <div>
          <div css={{ display: "flex" }}>
            <div>
              <RichLinkPreviewIcon src={scrapeResponse.icon} alt="Icon" />
            </div>

            <a
              css={{
                fontWeight: 500,
                fontSize: "16px",
                color: "#006BB4",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              href={url}
            >
              {scrapeResponse.title}
            </a>
          </div>

          <div
            css={{
              fontSize: "12px",
              color: "#343741",
            }}
          >
            {scrapeResponse.description}
          </div>

          {scrapeResponse.image && (
            <div
              css={{
                marginTop: "4px",
              }}
            >
              <RichLinkPreviewImage
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
