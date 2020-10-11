import { createSlice } from '@reduxjs/toolkit';
import { session } from '../../api';
import { dispatchInstructions } from '../../redux/instructions';
import { descriptions as semesterDescs } from '../common/semesters';

const loadState = () => {
  try {
    const local = JSON.parse(localStorage.getItem('exams'));
    const items = {};
    local.forEach(e => items[e.id] = e);
    return { items };
  }
  catch {
    return { items: {} };
  }
}

const examsSlice = createSlice({
  name: 'exams',
  initialState: loadState(),
  reducers: {
    reset(state, action) {
      state.items = {};
      Object.values(action.payload).forEach(e => state.items[e.id] = e);
      localStorage.setItem('exams', JSON.stringify(Object.values(state.items)));
    },
  },
});

export const { reset } = examsSlice.actions;

export const registerExam = (id, semester, type) => async (dispatch, getState) => {
  try {
    const response = await new session(getState().auth.creds).registerExam(id, semester, type);
    dispatchInstructions(dispatch, response.instructions);
    return response.success ? null : (response.message || "Ein unbekannter Fehler ist aufgetreten.");
  }
  catch { return "Ein unbekannter Fehler ist aufgetreten." }
}

export const selectExam = (id) => ({ exams }) => exams.items[Number.parseInt(id)];

export const selectExamsGroupedBySemester = ({ exams }) =>
  Object.values(
    Object.values(exams.items).reduce((groups, exam) => {
      (
        groups[exam.semester] = groups[exam.semester] || {
          id: exam.semester,
          display: semesterDescs[exam.semester] || "Sonstige",
          exams: []
        }
      ).exams.push(exam);
      return groups;
    }, {}))
    .sort((a, b) => b.id - a.id);

export default examsSlice.reducer;
