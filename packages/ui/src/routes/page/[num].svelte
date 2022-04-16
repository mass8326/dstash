<script lang="ts" context="module">
  import List, { loadFactory } from "$lib/list.svelte";
  import type { QueryAwaited } from "$lib/trpc";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async (input) => {
    const pageInt = parseInt(input.params.num);
    const page = Number.isNaN(pageInt) || pageInt < 1 ? 1 : pageInt;
    return loadFactory(page)(input);
  };
</script>

<script lang="ts">
  export let entries: QueryAwaited<"entry.page">[0];
  export let count: number;
  export let page: number;
</script>

<List {entries} {count} limit={20} {page} />
