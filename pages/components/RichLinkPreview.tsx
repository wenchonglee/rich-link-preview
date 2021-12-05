/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useRef, useState } from "react";

import { LoadingCover } from "./LoadingCover";
import { LoadingDots } from "./LoadingDots";
import { UrlMetaData } from "../api/scrape";
import { css } from "@emotion/react";
import { fetchMetadata } from "../utils/fetchMetadata";
import styled from "@emotion/styled";

/** @jsxImportSource @emotion/react */

const RichLinkPreviewContainer = styled.div<{ backgroundColor?: string }>(
  {
    maxWidth: "420px",
    minWidth: "420px",
    minHeight: "200px",
    borderRadius: "8px",
    padding: "8px",
    backgroundColor: "#fafafa",
    position: "relative",
  },
  (props) => ({
    backgroundColor: props.backgroundColor,
  })
);

const RichLinkPreviewIcon = styled.img({
  width: "20px",
  height: "20px",
  marginRight: "8px",
});

const RichLinkPreviewImage = styled.img({
  maxWidth: "-webkit-fill-available",
  borderRadius: "8px",
  maxHeight: "200px",
});

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

        setScrapeResponse(data);
        setIsLoading(false);
      }
    };

    scrape();
  }, [url, scrapeResponse]);

  return (
    <RichLinkPreviewContainer
    // backgroundColor={
    //   scrapeResponse?.palette.DarkMuted.rgb ? rgbToCss(scrapeResponse?.palette.LightVibrant.rgb) : undefined
    // }
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

          <div
            css={{
              marginTop: "4px",
              // display: "flex",
              // justifyContent: "center",
            }}
          >
            <RichLinkPreviewImage
              src={scrapeResponse.image}
              alt="Content image"
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        </div>
      )}
    </RichLinkPreviewContainer>
  );
};

// const rgbToCss = (rgb: [number, number, number]) => {
//   return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
// };

export { RichLinkPreview };
