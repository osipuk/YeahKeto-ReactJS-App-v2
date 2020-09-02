function getMonths() {
  return [...Array(12).keys()].map(
    month => (month + 1 < 10 ? `0${month + 1}` : month + 1),
  );
}

function getYears(len = 6) {
  const currentYear = new Date().getFullYear() - 2000;
  return [...Array(len).keys()].map(year => year + currentYear);
}

export { getMonths, getYears };
