import { UrlMetaData } from "../pages/api/scrape";

const dev = process.env.NODE_ENV !== "production";

export const server = dev ? "http://localhost:3000" : "https://your_deployment.server.com";
export const fetchMetadata = async (url: string): Promise<UrlMetaData | null> => {
  try {
    const response = await fetch(`${server}/api/scrape?url=${url}`);
    const data = await response.json();

    return data;
  } catch (error) {
    return null;
  }
};
