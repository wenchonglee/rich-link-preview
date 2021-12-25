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
  const urlInterface = new URL(url);

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

      let icon = getIcon(cheerioAPI);
      // check if icon url is valid
      try {
        if (icon) new URL(icon);
      } catch (e) {
        icon = `${urlInterface.protocol}//${urlInterface.hostname}${icon}`;
      }

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

const getTitle = (cheerioAPI: CheerioAPI) => {
  return (
    cheerioAPI('meta[property="og:title"]').attr("content") ||
    cheerioAPI("title").text() ||
    cheerioAPI('meta[name="title"]').attr("content")
  );
};

const getDescription = (cheerioAPI: CheerioAPI) => {
  return (
    cheerioAPI('meta[property="og:description"]').attr("content") ||
    cheerioAPI('meta[name="description"]').attr("content")
  );
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

const getIcon = (cheerioAPI: CheerioAPI) => {
  return cheerioAPI('link[rel="icon"]').attr("href") || cheerioAPI('link[rel="shortcut icon"]').attr("href");
};

const getKeywords = (cheerioAPI: CheerioAPI) => {
  return (
    cheerioAPI('meta[property="og:keywords"]').attr("content") || cheerioAPI('meta[name="keywords"]').attr("content")
  );
};
