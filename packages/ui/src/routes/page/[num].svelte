<script lang="ts" context="module">
  import { defaultLimit, parseLimit } from "$lib/actions.svelte";
  import { client, type QueryAwaited } from "$lib/trpc";
  import List from "$lib/list.svelte";
  import { parsePage } from "$lib/pagination.svelte";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ params, url, fetch }) => {
    const page = parsePage(params.num) ?? 1;
    const limit = parseLimit(url.searchParams) ?? defaultLimit;
    const [entries, count] = await client({ fetch }).query("entry.page", {
      limit,
      offset: limit * (page - 1),
    });
    return { props: { entries, count, page, limit } };
  };
</script>

<script lang="ts">
  export let entries: QueryAwaited<"entry.page">[0];
  export let count: number;
  export let page: number;
  export let limit: number;
</script>

<List {entries} {count} {limit} {page} base="/page" />
