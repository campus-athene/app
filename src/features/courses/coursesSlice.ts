import { createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { log } from '../../app/errorReporting';
import { session } from '../../provider/tucan';
import { CourseDetailsResult, Module } from '../../provider/tucan/apiTypes';
import {
  descriptions as semesterDescs,
  getRegSemester,
  getSemester,
  Semester,
} from '../../provider/tucan/semesters';
import { AppThunkAction, RootState } from '../../redux';
import { selectCreds } from '../auth/authSlice';

type CourseItems = { [semester: number]: { [code: string]: Module } };

const loadState = ({ items }: { items: CourseItems }) => {
  try {
    const local = localStorage.getItem('courses');
    if (!local) return;

    JSON.parse(local).forEach(
      (e: Module) =>
        ((items[e.semester] || (items[e.semester] = {}))[e.code] = e)
    );
  } catch (e) {
    log('error', 'coursesSlice.loadState threw an error.', e);
  }
};

const saveState = ({ items }: { items: CourseItems }) => {
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
  initialState: {
    items: {} as CourseItems,
    details: {} as { [id: number]: CourseDetailsResult },
    status: 'initial',
  },
  reducers: {
    setStatus(state, { payload }) {
      state.status = payload;
    },
    setDetails(state, { payload }: { payload: CourseDetailsResult }) {
      state.details[payload.id] = payload;
    },
    reset(state, { payload: { courses } }: { payload: { courses: Module[] } }) {
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

const { setStatus, setDetails } = coursesSlice.actions;
export const { reset } = coursesSlice.actions;

export const update: () => AppThunkAction<Promise<void>> =
  () => async (dispatch, getState) => {
    const creds = selectCreds()(getState());
    if (!creds) {
      log('warning', 'coursesSlice.update was called without creds being set.');
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

export const useDetails: (
  id: number
) =>
  | { loading: true; result: null; error: null }
  | { loading: false; result: CourseDetailsResult; error: null }
  | { loading: false; result: null; error: string } = (id) => {
  const cache = useSelector((state: RootState) => state.courses.details[id]);
  const creds = useSelector(selectCreds());
  const dispatch = useDispatch();

  useEffect(() => {
    if (creds)
      new session(creds)
        .getCourseDetails({ id })
        .then((r) => dispatch(setDetails(r)));
  }, [creds, dispatch, id]);

  if (!creds)
    return { loading: false, result: null, error: 'Not authenticated' };

  return cache
    ? { loading: false, result: cache, error: null }
    : { loading: true, result: null, error: null };
};

export const selectSyncState =
  () =>
  ({ courses: { status } }: RootState) => ({
    isLoading: status === 'loading',
    isOffline: status === 'error',
  });

export const selectBySemesterAndNumber =
  (semester: number, code: string) =>
  ({ courses }: RootState) =>
    courses.items[semester][code];

export const selectCurrentSemester =
  () =>
  ({ courses }: RootState) =>
    Object.values(courses.items[getSemester()] || {}).sort((a, b) =>
      a.code < b.code ? -1 : a.code > b.code ? 1 : 0
    );

export const selectGroupedBySemester =
  () =>
  ({ courses }: RootState) =>
    [
      ...Object.keys({ [getRegSemester()]: null, ...courses.items }).map(
        (key) => {
          const semester = Number.parseInt(key) as Semester;
          return {
            id: semester,
            name: semesterDescs[semester] || 'Sonstige',
            courses: Object.values(courses.items[semester] || {}),
          };
        }
      ),
    ].sort((a, b) => b.id - a.id);

export const getCourseColor = ({ code }: Module, s: number, bl: number) => {
  // https://www.30secondsofcode.org/js/s/hsb-to-rgb
  const HSBToRGB = (h: number, s: number, b: number) => {
    s /= 100;
    b /= 100;
    const k = (n: number) => (n + h / 60) % 6;
    const f = (n: number) =>
      b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
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
