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
  let editing = false;
  let focused = false;
  let report: HTMLAnchorElement;
  let width: number;

  $: placeholder = focused ? "" : "+ Add New Tag";
  $: width = val ? report?.clientWidth + 16 : 125; // 16px from padding

  // Prevents duplicate enter when attempting to close alert
  // Reset to false when val or checked changes
  $: disable = false && val && checked;

  let val = "";
  async function add() {
    if (disable) return;
    disable = true;
    const { name, namespace } = undisplayify(val) ?? {};
    if (!name) return alert("Bad input!");
    const result = await client().mutation("entry.tag-edit", {
      id: item.id,
      add: [[namespace ?? "", name]],
    });
    if (!result) return alert("Could not edit tags!");
    tags = orderTags(result);
    val = "";
  }

  let checked: boolean[] = [];
  async function del() {
    if (disable) return;
    disable = true;
    const result = await client().mutation("entry.tag-edit", {
      id: item.id,
      del: tags
        .filter((_, index) => checked[index])
        .map(
          ({ namespace, name }) => [namespace ?? "", name] as [string, string]
        ),
    });
    if (!result) return alert("Could not edit tags!");
    tags = orderTags(result);
    checked = Array(tags.length).fill(false);
    editing = false;
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
  <!-- Flex to avoid whitespaces inconsistently taking space between each tag-->
  <div
    class="col text-center d-flex flex-wrap justify-content-center align-items-center"
  >
    {#if !editing}
      <button
        class="btn-sm rounded-pill border border-1 border m-1 text-center text-nowrap align-middle bg-light text-black-50"
        type="button"
        on:click={() => (editing = true)}
      >
        Delete Tags
      </button>
    {:else}
      <button
        class="btn-sm rounded-pill border border-1 border m-1 text-center text-nowrap align-middle bg-light text-black-50"
        type="button"
        on:click={() => (editing = false)}
      >
        Exit (No Save)
      </button>
      <button
        class="btn-sm rounded-pill border border-1 border m-1 text-center text-nowrap align-middle bg-danger text-white border-0"
        type="button"
        on:click={del}
      >
        Delete Selected
      </button>
    {/if}
    {#each tags as { name, namespace, count }, index}
      <Tag
        bind:checked={checked[index]}
        mode={editing ? "check" : "tag"}
        {namespace}
        {name}
        {count}
      />
    {/each}
    <input
      class="btn-sm rounded-pill border border-1 border bg-light m-1 text-center text-nowrap align-middle"
      type="text"
      {placeholder}
      bind:value={val}
      on:focus={() => (focused = true)}
      on:blur={() => (focused = false)}
      on:keyup={(e) => e.key === "Enter" && add()}
      style:width={width + "px"}
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
