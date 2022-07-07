export default function splitIntoSpan(string: string): string {
  let fragment: string = '';
  string.split('').forEach((char, i) => {
    const span = `<span data-index="${i}">${char}</span>`;
    fragment += span;
  });
  return String(fragment);
}