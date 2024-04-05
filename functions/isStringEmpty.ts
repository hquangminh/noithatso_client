export default function isStringEmpty(str: string = '') {
  return typeof str !== 'string' || str.length === 0 || str.trim().length === 0;
}
