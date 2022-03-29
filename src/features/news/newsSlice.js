import { createSlice } from '@reduxjs/toolkit';
import { log } from '../../errorReporting';

const baseUrl =
  'https://4k4rerdgw7.execute-api.eu-central-1.amazonaws.com/json/';

const loadState = () => {
  const defaultState = {
    subscribedTopics: ['general', 'ulb', 'asta', 'corona'],
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

const saveState = (state) => {
  localStorage.setItem('news', JSON.stringify(state));
};

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    loaded: false,
    subscribedTopics: [],
    topics: {},
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

export const update = () => async (dispatch, getState) => {
  const {
    news: { subscribedTopics },
  } = getState();

  await Promise.allSettled(
    subscribedTopics.map((t) =>
      pullNews(t)
        .then((r) => dispatch(resetTopics({ topics: { [t]: r } })))
        .catch((error) =>
          log('warn', `Error while pulling news.`, { error, topic: t })
        )
    )
  );
  dispatch(hasLoaded());
};

export const selectIsLoading =
  () =>
  ({ news: { loaded } }) =>
    !loaded;

export const selectSubscribedArticles =
  () =>
  ({ news: { topics, subscribedTopics } }) =>
    subscribedTopics
      .flatMap((t) => topics[t]?.articles || [])
      .sort((a, b) => -('' + a.isoDate).localeCompare(b.isoDate));

const pullNews = async (topic) => {
  const response = await fetch(baseUrl + topic);
  if (!response.ok) {
    log('warn', 'Pulling news failed', [topic, response]);
    throw new Error('Pulling news failed');
  }

  return await response.json();
};

export default newsSlice.reducer;
