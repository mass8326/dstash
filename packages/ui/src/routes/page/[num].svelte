<script lang="ts" context="module">
  import List, { loadFactory } from "$lib/list.svelte";
  import type { QueryAwaited } from "$lib/trpc";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async (input) => {
    const pageInt = parseInt(input.params.num);
    const page = Number.isNaN(pageInt) || pageInt < 1 ? 1 : pageInt;
    const limRaw = input.url.searchParams.get("lim");
    const limInt = limRaw ? parseInt(limRaw) : NaN;
    const lim = Number.isNaN(limInt) ? undefined : limInt;
    return loadFactory(page, lim)(input);
  };
</script>

<script lang="ts">
  export let entries: QueryAwaited<"entry.page">[0];
  export let count: number;
  export let page: number;
  export let limit: number;
</script>

<List {entries} {count} {limit} {page} />
