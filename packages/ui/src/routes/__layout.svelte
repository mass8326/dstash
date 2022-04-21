<script lang="ts" context="module">
  import "../app.css";
  import { breakpoint } from "$lib/breakpoint";
  import { goto } from "$app/navigation";
</script>

<script lang="ts">
  let value = "";

  function search() {
    if (value) goto("/tag?q=" + value);
  }
</script>

<div class="tw-sticky-top align-items-center tw-border-b tw-border-slate-300">
  <!-- Limit width -->
  <div class="tw-max-w-xl tw-mx-auto">
    <div class="tw-flex tw-items-center tw-gap-2 tw-p-2">
      <a class="tw-inline-block tw-p-1 tw-shrink-0" href="/">
        <img class="tw-h-7 tw-w-full" src="/favicon.png" alt="Logo" />
      </a>
      <form
        class="tw-flex tw-justify-between tw-items-center tw-gap-1 tw-grow tw-border tw-rounded-lg tw-py-1 tw-px-2
        focus-within:tw-outline focus-within:tw-outline-blue-600 focus-within:tw-outline-2"
        on:submit|preventDefault={search}
      >
        <button class="tw-shrink-0">
          <i class="bi-search tw-pr-1 tw-text-gray-400" />
        </button>
        <input
          class="tw-outline-none tw-grow tw-shrink-0"
          placeholder="Search"
          type="search"
          bind:value
        />
      </form>
      <a
        class="tw-inline-block tw-p-2 tw-bg-slate-100 tw-rounded-md tw-text-sm"
        href="/tag">Tags</a
      >
      <a
        class="tw-inline-block tw-p-2 tw-bg-slate-100 tw-rounded-md tw-text-sm"
        href="/stash">Stash</a
      >
    </div>
  </div>
</div>
<!-- 
  Use margin for y so they will collapse
  Use padding for x so gutters aren't messed up
 -->
<main class="container-fluid my-3" class:px-4={$breakpoint.sm}>
  <slot />
</main>
