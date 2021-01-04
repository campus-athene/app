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

export const selectGroupedBySemester = () => ({ courses }) =>
  Object.values(
    Object.values(courses.items).reduce((s, c) => {
      (s[c.semester] = s[c.semester] || {
        id: c.semester,
        name: semesterDescs[c.semester] || 'Sonstige',
        courses: [],
      }).courses.push(c);
      return s;
    }, {})
  ).sort((a, b) => b.id - a.id);

export default coursesSlice.reducer;
