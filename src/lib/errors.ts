/**
 * Converts an unknown thrown value into a user-facing message.
 *
 * JavaScript allows throwing any value (not only Error instances), so catch
 * variables should stay `unknown` until they have been narrowed here.
 */
export function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}
