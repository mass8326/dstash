<script lang="ts" context="module">
  import Pane from "$lib/pane.svelte";
  import Item from "$lib/item.svelte";
  import type { Load } from "@sveltejs/kit";
  import { client, type QueryAwaited } from "$lib/trpc";

  export function loadFactory(page: number): Load {
    return async function load({ fetch }) {
      const response = await client({ fetch }).query("entry.page", {
        limit: 20,
        offset: 20 * (page - 1),
      });
      const entries = response[0];
      const count = response[1];
      return { props: { entries, count, page } };
    };
  }
</script>

<script lang="ts">
  // Props
  export let entries: QueryAwaited<"entry.all"> = [];
  export let limit: number;
  export let count: number;
  export let page = 1;
  $: pages = Math.ceil(count / limit);

  // Binds
  let size: number;
</script>

<div class="container-fluid min-sm">
  <Pane bind:size {pages} {page} />
  <div class="row">
    {#if entries.length === 0}
      <p>No entries found!</p>
    {/if}
    {#if size}
      <div class="list" style={`--icon-size:${size}px`}>
        {#each entries as entry}
          {#key entry.id}
            <Item
              href={`/item/${entry.id}`}
              src={`http://localhost:4000/entry/${entry.id}`}
            />
          {/key}
        {/each}
      </div>
    {/if}
  </div>
  {#if entries.length !== 0 && size}
    <Pane bind:size {pages} {page} />
  {/if}
</div>

<style lang="scss">
  .list {
    display: grid;
    padding: 0;
    grid-template-columns: repeat(
      auto-fit,
      minmax(var(--icon-size, 200px), 1fr)
    );
  }
</style>
