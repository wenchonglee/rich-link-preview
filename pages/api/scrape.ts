import * as cheerio from "cheerio";

import type { NextApiRequest, NextApiResponse } from "next";

import { Palette } from "@vibrant/color";
import Vibrant from "node-vibrant";
import fetch from "node-fetch";

export type UrlMetaData = {
  url: string;
  title?: string;
  description?: string;
  site_name?: string;
  image?: string;
  icon?: string;
  keywords?: string;
  // palette: Palette;
};

const responseCache = new Map();

export default function handler(req: NextApiRequest, res: NextApiResponse<UrlMetaData>) {
  const { url } = req.query;

  if (url && typeof url === "string") {
    if (responseCache.has(url)) {
      res.status(200).json(responseCache.get(url));
      return;
    }

    const urlInterface = new URL(url);

    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        const $ = cheerio.load(html);
        const title =
          $('meta[property="og:title"]').attr("content") ||
          $("title").text() ||
          $('meta[name="title"]').attr("content");
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
        const keywords =
          $('meta[property="og:keywords"]').attr("content") || $('meta[name="keywords"]').attr("content");

        const urlMetaData = {
          title,
          description,
          url,
          site_name,
          image,
          icon,
          keywords,
        };

        // let v = new Vibrant(image!);
        // v.getPalette().then((palette) => {
        //   const urlMetaDataWithPalette = {
        //     title,
        //     description,
        //     url,
        //     site_name,
        //     image,
        //     icon,
        //     keywords,
        //     palette,
        //   };

        responseCache.set(req.query?.url, urlMetaData);

        res.status(200).json(urlMetaData);
      });
  }
}
