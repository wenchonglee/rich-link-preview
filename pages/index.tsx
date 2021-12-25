import { RedditList, RichLinkPreviewList } from "../components/List";

import Head from "next/head";
import { Hero } from "../components/Hero/Hero";
import { Main } from "../components/Main";
import type { NextPage } from "next";
import { useState } from "react";

type UrlTarget = { url: string };
export type SearchTarget = { site: string; query: string };
export type ScrapeTarget = UrlTarget | SearchTarget;
export const isUrl = (scrapeTarget: ScrapeTarget): scrapeTarget is UrlTarget => {
  return (scrapeTarget as UrlTarget).url !== undefined;
};

const Home: NextPage = () => {
  const [scrapeTargets, setScrapeTargets] = useState<ScrapeTarget[]>([]);

  return (
    <>
      <Head>
        <title>Rich Link Preview</title>
        <meta name="og:description" content="Render rich link previews for your websites" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Hero setScrapeTargets={setScrapeTargets} />
        <RichLinkPreviewList scrapeTargets={scrapeTargets} />
        <RedditList />
      </Main>
    </>
  );
};

export default Home;
