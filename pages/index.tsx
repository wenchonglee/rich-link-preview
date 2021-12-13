import { RedditList, RichLinkPreviewList } from "../components/List";

import Head from "next/head";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";
import type { NextPage } from "next";
import { UrlMetaData } from "./api/scrape";
import { fetchMetadata } from "../utils/fetchMetadata";
import { fetchRedditUrls } from "../utils/fetchRedditUrls";
import { useState } from "react";

export async function getServerSideProps() {
  const redditUrls = await fetchRedditUrls();
  const scrapePromises = await Promise.allSettled(redditUrls.map(async (url) => fetchMetadata(url)));
  const scrapeResponses = scrapePromises.map((promise) => (promise.status === "fulfilled" ? promise.value : null));

  return {
    props: {
      scrapeResponses,
    },
  };
}

const Home: NextPage<{ scrapeResponses: (UrlMetaData | null)[] }> = (props) => {
  const { scrapeResponses } = props;
  const [urls, setUrls] = useState<string[]>([]);

  return (
    <>
      <Head>
        <title>Rich Link Preview</title>
        <meta name="og:description" content="Emulate how your website would like from a preview" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Hero setUrls={setUrls} />
        <RichLinkPreviewList urls={urls} />
        <RedditList scrapeResponses={scrapeResponses} />
      </Main>
    </>
  );
};

export default Home;
