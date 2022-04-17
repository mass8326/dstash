<script lang="ts" context="module">
  import { displayify, slugify } from "$lib/tag";
</script>

<script lang="ts">
  export let cls = "";
  export let count: string | number = "";
  export let namespace: string | undefined = undefined;
  export let name: string;
  export let report: HTMLAnchorElement | undefined = undefined;
</script>

<a
  bind:this={report}
  class={"btn btn-sm rounded-pill bg-primary text-light m-1 text-nowrap " + cls}
  href={"/tag/" + slugify(name, namespace)}
>
  {displayify(name, namespace)}
  {#if count}
    <span class="badge bg-light text-dark">{count}</span>
  {/if}
</a>
