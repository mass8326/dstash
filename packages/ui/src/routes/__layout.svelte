<script lang="ts" context="module">
  import "bootstrap/dist/css/bootstrap.min.css";
  import { client } from "$lib/trpc";
</script>

<script lang="ts">
  async function consume() {
    await client().mutation("stash.consume");
    location.reload();
  }
</script>

<nav class="nav fixed-top bg-light">
  <a class="nav-link" href="/">Home</a>
  <a class="nav-link" href="/tag">Tags</a>
  <span class="nav-link justify" role="button" on:click={consume}>
    Consume
  </span>
</nav>
<div class="container-fluid pt-5">
  <slot />
</div>

<style>
  :global(body) {
    margin: 0.5em !important;
  }
</style>
