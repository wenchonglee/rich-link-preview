import { UrlMetaData } from "../../pages/api/scrape";

const dev = process.env.NODE_ENV !== "production";

export const server = dev ? "http://localhost:3000" : "https://rich-link-preview.vercel.app";
export const fetchMetadata = async (url: string | string[]): Promise<UrlMetaData[] | null> => {
  const queryString = Array.isArray(url) ? url.join("&url=") : url;
  try {
    const response = await fetch(`${server}/api/scrape?url=${queryString}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const fetchMetadataFromSearch = async (params: {
  query: string;
  site: string;
}): Promise<UrlMetaData[] | null> => {
  const { query, site } = params;

  try {
    const response = await fetch(`${server}/api/scrape?site=${site}&query=${query}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
