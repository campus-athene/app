export const reset = (exams) => ({
  type: 'RESET',
  exams: exams
});


const initialState = [
  {
    courseTitle: 'Studienfach',
    examTitle: 'Klausurname',
    shortGrade: '3,7',
    longGrade: 'befriedigend'
  }
]

const exams = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET':
      return action.exams;
    default:
      return state;
  }
}

export default exams;
