<script lang="ts" context="module">
  import { client, type QueryAwaited } from "$lib/trpc";
  import type { Load } from "@sveltejs/kit";
  import Tag from "$lib/component/tag.svelte";
  import { orderTags } from "$lib/tag";

  class RejectedNullError extends Error {}
  function rejectNull<T>(data: T | null) {
    return data === null ? Promise.reject(new RejectedNullError()) : data;
  }

  export const load: Load = async ({ params, fetch }) => {
    const id = parseInt(params.id);
    if (Number.isNaN(id))
      return { status: 400, error: "Item ID must be an integer" };
    try {
      const [item, tags] = await Promise.all([
        client({ fetch }).query("entry.one", id).then(rejectNull),
        client({ fetch }).query("entry.tags", id).then(rejectNull),
      ]);
      return { props: { item, tags } };
    } catch (e) {
      if (e instanceof RejectedNullError)
        return { status: 404, error: "Item ID was not found" };
      throw e;
    }
  };
</script>

<script lang="ts">
  export let item: NonNullable<QueryAwaited<"entry.one">>;
  export let tags: NonNullable<QueryAwaited<"entry.tags">>;
</script>

<div class="row my-3">
  <div class="col text-center">
    #{item.id} ({item.hash.slice(0, 7)})
  </div>
</div>
<div class="row my-3">
  <div class="col text-center">
    <img src={`http://localhost:4000/entry/${item.id}`} alt="" />
  </div>
</div>
<div class="row my-3">
  <div class="col text-center">
    {#each orderTags( tags, "namespaced", ["namespace", "name"] ) as { name, namespace, count }}
      <Tag {name} {namespace} {count} />
    {/each}
  </div>
</div>

<style>
  img {
    min-width: 200px;
    max-width: 100%;
    max-height: 80vh;
  }
</style>
