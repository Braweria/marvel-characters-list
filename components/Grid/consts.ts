export function extractIdFromUris(uris: string[]): number[] {
  return uris.map((uri) => {
    const result = /\d+$/u.exec(uri);
    if (result) {
      return Number(result[0]);
    }
    return -1;
  });
}

export function mapArrayToKeyValue(
  array: Record<string, string>[],
  key: string
): string[] {
  return array.map((item) => item[key]);
}
