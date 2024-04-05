export default function removeHtmlTag(str: string): string {
  return str.replace(/(<([^>]+)>)/gi, '');
}
