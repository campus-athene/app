const convertGrade = (grade) => {
  switch (grade) {
    case '1,0': return { desc: 'sehr gut', color: 'success' };
    case '1,3': return { desc: 'sehr gut', color: 'success' };
    case '1,7': return { desc: 'sehr gut', color: 'success' };
    case '2,0': return { desc: 'gut', color: 'success' };
    case '2,3': return { desc: 'gut', color: 'success' };
    case '2,7': return { desc: 'gut', color: 'success' };
    case '3,0': return { desc: 'befriedigend', color: 'warning' };
    case '3,3': return { desc: 'befriedigend', color: 'warning' };
    case '3,7': return { desc: 'befriedigend', color: 'warning' };
    case '4,0': return { desc: 'ausreichend', color: 'warning' };
    case '5,0': return { desc: 'ungenügend', color: 'danger' };
    case 'b': return { desc: 'bestanden', color: 'success' };
    case 'nb': return { desc: 'nicht bestanden', color: 'danger' };
    default: return { desc: 'sonstiges', color: 'info' };
  }
};

export default convertGrade;
