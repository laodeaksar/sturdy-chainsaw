type TweetMedia = {
  media_key: string;
  type: string;
  url: string;
  height: number;
  width: number;
};

export type RawTweetType = {
  includes: {
    media: TweetMedia[];
    users: Array<{
      verified: boolean;
      url: string;
      profile_image_url: string;
      protected: boolean;
      username: string;
      name: string;
      id: string;
    }>;
    tweets: TweetData[];
  };
  data: TweetData[];
};

export interface TweetData {
  text: string;
  type: string;
  referenced_tweets: TweetData[];
  public_metrics: {
    retweet_count?: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
  created_at: string;
  attachments: {
    media_keys: string[];
  };
  id: string;
  author_id: string;
}

export interface TransformedTweet extends TweetData {
  map(
    arg0: (tweet: TransformedTweet) => JSX.Element
  ):
    | string
    | number
    | boolean
    | {}
    | import("react").ReactElement<
        any,
        string | import("react").JSXElementConstructor<any>
      >
    | import("react").ReactNodeArray
    | import("react").ReactPortal
    | null
    | undefined;
  author: {
    verified: boolean;
    url: string;
    profile_image_url: string;
    protected: boolean;
    username: string;
    name: string;
    id: string;
  };
  media: TweetMedia[];
  referenced_tweets: TransformedTweet[];
}
