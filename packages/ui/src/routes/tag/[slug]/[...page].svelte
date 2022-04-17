<script lang="ts" context="module">
  import List from "$lib/list.svelte";
  import { client, type QueryAwaited } from "$lib/trpc";
  import { page as route } from "$app/stores";
  import { unslugify } from "$lib/tag";
  import type { Load } from "@sveltejs/kit";
  import { parsePage } from "$lib/pagination.svelte";
  import { defaultLimit, parseLimit } from "$lib/actions.svelte";
  import Tag from "$lib/component/tag.svelte";
  import { RejectedNullError, rejectNull } from "$lib/util";

  export const load: Load = async ({ params, url, fetch }) => {
    const page = parsePage(params.page);
    if (!page) return { status: 400, error: "Page malformed" };
    const { namespace, name } = unslugify(params.slug) ?? {};
    if (!name) return { status: 400, error: "Tag malformed" };
    const tag = [namespace ?? "", name] as [string, string];
    const limit = parseLimit(url.searchParams) ?? defaultLimit;
    try {
      const result = await client({ fetch })
        .query("tag.entries", { tag, limit, offset: limit * (page - 1) })
        .then(rejectNull);
      const [entries, count] = result;
      return { props: { entries, count, page, namespace, name, limit } };
    } catch (e) {
      if (!(e instanceof RejectedNullError)) throw e;
      return { status: 404, error: "Tag was not found" };
    }
  };
</script>

<script lang="ts">
  export let entries: QueryAwaited<"entry.page">[0];
  export let count: number;
  export let page: number;
  export let limit: number;
  export let name: string;
  export let namespace: string | undefined;
</script>

<Tag {name} {namespace} {count} />
<List {entries} {count} {limit} {page} base={`/tag/${$route.params.slug}`} />
