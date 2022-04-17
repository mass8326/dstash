import { orderBy, type ListIteratee, type Many } from "lodash";

export type TagParse = {
  namespace?: string;
  name: string;
};

export function orderTags<T extends TagParse>(
  input: T[],
  first: "namespaced" | "tagonly",
  iteratees?: Many<ListIteratee<T>>,
  orders?: Many<boolean | "asc" | "desc">
): T[] {
  const both = [[], []] as T[][];
  const [namespaced, tagonly] = both;
  for (const tag of input) (tag.namespace ? namespaced : tagonly).push(tag);
  both.map((tags) => orderBy(tags, iteratees, orders));
  return first === "tagonly"
    ? [...tagonly, ...namespaced]
    : [...namespaced, ...tagonly];
}

// Display
export function displayify(name: string, namespace?: string): string {
  return (namespace ? namespace + ":" : "") + name;
}
export function undisplayify(display: string): TagParse | null {
  const arr = display.split(":");
  if (![1, 2].includes(arr.length)) return null;
  return { name: arr.pop()!, namespace: arr.pop() };
}

// Slug
export function slugify(name: string, namespace?: string): string {
  namespace = namespace?.replace(" ", "_");
  name = name.replace(" ", "_");
  return (namespace ? namespace + "." : "") + name;
}
export function unslugify(slug: string): TagParse | null {
  const arr = slug.split(".").map((str) => str.replace("_", " "));
  if (![1, 2].includes(arr.length)) return null;
  return { name: arr.pop()!, namespace: arr.pop() };
}
