import { CapacitorHttp } from '@capacitor/core';
import { useQueries } from '@tanstack/react-query';
import { parseString } from 'browser-xml2js';
import moment, { Moment } from 'moment';

const feedSources = {
  general:
    'https://www.tu-darmstadt.de/universitaet/aktuelles_meldungen/neues_aus_der_tu_rss.de.rss',
  ulb: 'https://www.ulb.tu-darmstadt.de/die_bibliothek/aktuelles/news/news_rss_feed.de.rss',
  asta: 'https://www.asta.tu-darmstadt.de/de/rss.xml',
};

type FeedName = keyof typeof feedSources;

type FeedItem = {
  guid: string;
  title: string;
  pubDate: Moment;
  description: string;
  link: string;
  author: string;
  source: FeedName;
};

export const useFeeds = (feeds: FeedName[]) =>
  useQueries({
    queries: feeds.map((feed) => ({
      queryKey: ['news', feed],
      queryFn: async () => {
        const response = await CapacitorHttp.get({
          url: feedSources[feed],
        });

        const xml = await new Promise<any>((resolve, reject) =>
          parseString(response.data, (e, r) => (e ? reject(e) : resolve(r))),
        );

        return xml.rss.channel[0].item.map((item: any) => ({
          guid: item.guid[0],
          title: item.title[0],
          pubDate: moment(item.pubDate[0]),
          description: item.description[0],
          link: item.link[0],
          author: feed === 'asta' ? item['dc:creator'][0] : item.author[0],
          source: feed,
        })) as FeedItem;
      },
      enabled: feeds.includes(feed as FeedName),
    })),
  });
