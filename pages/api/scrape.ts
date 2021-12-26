import type { NextApiRequest, NextApiResponse } from "next";

import { googleSearch } from "api/server/googleSearch";
import { scrape } from "api/server/scrape";

export type UrlMetaData = {
  url: string;
  title?: string;
  description?: string;
  site_name?: string;
  image?: string;
  icon?: string;
  keywords?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<UrlMetaData[]>) {
  const { url, site, query } = req.query;

  let urlArray: string[] = [];
  if (url) {
    urlArray = typeof url === "string" ? [url] : url;
  } else if (site && typeof site === "string" && query && typeof query === "string") {
    const urlInterface = new URL(site);
    const searchResult = await googleSearch({ query, urlOrigin: urlInterface.origin });

    urlArray = searchResult.items.map((item) => item.link);
  }

  const scrapePromises = await Promise.allSettled(urlArray.map(async (url) => scrape(url)));
  const response = scrapePromises
    .filter((promise) => promise.status === "fulfilled")
    .map((promise) => (promise as PromiseFulfilledResult<UrlMetaData>).value);

  res.status(200).json(response);
}
