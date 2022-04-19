<script lang="ts" context="module">
  import { displayify, slugify } from "$lib/tag";
</script>

<script lang="ts">
  // Styling
  export let cls = "";
  // Data
  export let count: string | number = "";
  export let namespace: string | undefined = undefined;
  export let name: string;
  // Feedback
  export let mode: "check" | "tag" = "tag";
  export let checked = false;
  export let report: Element | undefined = undefined;

  $: type = mode === "check" ? "label" : "a";
</script>

<!-- eslint + svelte doesn't support svelte:element yet, use --no-verify -->
<svelte:element
  this={type}
  bind:this={report}
  class={"btn btn-sm rounded-pill bg-primary text-light m-1 text-nowrap " + cls}
  href={"/tag/" + slugify(name, namespace)}
>
  {#if mode === "check"}
    <input type="checkbox" bind:checked value={slugify(name, namespace)} />
  {/if}
  {displayify(name, namespace)}
  {#if count}
    <span class="badge bg-light text-dark">{count}</span>
  {/if}
</svelte:element>
