<script lang="ts" context="module">
  import Size from "$lib/size.svelte";

  export const defaultLimit = 25;
  export function parseLimit(params: URLSearchParams) {
    const raw = params.get("lim");
    const int = raw ? parseInt(raw) : NaN;
    return Number.isNaN(int) ? undefined : int;
  }
</script>

<script lang="ts">
  export let cls = "";
  export let page: number;
  export let size: number;
  export let limit: number;
  export let base: string;

  const limits = [25, 50, 100];
  $: link = function (lim: number) {
    const offset = (page - 1) * limit + 1;
    const target = Math.ceil(offset / lim) || 1;
    const append = lim === defaultLimit ? "" : `?lim=${lim}`;
    return `${base}/${target}${append}`;
  };
</script>

<div class={"d-flex align-items-center " + cls}>
  <div class={"btn-group " + cls}>
    {#each limits as lim}
      <a
        class="btn btn-sm btn-primary flex-grow-0"
        class:active={limit === lim}
        href={limit === lim ? "#" : link(lim)}
      >
        {lim}
      </a>
    {/each}
  </div>
  <Size cls="mx-2 text-nowrap" bind:size />
</div>
