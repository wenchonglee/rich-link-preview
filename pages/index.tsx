import Head from "next/head";
import { Hero } from "components/Hero/Hero";
import { Main } from "components/Main";
import type { NextPage } from "next";
import { RedditList } from "components/RichLinkPreviewList/RedditList";
import { RichLinkPreviewList } from "components/RichLinkPreviewList/RichLinkPreviewList";
import { ThemeToggle } from "components/ThemeToggle";
import useMedia from "use-media";
import { useState } from "react";

type UrlTarget = { url: string };
export type SearchTarget = { site: string; query: string };
export type ScrapeTarget = UrlTarget | SearchTarget;
export const isUrl = (scrapeTarget: ScrapeTarget): scrapeTarget is UrlTarget => {
  return (scrapeTarget as UrlTarget).url !== undefined;
};

const Home: NextPage = () => {
  const [scrapeTargets, setScrapeTargets] = useState<ScrapeTarget[]>([]);
  const isPortraitMedia = useMedia("(orientation: portrait) and (min-width: 40ch)");

  return (
    <>
      <Head>
        <title>Rich Link Preview</title>
        <meta property="og:description" content="Render rich link previews for your websites" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Hero setScrapeTargets={setScrapeTargets} />
        {isPortraitMedia ? (
          <RichLinkPreviewList scrapeTargets={scrapeTargets} />
        ) : (
          <>
            <RichLinkPreviewList scrapeTargets={scrapeTargets} />
            <RedditList />
          </>
        )}
      </Main>
      <ThemeToggle />
    </>
  );
};

export default Home;
