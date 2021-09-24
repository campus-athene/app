const allSemesters = [
  15024000, 15025000, 15026000, 15036000, 15046000, 15056000, 15066000,
  15076000, 15086000, 15096000, 15106000, 15116000, 15126000, 15136000,
  15146000, 15156000,
];

export const descriptions = {
  // Yes, the first two are irregular.
  15024000: 'Wintersemester 2016 / 2017',
  15025000: 'Sommersemester 2017',
  15026000: 'Wintersemester 2017 / 2018',
  15036000: 'Sommersemester 2018',
  15046000: 'Wintersemester 2018 / 2019',
  15056000: 'Sommersemester 2019',
  15066000: 'Wintersemester 2019 / 2020',
  15076000: 'Sommersemester 2020',
  15086000: 'Wintersemester 2020 / 2021',
  15096000: 'Sommersemester 2021',
  15106000: 'Wintersemester 2021 / 2022',
  15116000: 'Sommersemester 2022',
  15126000: 'Wintersemester 2022 / 2023',
  15136000: 'Sommersemester 2023',
  15146000: 'Wintersemester 2023 / 2024',
  15156000: 'Sommersemester 2024',
};

// Currently we are ignoring timezones assuming semester changes with UTC.

export const getSemester = (date) => {
  const d = date ? new Date(date) : new Date();
  return allSemesters[
    Math.floor((d.getFullYear() - 2017) * 2 + (d.getMonth() + 3) / 6)
  ];
};

// Registration starts one month early.
export const getRegSemester = (date) => {
  const d = date ? new Date(date) : new Date();
  return allSemesters[
    Math.floor((d.getFullYear() - 2017) * 2 + (d.getMonth() + 4) / 6)
  ];
};
