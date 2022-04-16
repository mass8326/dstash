<script lang="ts" context="module">
  import Size from "$lib/size.svelte";
</script>

<script lang="ts">
  export let cls = "";
  export let page: number;
  export let size: number;
  export let limit: number;

  const limits = [25, 50, 100];
  function link(page: number, update: number) {
    const offset = (page - 1) * limit + 1;
    const target = Math.ceil(offset / update) || 1;
    return "/page/" + target + "?lim=" + update;
  }
</script>

<div class={"d-flex align-items-center " + cls}>
  <div class={"btn-group " + cls}>
    {#each limits as num}
      <a
        class="btn btn-sm btn-primary flex-grow-0"
        class:active={limit === num}
        href={limit === num ? "#" : link(page, num)}
      >
        {num}
      </a>
    {/each}
  </div>
  <Size cls="mx-2 text-nowrap" bind:size />
</div>
