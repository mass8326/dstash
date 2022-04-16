<script lang="ts" context="module">
  import { breakpoint } from "./breakpoint";
</script>

<script lang="ts">
  export let cls = "";
  export let pages = 0;
  export let page = 0;
  $: arr = [...Array(5).keys()]
    .map((int) => int + page - 2)
    .filter((int) => int > 0 && int <= pages);
</script>

<div class={"pagination " + cls}>
  <li class="page-item" class:disabled={page <= 1 || pages === 0}>
    <a class="page-link" href="/page/1" aria-label="First">
      <span aria-hidden="true">&laquo</span>
      {#if $breakpoint.lg || $breakpoint._sm}First{/if}
    </a>
  </li>
  <li class="page-item" class:disabled={page <= 1 || pages === 0}>
    <a class="page-link" href={`/page/${page - 1}`} aria-label="Previous">
      <span aria-hidden="true">&lsaquo</span>
      {#if $breakpoint.lg || $breakpoint._sm}Prev{/if}
    </a>
  </li>
  {#each arr as num}
    <li class="page-item" class:active={page === num}>
      <a class="page-link" href={`/page/${num}`}>{num}</a>
    </li>
  {/each}
  <li class="page-item" class:disabled={page >= pages || pages === 0}>
    <a class="page-link" href={`/page/${page + 1}`} aria-label="Next">
      {#if $breakpoint.lg || $breakpoint._sm}Next{/if}
      <span aria-hidden="true">&rsaquo;</span>
    </a>
  </li>
  <li class="page-item" class:disabled={page >= pages || pages === 0}>
    <a class="page-link" href={`/page/${pages}`} aria-label="Last">
      {#if $breakpoint.lg || $breakpoint._sm}Last{/if}
      <span aria-hidden="true">&raquo;</span>
    </a>
  </li>
</div>
