const log = input => input;

log(7 ** 9);

const test = (a, b, c) => log(a * b * c);
test(1, 2, 8);
const t = (
  blabla,
  bloblo,
  blibli,
) => blabla + bloblo + blibli;
test(t(1, 3, 4));

export default log;
