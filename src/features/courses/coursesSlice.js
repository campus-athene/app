import { createSlice } from '@reduxjs/toolkit';
import { session } from '../../api';
import { log } from '../../errorReporting';
import { selectCreds } from '../auth/authSlice';
import {
  descriptions as semesterDescs,
  getRegSemester,
  getSemester,
} from '../common/semesters';

const loadState = ({ items }) => {
  try {
    const local = JSON.parse(localStorage.getItem('courses'));
    if (!local) return;
    // For downward compatibility, can be removed.
    const flat = local
      .map((g) => (typeof g.code === 'undefined' ? Object.values(g) : g))
      .flat();
    flat.forEach(
      (e) => ((items[e.semester] || (items[e.semester] = {}))[e.code] = e)
    );
  } catch (e) {
    log('error', 'coursesSlice.loadState threw an error.', e);
  }
};

const saveState = ({ items }) => {
  localStorage.setItem(
    'courses',
    JSON.stringify(
      Object.values(items)
        .map((s) => Object.values(s))
        .flat()
    )
  );
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState: { items: {}, status: 'initial' },
  reducers: {
    setStatus(state, { payload }) {
      state.status = payload;
    },
    reset(state, { payload: { courses } }) {
      state.items = {};
      courses.forEach((c) => {
        (state.items[c.semester] || (state.items[c.semester] = {}))[c.code] = c;
      });
      saveState(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase('@@INIT', loadState);
  },
});

const { setStatus } = coursesSlice.actions;
export const { reset } = coursesSlice.actions;

export const update = () => async (dispatch, getState) => {
  const creds = selectCreds()(getState(), dispatch);
  if (!creds) {
    log('warn', 'coursesSlice.update was called without creds being set.');
    return;
  }
  dispatch(setStatus('loading'));
  try {
    const response = await new session(creds).getCourses();
    dispatch(reset({ courses: response.modules }));
    dispatch(setStatus('loaded'));
  } catch (e) {
    log('error', 'coursesSlice.update raised an error.', e);
    dispatch(setStatus('error'));
  }
};

export const selectSyncState =
  () =>
  ({ courses: { status } }) => ({
    isLoading: status === 'loading',
    isOffline: status === 'error',
  });

export const selectBySemesterAndNumber =
  (semester, number) =>
  ({ courses }) =>
    courses.items[semester][number];

export const selectCurrentSemester =
  () =>
  ({ courses }) =>
    Object.values(courses.items[getSemester()] || {}).sort((a, b) =>
      a.code < b.code ? -1 : a.code > b.code ? 1 : 0
    );

export const selectGroupedBySemester =
  () =>
  ({ courses }) =>
    [
      ...Object.keys({ [getRegSemester()]: null, ...courses.items }).map(
        (semester) => ({
          id: Number.parseInt(semester),
          name: semesterDescs[semester] || 'Sonstige',
          courses: Object.values(courses.items[semester] || {}),
        })
      ),
    ].sort((a, b) => b.id - a.id);

export const getCourseColor = ({ code }, s, bl) => {
  // https://www.30secondsofcode.org/js/s/hsb-to-rgb
  const HSBToRGB = (h, s, b) => {
    s /= 100;
    b /= 100;
    const k = (n) => (n + h / 60) % 6;
    const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    return [255 * f(5), 255 * f(3), 255 * f(1)].map((n) => Math.floor(n));
  };

  const hash =
    (new TextEncoder().encode(code).reduce((p, c) => (p + c) / p, 257) *
      39119) %
    360;
  const [r, g, b] = HSBToRGB(hash, s, bl).map((c) =>
    c.toString(16).padStart(2, '0')
  );
  return `#${r}${g}${b}`;
};

export default coursesSlice.reducer;
