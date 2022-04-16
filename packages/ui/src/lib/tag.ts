export type TagParse = {
  namespace?: string;
  name: string;
};

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
