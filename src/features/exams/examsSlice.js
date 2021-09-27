import { createSlice } from '@reduxjs/toolkit';
import { session } from '../../api';
import { NetworkError, ServerError } from '../../api/errors';
import { log } from '../../errorReporting';
import { dispatchInstructions } from '../../redux/instructions';
import { descriptions as semesterDescs } from '../common/semesters';

const loadState = ({ items }) => {
  try {
    const local = JSON.parse(localStorage.getItem('exams'));
    if (!local) return;
    local.forEach((e) => (items[e.id] = e));
  } catch (e) {
    log('error', 'examsSlice.loadState threw an error.', e);
  }
};

const examsSlice = createSlice({
  name: 'exams',
  initialState: { items: {}, details: {} },
  reducers: {
    reset(state, action) {
      state.items = {};
      Object.values(action.payload).forEach((e) => (state.items[e.id] = e));
      localStorage.setItem('exams', JSON.stringify(Object.values(state.items)));
    },
    setDetails(state, { payload, payload: { id } }) {
      state.details[id] = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase('@@INIT', loadState);
  },
});

const { setDetails } = examsSlice.actions;
export const { reset } = examsSlice.actions;

export const getExamDetails = (id) => async (dispatch, getState) => {
  try {
    if (getState().exams.details[id] && !getState().exams.details[id].isOffline)
      return;
    dispatch(setDetails({ id, isLoading: true }));
    const response = await new session(getState().auth.creds).getExamGrades(id);
    dispatch(setDetails({ id, details: response.result }));
  } catch (error) {
    if (error instanceof NetworkError || error instanceof ServerError)
      dispatch(setDetails({ id, isOffline: true }));
    else throw error;
  }
};

export const registerExam =
  (id, semester, type) => async (dispatch, getState) => {
    try {
      const response = await new session(getState().auth.creds).registerExam(
        id,
        semester,
        type
      );
      dispatchInstructions(dispatch, response.instructions);
      return null;
    } catch (error) {
      if (error instanceof ServerError || error instanceof NetworkError)
        return error.message;
      throw error;
    }
  };

export const selectExam =
  (id) =>
  ({ exams }) => {
    const exam = exams.items[Number.parseInt(id)];
    if (!exam) return null;
    return {
      ...exams.details[id]?.details,
      ...exam,
    };
  };

export const selectExamSyncState =
  (id) =>
  ({ exams }) => {
    const exam = exams.items[id];
    if (!exam) return null;
    const details = exams.details[id];
    // We expect the calling component to call getExamsDetails so we already return isLoading.
    if (!details) return { isLoading: true, isOffline: false };
    return details;
  };

export const selectExamsGroupedBySemester = ({ exams }) =>
  Object.values(
    Object.values(exams.items)
      .filter((e) => !e.status)
      .reduce((groups, exam) => {
        (groups[exam.semester] = groups[exam.semester] || {
          id: exam.semester,
          display: semesterDescs[exam.semester] || 'Sonstige',
          exams: [],
        }).exams.push(exam);
        return groups;
      }, {})
  ).sort((a, b) => b.id - a.id);

export const selectExamOffers = ({ exams }) =>
  Object.values(exams.items).filter((e) => e.status);

export default examsSlice.reducer;
