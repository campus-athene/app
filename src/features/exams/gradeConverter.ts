const convertGrade = (grade: string) => {
  switch (grade) {
    case '1,0':
      return { desc: 'sehr gut', hexColor: '#87ff82' };
    case '1,3':
      return { desc: 'sehr gut', hexColor: '#99ff82' };
    case '1,7':
      return { desc: 'gut', hexColor: '#c5ff61' };
    case '2,0':
      return { desc: 'gut', hexColor: '#d2ff61' };
    case '2,3':
      return { desc: 'gut', hexColor: '#dfff61' };
    case '2,7':
      return { desc: 'befriedigend', hexColor: '#fffc54' };
    case '3,0':
      return { desc: 'befriedigend', hexColor: '#ffee54' };
    case '3,3':
      return { desc: 'befriedigend', hexColor: '#ffe054' };
    case '3,7':
      return { desc: 'ausreichend', hexColor: '#ffb273' };
    case '4,0':
      return { desc: 'ausreichend', hexColor: '#ffa673' };
    // Official is "nicht ausreichend" for Prüfungen and Studienleistungen
    // and "nicht bestanden" for Module
    case '5,0':
      return { desc: 'ungenügend', hexColor: '#ff737c' };
    case 'b':
      return { desc: 'bestanden', hexColor: '#87ff82' };
    case 'nb':
      return { desc: 'nicht bestanden', hexColor: '#ff737c' };
    default:
      return { desc: 'sonstiges', hexColor: '#d1d1d1' };
  }
};

export default convertGrade;
