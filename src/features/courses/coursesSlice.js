import { createSlice } from '@reduxjs/toolkit';
import { descriptions as semesterDescs } from '../common/semesters';

const loadState = ({ items }) => {
  try {
    const local = JSON.parse(localStorage.getItem('courses'));
    if (!local) return;
    local.forEach(
      (e) => ((items[e.semester] || (items[e.semester] = {}))[e.code] = e)
    );
  } catch (e) {
    console.error(e);
  }
};

const saveState = ({ items }) => {
  localStorage.setItem('courses', JSON.stringify(Object.values(items)));
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState: { items: {} },
  reducers: {
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

export const { reset } = coursesSlice.actions;

export const selectBySemesterAndNumber =
  (semester, number) =>
  ({ courses }) =>
    courses.items[semester][number];

export const selectCurrentSemester =
  () =>
  ({ courses }) =>
    Object.values(courses.items[15096000] || {}).sort((a, b) =>
      a.code < b.code ? -1 : a.code > b.code ? 1 : 0
    );

export const selectGroupedBySemester =
  () =>
  ({ courses }) =>
    [
      ...Object.keys(courses.items).map((semester) => ({
        id: semester,
        name: semesterDescs[semester] || 'Sonstige',
        courses: Object.values(courses.items[semester]),
      })),
    ];

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
