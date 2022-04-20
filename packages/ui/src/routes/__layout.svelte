<script lang="ts" context="module">
  import "bootstrap/dist/css/bootstrap.css";
  import "bootstrap-icons/font/bootstrap-icons.css";
  import { breakpoint } from "$lib/breakpoint";
  import { goto } from "$app/navigation";
</script>

<script lang="ts">
  let value = "";

  function search() {
    if (value) goto("/tag?q=" + value);
  }
</script>

<nav class="nav sticky-top bg-light align-items-center">
  <a class="nav-link align-baseline" href="/">Home</a>
  <a class="nav-link" href="/tag">Tags</a>
  <a class="nav-link" href="/stash">Stash</a>
  <form
    class="d-flex align-items-center mx-3 gap-1"
    on:submit|preventDefault={search}
  >
    <input
      class="form-control form-control-sm"
      type="search"
      placeholder="Search"
      bind:value
    />
    <button class="btn btn-sm bg-primary text-light" type="submit">
      <i class="icon bi-search" />
    </button>
    {value}
  </form>
</nav>
<!-- 
  Use margin for y so they will collapse
  Use padding for x so gutters aren't messed up
 -->
<main class="container-fluid my-3" class:px-4={$breakpoint.sm}>
  <slot />
</main>
