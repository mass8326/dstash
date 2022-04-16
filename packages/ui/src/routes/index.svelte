<script lang="ts" context="module">
  import List, { loadFactory } from "$lib/list.svelte";
  import type { QueryAwaited } from "$lib/trpc";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = loadFactory(1);
</script>

<script lang="ts">
  export let entries: QueryAwaited<"entry.page">[0];
  export let count: number;
  export let page: number;
</script>

<List {entries} {count} limit={20} {page} />
