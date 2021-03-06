import type { ListIteratee, Many } from "lodash";
import { orderBy } from "lodash-es";

/** @deprecated Import from dstash-util instead */
export type TagParse = {
  namespace?: string;
  name: string;
  count?: number;
};

/** @deprecated Import from dstash-util instead */
export function orderTags<T extends TagParse>(
  input: T[],
  first: "namespaced" | "tagonly" = "namespaced",
  iteratees: Many<ListIteratee<T>> = ["namespace", "name"],
  orders: Many<boolean | "asc" | "desc"> = ["asc", "asc"]
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
/** @deprecated Import from dstash-util instead */
export function displayify(name: string, namespace?: string): string {
  return (namespace ? namespace + ":" : "") + name;
}
/** @deprecated Import from dstash-util instead */
export function undisplayify(display: string): TagParse | null {
  const arr = display.split(":");
  if (![1, 2].includes(arr.length)) return null;
  return { name: arr[0], namespace: arr[1] };
}

// Slug
/** @deprecated Import from dstash-util instead */
export function slugify(name: string, namespace?: string): string {
  namespace = namespace?.replace(" ", "_");
  name = name.replace(" ", "_");
  return (namespace ? namespace + "." : "") + name;
}
/** @deprecated Import from dstash-util instead */
export function unslugify(slug: string): TagParse | null {
  const arr = slug.split(".").map((str) => str.replace("_", " "));
  if (![1, 2].includes(arr.length)) return null;
  return { name: arr[0], namespace: arr[1] };
}
