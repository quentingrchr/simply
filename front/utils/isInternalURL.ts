export default function isInternalURL(to: string) :boolean {
  return to.startsWith('/');
}
