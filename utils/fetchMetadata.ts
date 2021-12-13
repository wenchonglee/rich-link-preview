import { UrlMetaData } from "../pages/api/scrape";

const dev = process.env.NODE_ENV !== "production";

export const server = dev ? "http://localhost:3000" : "https://rich-link-preview.vercel.app";
export const fetchMetadata = async (url: string): Promise<UrlMetaData | null> => {
  try {
    const response = await fetch(`${server}/api/scrape?url=${url}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
