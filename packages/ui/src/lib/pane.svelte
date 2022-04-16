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
</script>

{#if $breakpoint.sm}
  <div class="row">
    <Pagination cls="col px-0 mx-2" {pages} {page} {limit} />
    <Actions cls="col px-0 justify-content-end" bind:size {page} {limit} />
  </div>
{:else}
  <div class="row py-1">
    <Pagination cls="justify-content-center" {pages} {page} {limit} />
  </div>
  <div class="row py-1">
    <Actions cls="justify-content-center" bind:size {page} {limit} />
  </div>
{/if}
