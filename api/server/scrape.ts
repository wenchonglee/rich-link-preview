import * as cheerio from "cheerio";

import { CheerioAPI } from "cheerio";
import axios from "axios";

const responseCache = new Map<string, UrlMetaData>();

export type UrlMetaData = {
  url: string;
  title?: string;
  description?: string;
  site_name?: string;
  image?: string;
  icon?: string;
  keywords?: string;
};

export const scrape = async (url: string): Promise<UrlMetaData> => {
  const cache = responseCache.get(url);
  if (cache) {
    return cache;
  }

  const urlMetadata = await axios
    .get(url, {
      timeout: 1000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
      },
    })
    .then((response) => {
      const { data } = response;

      const cheerioAPI = cheerio.load(data);
      const title = getTitle(cheerioAPI);
      const description = getDescription(cheerioAPI);
      const site_name = getSiteName(cheerioAPI);
      const image = getImage(cheerioAPI);
      const keywords = getKeywords(cheerioAPI);

      let icon = getIcon(url, cheerioAPI);

      const urlMetaData: UrlMetaData = {
        title,
        description,
        url,
        site_name,
        image,
        icon,
        keywords,
      };

      return urlMetaData;
    })
    .catch((_error) => {
      throw new Error("Failed to fetch");
    });

  responseCache.set(url, urlMetadata);

  return urlMetadata;
};
/**
 *
 * Todo: Separate between RDFa and old HTML tags, comment them properly
 * https://en.wikipedia.org/wiki/RDFa
 * https://stackoverflow.com/questions/22350105/whats-the-difference-between-meta-name-and-meta-property
 * https://indieweb.org/The-Open-Graph-protocol
 *
 * https://medium.com/slack-developer-blog/everything-you-ever-wanted-to-know-about-unfurling-but-were-afraid-to-ask-or-how-to-make-your-e64b4bb9254
 * https://api.slack.com/reference/messaging/link-unfurling
 *
 * To add:
 * - Twitter cards
 * - Check page content for description
 * - Check page content for first image
 *
 */
const getTitle = (cheerioAPI: CheerioAPI) => {
  const ogTitle = cheerioAPI('meta[property="og:title"]').attr("content");
  if (ogTitle) return ogTitle;

  const documentTitle = cheerioAPI("title").text();
  if (documentTitle) return documentTitle;

  const htmlMeta = cheerioAPI('meta[name="title"]').attr("content");
  return htmlMeta;
};

const getDescription = (cheerioAPI: CheerioAPI) => {
  const ogDescription = cheerioAPI('meta[property="og:description"]').attr("content");
  if (ogDescription) return ogDescription;

  const htmlMeta1 = cheerioAPI('meta[name="og:description"]').attr("content");
  if (htmlMeta1) return htmlMeta1;

  const htmlMeta2 = cheerioAPI('meta[name="description"]').attr("content");
  return htmlMeta2;
};

const getSiteName = (cheerioAPI: CheerioAPI) => {
  return cheerioAPI('meta[property="og:site_name"]').attr("content");
};

const getImage = (cheerioAPI: CheerioAPI) => {
  return (
    cheerioAPI('meta[property="og:image"]').attr("content") ||
    cheerioAPI('meta[property="og:image:url"]').attr("content")
  );
};

const getIcon = (url: string, cheerioAPI: CheerioAPI) => {
  const urlInterface = new URL(url);
  let icon = cheerioAPI('link[rel="icon"]').attr("href") || cheerioAPI('link[rel="shortcut icon"]').attr("href");
  // check if icon url is valid
  try {
    if (icon) new URL(icon);
  } catch (e) {
    icon = `${urlInterface.protocol}//${urlInterface.hostname}${icon}`;
  }

  return icon;
};

const getKeywords = (cheerioAPI: CheerioAPI) => {
  return (
    cheerioAPI('meta[property="og:keywords"]').attr("content") || cheerioAPI('meta[name="keywords"]').attr("content")
  );
};
