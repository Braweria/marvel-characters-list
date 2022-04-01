export const imageNotAvailableRegex = /image_not_available/iu;

export function checkIfImageIsAvailable (url: string): boolean {
  return !imageNotAvailableRegex.test(url);
}