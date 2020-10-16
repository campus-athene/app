import { createSlice } from '@reduxjs/toolkit';
import { session } from '../../api';
import { dispatchInstructions } from '../../redux/instructions';

const offersSlice = createSlice({
  name: 'offers',
  initialState: { lists: [] },
  reducers: {
    reset(state, action) {
      state.lists = action.payload;
    },
  }
});

export const { reset } = offersSlice.actions;

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
}

export const selectLists = ({ offers }) => offers.lists;
export const selectOffer = (listId, moduleId) => ({ offers }) => offers.lists.find(l => l.id === listId)?.modules.find(m => m.id === moduleId);

export default offersSlice.reducer;
