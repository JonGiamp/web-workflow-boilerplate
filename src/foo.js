// @flow
const concat = (
  a: string,
  b: string,
  c: string = 'bar'
) => `${a} ${b} ${c}`;

export default concat;
