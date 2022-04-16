<script lang="ts" context="module">
  import { client } from "$lib/trpc";
  import Size from "$lib/size.svelte";
  import { breakpoint } from "./breakpoint";
</script>

<script lang="ts">
  export let cls = "";
  export let size: number;
  async function consume() {
    await client().mutation("stash.consume");
    location.reload();
  }
</script>

<div class={"d-flex align-items-center " + cls}>
  <a class="mx-2 text-nowrap" href="/tag">
    <button class="btn btn-sm btn-primary">
      {#if $breakpoint.sm}
        View All Tags
      {:else}
        All Tags
      {/if}
    </button>
  </a>
  <button class="mx-2 text-nowrap btn btn-sm btn-primary" on:click={consume}>
    {#if $breakpoint.sm}
      Consume Dropoff
    {:else}
      Consume
    {/if}
  </button>
  <Size cls="mx-2 text-nowrap" bind:size />
</div>
