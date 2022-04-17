<script lang="ts" context="module">
  import { client, type QueryAwaited } from "$lib/trpc";
  import type { Load } from "@sveltejs/kit";
  import Tag from "$lib/component/tag.svelte";
  import { sortBy } from "lodash";

  export const load: Load = async ({ fetch }) => {
    const tags = await client({ fetch }).query("tag.all");
    return { props: { tags } };
  };
</script>

<script lang="ts">
  export let tags: QueryAwaited<"tag.all">;
</script>

<div class="row">
  <div class="col">
    {#each sortBy(tags, "count").reverse() as { name, namespace, count }}
      <Tag {name} {namespace} {count} />
    {/each}
  </div>
</div>
