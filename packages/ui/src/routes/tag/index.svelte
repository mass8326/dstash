<script lang="ts" context="module">
  import { client, type QueryAwaited } from "$lib/trpc";
  import type { Load } from "@sveltejs/kit";
  import Tag from "$lib/component/tag.svelte";
  import { sortBy } from "lodash-es";

  export const load: Load = async ({ fetch, url }) => {
    const query = url.searchParams.get("q");
    const tags = query
      ? await client({ fetch }).query("tag.search", query)
      : await client({ fetch }).query("tag.all");
    return { props: { tags } };
  };
</script>

<script lang="ts">
  export let tags: QueryAwaited<"tag.all">;
</script>

<div class="row">
  <div class="col">
    {#if !tags.length}<p>No tags found!</p>{/if}
    {#each sortBy(tags, "count").reverse() as { name, namespace, count }}
      <Tag {name} {namespace} {count} />
    {/each}
  </div>
</div>
