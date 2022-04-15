<script lang="ts" context="module">
  import { client } from "$lib/trpc";
  import Pagination from "$lib/pagination.svelte";
  import Size from "$lib/size.svelte";
</script>

<script lang="ts">
  // Props
  export let pages: number;
  export let page: number;
  // Exports
  export let size: number;

  async function consume() {
    await client().mutation("stash.consume");
    location.reload();
  }
</script>

<div class="row">
  <div class="col">
    <Pagination {pages} {page} />
  </div>
  <div class="col d-flex align-items-center justify-content-end">
    <button class="btn btn-sm btn-primary mx-2" on:click={consume}>
      Consume Dropoff Folder
    </button>
    <Size bind:size />
  </div>
</div>
