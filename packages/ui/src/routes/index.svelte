<script lang="ts" context="module">
  import { defaultLimit, parseLimit } from "$lib/actions.svelte";
  import List from "$lib/list.svelte";
  import { client, type QueryAwaited } from "$lib/trpc";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, url }) => {
    const limit = parseLimit(url.searchParams) ?? defaultLimit;
    const [entries, count] = await client({ fetch }).query("entry.page", {
      limit,
      offset: 0,
    });
    return { props: { entries, count, limit, page: 1 } };
  };
</script>

<script lang="ts">
  export let entries: QueryAwaited<"entry.page">[0];
  export let count: number;
  export let page: number;
  export let limit: number;
</script>

<List {entries} {count} {limit} {page} base="/page" />
