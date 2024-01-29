export function gettingUniqueId(id: string): string {
  const substringLength = 6;
  const startIndex = Math.max(0, Math.floor((id.length - substringLength) / 2));
  const extractedSubstring = id.substring(
    startIndex,
    startIndex + substringLength,
  );
  return extractedSubstring;
}
