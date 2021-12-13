import * as cheerio from "cheerio";

import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

export type UrlMetaData = {
  url: string;
  title?: string;
  description?: string;
  site_name?: string;
  image?: string;
  icon?: string;
  keywords?: string;
};

const responseCache = new Map();

export default function handler(req: NextApiRequest, res: NextApiResponse<UrlMetaData>) {
  const { url } = req.query;
  if (url && typeof url !== "string") {
    return;
  }

  if (responseCache.has(url)) {
    res.status(200).json(responseCache.get(url));
    return;
  }
  const urlInterface = new URL(url);

  return axios
    .get(url, {
      timeout: 1000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
      },
    })
    .then((response) => {
      const { data } = response;
      const $ = cheerio.load(data);
      const title =
        $('meta[property="og:title"]').attr("content") || $("title").text() || $('meta[name="title"]').attr("content");
      const description =
        $('meta[property="og:description"]').attr("content") || $('meta[name="description"]').attr("content");
      // const url = $('meta[property="og:url"]').attr("content");
      const site_name = $('meta[property="og:site_name"]').attr("content");
      const image =
        $('meta[property="og:image"]').attr("content") || $('meta[property="og:image:url"]').attr("content");

      let icon = $('link[rel="icon"]').attr("href") || $('link[rel="shortcut icon"]').attr("href");
      try {
        if (icon) {
          new URL(icon);
        }
      } catch (e) {
        icon = `${urlInterface.protocol}//${urlInterface.hostname}${icon}`;
      }
      const keywords = $('meta[property="og:keywords"]').attr("content") || $('meta[name="keywords"]').attr("content");

      const urlMetaData = {
        title,
        description,
        url,
        site_name,
        image,
        icon,
        keywords,
      };

      responseCache.set(req.query?.url, urlMetaData);
      res.status(200).json(urlMetaData);
    })
    .catch((error) => {
      res.status(500);
      console.log(url, error.code);
    });
}
