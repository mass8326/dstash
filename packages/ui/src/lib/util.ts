export class RejectedNullError extends Error {}
export function rejectNull<T>(data: T | null) {
  return data === null ? Promise.reject(new RejectedNullError()) : data;
}
