<script lang="ts" context="module">
  import Pane from "$lib/pane.svelte";
  import Item from "$lib/item.svelte";
  import type { QueryAwaited } from "$lib/trpc";
</script>

<script lang="ts">
  // Props
  export let entries: QueryAwaited<"entry.all"> = [];
  export let limit: number;
  export let count: number;
  export let page = 1;
  export let base: string;
  $: pages = Math.ceil(count / limit);

  // Binds
  let size: number;
</script>

<Pane bind:size {pages} {page} {limit} {base} />
<div class="row">
  {#if entries.length === 0}
    <p>No entries found!</p>
  {/if}
  {#if size}
    <div style={`--icon-size:${size}px`} class="list p-0 sm:tw-gap-3">
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
  <Pane bind:size {pages} {page} {limit} {base} />
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
