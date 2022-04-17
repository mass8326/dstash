<script lang="ts" context="module">
  import { client, type QueryAwaited } from "$lib/trpc";
  import type { Load } from "@sveltejs/kit";
  import Tag from "$lib/component/tag.svelte";

  export const load: Load = async ({ fetch }) => {
    const tags = await client({ fetch }).query("tag.all");
    return { props: { tags } };
  };
</script>

<script lang="ts">
  export let tags: QueryAwaited<"tag.all">;
</script>

{#each tags as { name, namespace, count }}
  <Tag {name} {namespace} {count} />
{/each}
