import { Form } from "../components/Form";
import Head from "next/head";
import type { NextPage } from "next";
import { RedditList } from "../components/RedditList";
import { UrlMetaData } from "./api/scrape";
import { fetchMetadata } from "../utils/fetchMetadata";
import { fetchRedditUrls } from "../utils/fetchRedditUrls";

export async function getStaticProps() {
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

  return (
    <div>
      <Head>
        <title>placeholder title</title>
        <meta name="description" content="placeholder description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Form />

      <RedditList scrapeResponses={scrapeResponses} />
    </div>
  );
};

export default Home;
