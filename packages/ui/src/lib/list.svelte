<script lang="ts" context="module">
  import Pane from "$lib/pane.svelte";
  import Item from "$lib/item.svelte";
  import type { Load } from "@sveltejs/kit";
  import { client, type QueryAwaited } from "$lib/trpc";
  import { breakpoint } from "./breakpoint";

  export function loadFactory(page = 1, limit = 25): Load {
    return async function load({ fetch }) {
      const response = await client({ fetch }).query("entry.page", {
        limit,
        offset: limit * (page - 1),
      });
      const entries = response[0];
      const count = response[1];
      return { props: { entries, count, page, limit } };
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

<Pane bind:size {pages} {page} {limit} />
<div class="row">
  {#if entries.length === 0}
    <p>No entries found!</p>
  {/if}
  {#if size}
    <div
      class="list p-0"
      class:gapped={$breakpoint.sm}
      style={`--icon-size:${size}px`}
    >
      {#each entries as entry}
        {#key entry.id}
          <Item
            cls={$breakpoint.sm ? "item-border" : ""}
            href={`/item/${entry.id}`}
            src={`http://localhost:4000/entry/${entry.id}`}
          />
        {/key}
      {/each}
    </div>
  {/if}
</div>
{#if entries.length !== 0 && size}
  <Pane bind:size {pages} {page} {limit} />
{/if}

<style lang="scss">
  .list {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(var(--icon-size, 200px), 1fr)
    );
  }
  .gapped {
    column-gap: 1em;
    row-gap: 1em;
  }
</style>
