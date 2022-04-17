<script lang="ts" context="module">
  import { client, type QueryAwaited } from "$lib/trpc";
  import type { Load } from "@sveltejs/kit";
  import Tag from "$lib/component/tag.svelte";
  import { orderTags, undisplayify, type TagParse } from "$lib/tag";
  import { RejectedNullError, rejectNull } from "$lib/util";

  export const load: Load = async ({ params, fetch }) => {
    const id = parseInt(params.id);
    if (Number.isNaN(id))
      return { status: 400, error: "Item ID must be an integer" };
    try {
      const [item, tags] = await Promise.all([
        client({ fetch }).query("entry.one", id).then(rejectNull),
        client({ fetch }).query("entry.tags", id).then(rejectNull),
      ]);
      return { props: { item, tags: orderTags(tags) } };
    } catch (e) {
      if (!(e instanceof RejectedNullError)) throw e;
      return { status: 404, error: "Item ID was not found" };
    }
  };
</script>

<script lang="ts">
  export let item: NonNullable<QueryAwaited<"entry.one">>;
  export let tags: TagParse[];
  let focused = false;
  let report: HTMLAnchorElement;
  let val = "";
  let width: number;
  $: placeholder = focused ? "" : "Add New Tag";
  $: width = val ? report?.clientWidth : 125;

  // Prevents duplicate enter when attempting to close alert
  $: disable = false && val;
  async function submit() {
    if (disable) return;
    disable = true;
    const { name, namespace } = undisplayify(val) ?? {};
    if (!name) return alert("Bad input!");
    const result = await client().mutation("entry.tag-add", {
      id: item.id,
      tag: [namespace ?? "", name],
    });
    if (result === null) return alert("Could not add tag!");
    if (result === undefined) return alert("Entry already has tag!");
    tags = [...tags, result];
    val = "";
  }
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
    {#each tags as { name, namespace, count }}
      <Tag {name} {namespace} {count} />
    {/each}
    <input
      class="btn-sm rounded-pill border border-1 border bg-light m-1 text-center text-nowrap align-middle"
      type="text"
      {placeholder}
      bind:value={val}
      on:focus={() => (focused = true)}
      on:blur={() => (focused = false)}
      on:keyup={(e) => e.key === "Enter" && submit()}
      style:width={width + 20 + "px"}
    />
  </div>
</div>
<div class="hide">
  <Tag bind:report name={val} />
</div>

<style>
  img {
    min-width: 200px;
    max-width: 100%;
    max-height: 80vh;
  }
  .hide {
    visibility: hidden;
  }
</style>
