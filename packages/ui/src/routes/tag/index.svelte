<script lang="ts" context="module">
  import { displayify, slugify } from "$lib/tag";
  import { client, type QueryAwaited } from "$lib/trpc";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch }) => {
    const tags = await client({ fetch }).query("tag.all");
    return { props: { tags } };
  };
</script>

<script lang="ts">
  export let tags: QueryAwaited<"tag.all">;
</script>

{#each tags as tag}
  <a
    class="btn btn-sm rounded-pill bg-primary text-light m-1"
    href={"/tag/" + slugify(tag.name, tag.namespace)}
  >
    {displayify(tag.name, tag.namespace)}
    <span class="badge bg-light text-dark">{tag.entriesCount}</span>
  </a>
{/each}
