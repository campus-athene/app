export const reset = (exams) => ({
  type: 'RESET',
  exams: exams
});


const exams = (state = [], action) => {
  switch (action.type) {
    case 'RESET':
      return action.exams;
    default:
      return state;
  }
}

export default exams;
