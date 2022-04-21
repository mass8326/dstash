<script lang="ts" context="module">
  import Pagination from "$lib/pagination.svelte";
  import Actions from "$lib/actions.svelte";
</script>

<script lang="ts">
  export let pages: number;
  export let page: number;
  export let size: number;
  export let limit: number;
  export let base: string;
</script>

<div class="tw-my-4 tw-grid tw-mx-auto tw-grid-rows-2 tw-justify-center tw-gap-3 sm:tw-flex sm:tw-justify-between">
  <Pagination {pages} {page} {limit} {base} />
  <Actions bind:size {page} {limit} {base} />
</div>
