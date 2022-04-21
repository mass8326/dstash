<script lang="ts" context="module">
  import * as util from "dstash-util";
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
  class="btn btn-sm btn-primary tw-rounded-full tw-m-1"
  href={"/tag/" + util.tag.slugify(name, namespace)}
>
  {#if mode === "check"}
    <input
      type="checkbox"
      bind:checked
      value={util.tag.slugify(name, namespace)}
    />
  {/if}
  {util.tag.displayify(name, namespace)}
  {#if count != null}
    <span class="badge bg-light text-dark">{count}</span>
  {/if}
</svelte:element>
