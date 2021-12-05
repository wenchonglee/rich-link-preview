const LIMIT = 10;
const SUBREDDIT = "worldnews";

export const fetchRedditUrls = async (): Promise<string[]> => {
  const response = await fetch(`https://www.reddit.com/r/${SUBREDDIT}.json?limit=${LIMIT}`);
  const data = await response.json();
  const redditUrls = data.data.children.map((post: any) => {
    if (post.data.is_reddit_media_domain) {
      return `https://www.reddit.com${post.data.permalink}`;
    }

    return post.data.url;
  });

  return redditUrls;
};
