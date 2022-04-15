<script lang="ts" context="module">
  import { client, type QueryAwaited } from "$lib/trpc";
  import Pane from "$lib/pane.svelte";
  import Item from "$lib/item.svelte";
</script>

<script lang="ts">
  // Props
  export let page = 1;
  // Binds
  let pages: number;
  let size: number;
  // State
  let entries: QueryAwaited<"entry.all"> = [];
  let loading = false;

  $: init(page);
  async function init(page: number) {
    if (page < 1) return;
    loading = true;
    const [response, count] = await client().query("entry.page", {
      limit: 20,
      offset: 20 * (page - 1),
    });
    entries = response;
    pages = Math.floor(count / 20) + 1;
    loading = false;
  }
</script>

<Pane bind:size {pages} {page} />
<div class="container-fluid">
  <div class="row">
    {#if !loading && entries.length === 0}
      <p>No entries found!</p>
    {/if}
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
  </div>
</div>
<Pane bind:size {pages} {page} />

<style lang="scss">
  .list {
    display: grid;
    padding: 0;
    grid-template-columns: repeat(
      auto-fit,
      minmax(var(--icon-size, 240px), 1fr)
    );
  }
</style>
