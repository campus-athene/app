import { createSlice } from '@reduxjs/toolkit';
import { session } from '../../api';
import { dispatchInstructions } from '../../redux/instructions';
import { selectSyncState as selectGlobalSyncState } from '../../redux/sync';
import { selectCreds } from '../auth/authSlice';

const offersSlice = createSlice({
  name: 'offers',
  initialState: { majors: {}, hasLoaded: false, error: null },
  reducers: {
    reset(state, { payload: { major, area, lists } }) {
      lists.forEach((l) => {
        const majorObj =
          state.majors[l.major] || (state.majors[l.major] = { areas: {} });
        const areaObj =
          majorObj.areas[l.area] || (majorObj.areas[l.area] = { lists: {} });
        areaObj.lists[l.id] = l;
      });

      const stateObj = major ? state.majors[major]?.areas[area] || {} : state;
      stateObj.hasLoaded = true;
      stateObj.error = null;
    },
    setIsLoading(state, { payload }) {
      const { major, area } = payload || {};
      if (major)
        (state.majors[major] || (state.majors[major] = { areas: {} })).areas[
          area
        ] = { lists: {} };
      else state.loadInvoked = true;
    },
    setError(state, { payload: { major, area, error } }) {
      const areaObject = state.majors[major]?.areas[area];
      if (areaObject) areaObject.error = error;
    },
  },
});

const { setIsLoading } = offersSlice.actions;
export const { reset, setError } = offersSlice.actions;

export const loadArea = (major, area, list) => async (dispatch, getState) => {
  const { offers } = getState();
  if (!major) {
    if (offers.loadInvoked) return;
    dispatch(setIsLoading());
  } else {
    if (offers.majors[major]?.areas[area]) return;
    dispatch(setIsLoading(major, area));
  }
  const creds = selectCreds()(getState(), dispatch);
  try {
    const { result: lists } = await new session(creds).getCourseOffers(
      major,
      area,
      list
    );
    dispatch(reset({ major, area, lists }));
  } catch (error) {
    dispatch(setError({ major, area, error: String(error) }));
    console.error(error);
  }
};

export const register = (registration) => async (dispatch, getState) => {
  const state = getState();
  try {
    const body = await new session(state.auth.creds).registerCourse(
      registration
    );
    dispatchInstructions(dispatch, body.instructions);
    return null;
  } catch (error) {
    console.log(`Register failed with '${JSON.stringify(error)}'.`);
    // Error is a string with a user friendly error message.
    return error;
  }
};

export const selectSyncState = (major, area) => (state) => {
  const areaObj = major
    ? state.offers.majors[major]?.areas[area] || {}
    : state.offers;
  const { hasLoaded, error } = areaObj;
  const { isOffline } = selectGlobalSyncState()(state);
  return {
    isLoading: !hasLoaded && !error && !isOffline,
    isOffline: !!error || isOffline,
  };
};

export const selectLists =
  (major, area) =>
  ({ offers }) =>
    major
      ? Object.values(offers.majors[major]?.areas[area || 0]?.lists || {})
      : Object.values(offers.majors)
          .map((m) => Object.values(m.areas[area || 0]?.lists || {}))
          .flat();
export const selectOffer =
  (major, area, list, module) =>
  ({ offers }) =>
    offers.majors[major]?.areas[area]?.lists[list].modules.find(
      (m) => m.id === module
    ) || null;

export default offersSlice.reducer;
