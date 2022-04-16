<script lang="ts" context="module">
  import { breakpoint } from "./breakpoint";
</script>

<script lang="ts">
  export let cls = "";
  export let pages = 0;
  export let page = 0;
  export let limit: number;

  $: arr = [...Array(5).keys()]
    .map((int) => int + page - 2)
    .filter((int) => int > 0 && int <= pages);

  function link(num: number, limit: number) {
    return `/page/${num}` + (limit && limit !== 25 ? `?lim=${limit}` : "");
  }
</script>

<div class={"pagination px-0 text-nowrap " + cls}>
  <li class="page-item" class:disabled={page <= 1 || pages === 0}>
    <a class="page-link" href={link(1, limit)} aria-label="First">
      <span aria-hidden="true">&laquo</span>
      {#if $breakpoint.md}First{/if}
    </a>
  </li>
  <li class="page-item" class:disabled={page <= 1 || pages === 0}>
    <a class="page-link" href={link(page - 1, limit)} aria-label="Previous">
      <span aria-hidden="true">&lsaquo</span>
      {#if $breakpoint.md}Prev{/if}
    </a>
  </li>
  {#each arr as num}
    <li class="page-item" class:active={page === num}>
      <a class="page-link" href={link(num, limit)}>{num}</a>
    </li>
  {/each}
  <li class="page-item" class:disabled={page >= pages || pages === 0}>
    <a class="page-link" href={link(page + 1, limit)} aria-label="Next">
      {#if $breakpoint.md}Next{/if}
      <span aria-hidden="true">&rsaquo;</span>
    </a>
  </li>
  <li class="page-item" class:disabled={page >= pages || pages === 0}>
    <a class="page-link" href={link(pages, limit)} aria-label="Last">
      {#if $breakpoint.md}Last{/if}
      <span aria-hidden="true">&raquo;</span>
    </a>
  </li>
</div>
