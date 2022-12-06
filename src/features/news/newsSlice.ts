import { createSlice } from '@reduxjs/toolkit';
import { log } from '../../app/errorReporting';
import { AppThunkAction, RootState } from '../../redux';

type TopicName = 'general' | 'ulb' | 'asta' | 'corona';
type Article = {
  link?: string;
  guid?: string;
  title?: string;
  pubDate?: string;
  creator?: string;
  summary?: string;
  content?: string;
  isoDate: string;
  categories?: string[];
  contentSnippet?: string;
  enclosure?: unknown;
};

const baseUrl =
  'https://4k4rerdgw7.execute-api.eu-central-1.amazonaws.com/json/';

const loadState = () => {
  const defaultState = {
    subscribedTopics: ['general', 'ulb', 'asta'],
    topics: {},
  };
  try {
    const storeData = localStorage.getItem('news');
    return storeData ? JSON.parse(storeData) : defaultState;
  } catch (e) {
    log('error', 'newsSlice.loadState threw an error.', e);
    return defaultState;
  }
};

const saveState = (state: RootState['news']) => {
  localStorage.setItem('news', JSON.stringify(state));
};

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    loaded: false,
    subscribedTopics: [] as TopicName[],
    topics: {} as Partial<{ [topic in TopicName]: { articles: Article[] } }>,
  },
  reducers: {
    hasLoaded: (state) => {
      state.loaded = true;
    },
    resetTopics: (state, { payload: { topics } }) => {
      state.topics = {
        ...state.topics,
        ...topics,
      };
      saveState(state);
    },
    setUserTopics: (state, { payload: { topics } }) => {
      state.subscribedTopics = topics;
    },
  },
  extraReducers: (builder) => {
    builder.addCase('@@INIT', loadState);
  },
});

const { hasLoaded, resetTopics } = newsSlice.actions;

export const update: () => AppThunkAction<Promise<void>> =
  () => async (dispatch, getState) => {
    const {
      news: { subscribedTopics },
    } = getState();

    await Promise.allSettled(
      subscribedTopics
        // Corona is not available anymore. Therefor, skip it.
        .filter((t) => t !== 'corona')
        .map((t) =>
          pullNews(t)
            .then((r) => dispatch(resetTopics({ topics: { [t]: r } })))
            .catch((error) =>
              log('warning', `Error while pulling news.`, { error, topic: t })
            )
        )
    );
    dispatch(hasLoaded());
  };

export const selectIsLoading =
  () =>
  ({ news: { loaded } }: RootState) =>
    !loaded;

export const selectSubscribedArticles =
  () =>
  ({ news: { topics, subscribedTopics } }: RootState): Article[] =>
    subscribedTopics
      .flatMap((t) => topics[t]?.articles || [])
      .sort((a, b) => -('' + a.isoDate).localeCompare(b.isoDate));

const pullNews = async (topic: TopicName) => {
  const response = await fetch(baseUrl + topic);
  if (!response.ok) {
    log('warning', 'Pulling news failed', [topic, response]);
    throw new Error('Pulling news failed');
  }

  return await response.json();
};

export default newsSlice.reducer;
