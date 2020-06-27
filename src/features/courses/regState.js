import { session } from '../../api';
import { dispatchInstructions } from '../../redux/instructions';

export const showModal = (course) => ({
  type: 'REG_SHOWMODAL',
  course
});

export const execute = () => async (dispatch, getState) => {
  dispatch(setExecuting());
  const state = getState();
  try {
    const body = await new session(state.auth.creds).registerCourse(state.courseReg.course.registration);
    dispatchInstructions(dispatch, body.instructions);
    dispatch(setSuccess());
  }
  catch (error) {
    console.log(`Register failed with '${JSON.stringify(error)}'.`);
    // Error is a string with a user friendly error message.
    dispatch(setError(error));
  }
}

export const setExecuting = () => ({
  type: 'REG_START'
});

export const setSuccess = () => ({
  type: 'REG_SUCCESS'
});

export const setError = (message) => ({
  type: 'REG_ERROR',
  message
});

export const close = () => ({
  type: 'REG_CLOSE'
})


export default (state = null, action) => {
  switch (action.type) {
    case 'REG_SHOWMODAL':
      return {
        state: 'CONFIRM',
        course: action.course
      };
    case 'REG_START':
      return Object.assign({}, state, {
        state: 'EXECUTING'
      });
    case 'REG_SUCCESS':
      return Object.assign({}, state, {
        state: 'SUCCESS'
      });
    case 'REG_ERROR':
      return Object.assign({}, state, {
        state: 'ERROR',
        message: action.message
      });
    case 'REG_CLOSE':
      return null;
    default:
      return state;
  }
}
