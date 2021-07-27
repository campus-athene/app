import { createSlice } from '@reduxjs/toolkit';
import { descriptions as semesterDescs } from '../common/semesters';

const loadState = ({ items }) => {
  try {
    const local = JSON.parse(localStorage.getItem('courses'));
    if (!local) return;
    local.forEach((e) => (items[e.code] = e));
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
      Object.values(courses).forEach((c) => (state.items[c.code] = c));
      saveState(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase('@@INIT', loadState);
  },
});

export const { reset } = coursesSlice.actions;

export const selectCurrentSemester =
  () =>
  ({ courses }) =>
    Object.values(courses.items)
      .filter((c) => c.semester === 15096000)
      .sort((a, b) => (a.code < b.code ? -1 : a.code > b.code ? 1 : 0));

export const selectGroupedBySemester =
  () =>
  ({ courses }) =>
    Object.values(
      Object.values(courses.items).reduce(
        (s, c) => {
          (s[c.semester] = s[c.semester] || {
            id: c.semester,
            name: semesterDescs[c.semester] || 'Sonstige',
            courses: [],
          }).courses.push(c);
          return s;
        },
        // Force add SoSe 2021 to ensure registration is offered on CourseListPage.
        // Should be changed to current registration semester.
        {
          15096000: {
            id: 15096000,
            name: semesterDescs[15096000],
            courses: [],
          },
        }
      )
    ).sort((a, b) => b.id - a.id);

export const getCourseColor = ({ code }) => {
  // https://www.30secondsofcode.org/js/s/hsb-to-rgb
  const HSBToRGB = (h, s, b) => {
    console.log({ h, s, b });
    s /= 100;
    b /= 100;
    const k = (n) => (n + h / 60) % 6;
    const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    return [255 * f(5), 255 * f(3), 255 * f(1)].map((n) => Math.floor(n));
  };

  const hash =
    (new TextEncoder().encode(code).reduce((p, c) => (p + c) / p) * 39119) %
    360;
  const [r, g, b] = HSBToRGB(hash, 50, 100).map((c) =>
    c.toString(16).padStart(2, '0')
  );
  return `#${r}${g}${b}`;
};

export default coursesSlice.reducer;
