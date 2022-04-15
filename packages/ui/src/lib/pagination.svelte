<script lang="ts">
  export let pages = 0;
  export let page = 0;
</script>

<div class="pagination">
  <li class="page-item" class:disabled={page <= 1 || pages === 0}>
    <a class="page-link" href="/page/1" aria-label="First">
      <span aria-hidden="true">&laquo</span>
    </a>
  </li>
  <li class="page-item" class:disabled={page <= 1 || pages === 0}>
    <a class="page-link" href={`/page/${page - 1}`} aria-label="Previous">
      <span aria-hidden="true">&lsaquo</span>
    </a>
  </li>
  {#each Array(pages) as _, index}
    <li class="page-item" class:active={page === index + 1}>
      <a class="page-link" href={`/page/${index + 1}`}>{index + 1}</a>
    </li>
  {/each}
  <li class="page-item" class:disabled={page >= pages || pages === 0}>
    <a class="page-link" href={`/page/${page + 1}`} aria-label="Next">
      <span aria-hidden="true">&rsaquo;</span>
    </a>
  </li>
  <li class="page-item" class:disabled={page >= pages || pages === 0}>
    <a class="page-link" href={`/page/${pages}`} aria-label="Last">
      <span aria-hidden="true">&raquo;</span>
    </a>
  </li>
</div>
