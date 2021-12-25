import axios from "axios";

type GoogleSearchParams = {
  query: string;
  urlOrigin: string;
};
type GoogleSearchResult = {
  items: {
    link: string;
  }[];
};
export const googleSearch = async (params: GoogleSearchParams): Promise<GoogleSearchResult> => {
  const { query, urlOrigin } = params;

  const siteQuery = encodeURIComponent(`${query} site:${urlOrigin}`);
  const requesturl = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CX}&q=${siteQuery}`;
  const response = await axios.get(requesturl);

  const { data } = response;

  return data;
};
