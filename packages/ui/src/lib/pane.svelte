<script lang="ts" context="module">
  import Pagination from "$lib/pagination.svelte";
  import Actions from "$lib/actions.svelte";
  import { breakpoint } from "./breakpoint";
</script>

<script lang="ts">
  export let pages: number;
  export let page: number;
  export let size: number;
  export let limit: number;
  export let base: string;
</script>

{#if $breakpoint.sm}
  <div class="row my-3">
    <Pagination cls="col px-0 mx-2" {pages} {page} {limit} {base} />
    <Actions
      cls="col px-0 justify-content-end"
      bind:size
      {page}
      {limit}
      {base}
    />
  </div>
{:else}
  <div class="row my-2">
    <Pagination cls="justify-content-center" {pages} {page} {limit} {base} />
  </div>
  <div class="row my-2">
    <Actions cls="justify-content-center" bind:size {page} {limit} {base} />
  </div>
{/if}
