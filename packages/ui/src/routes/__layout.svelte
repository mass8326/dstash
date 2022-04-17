<script lang="ts" context="module">
  import "bootstrap/dist/css/bootstrap.min.css";
  import { client } from "$lib/trpc";
  import { breakpoint } from "$lib/breakpoint";
</script>

<script lang="ts">
  async function consume() {
    await client().mutation("stash.consume");
    location.reload();
  }
</script>

<nav class="nav sticky-top bg-light">
  <a class="nav-link" href="/">Home</a>
  <a class="nav-link" href="/tag">Tags</a>
  <span class="nav-link justify" role="button" on:click={consume}>
    Consume
  </span>
</nav>
<!-- 
  Use margin for y so they will collapse
  Use padding for x so gutters aren't messed up
 -->
<main class="container-fluid my-3" class:px-4={$breakpoint.sm}>
  <slot />
</main>
