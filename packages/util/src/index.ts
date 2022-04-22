export * as tag from "./tag";

type SuccessTuple<T> = [T, undefined];
type FailureTuple = [undefined, unknown];
type CatchTuple<T> = SuccessTuple<T> | FailureTuple

export function flatcatch<T>(cb: () => Promise<T>): Promise<CatchTuple<T>>;
export function flatcatch<T>(cb: () => T): CatchTuple<T>;
export function flatcatch<T>(
  cb: () => T | Promise<T>
): CatchTuple<T> | Promise<CatchTuple<T>> {
  try {
    const result = cb();
    if (result instanceof Promise) {
      return result
        .then((result): CatchTuple<T> => [result, undefined])
        .catch((err): CatchTuple<T> => [undefined, err]);
    }
    return [result, undefined];
  } catch (e) {
    return [undefined, e];
  }
}
