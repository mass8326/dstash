<script lang="ts" context="module">
  import "../app.css";
  import { breakpoint } from "$lib/breakpoint";
  import { goto } from "$app/navigation";
  import { client } from "$lib/trpc";
  import type { Load } from "@sveltejs/kit";

  type Collection = { name: string; path: string };
  export const load: Load = async ({ fetch }) => {
    const meta = await client({ fetch }).query("db.list");
    const collections: Collection[] = meta.collections;
    console.log(collections);
    return { props: { collections } };
  };
</script>

<script lang="ts">
  export let collections: Collection[];
  $: console.log(collections);
  let select = collections[0].path;
  let input = "";

  function search() {
    if (input) goto("/tag?q=" + input);
  }
  async function change() {
    await client().mutation("db.reconnect", select);
  }
  async function add() {
    const name = prompt("Name");
    if (!name) return;
    const path = prompt("Path");
    if (!path) return;
    collections = await client().mutation("db.add", { name, path });
  }
  async function del() {
    const name = prompt("Name");
    console.log(await client().query("db.del", name));
  }
</script>

<div class="tw-sticky-top align-items-center tw-border-b tw-border-slate-300">
  <!-- Limit width -->
  <div class="tw-max-w-xl tw-mx-auto">
    <div class="tw-flex tw-items-center tw-gap-2 tw-p-2">
      <a class="tw-inline-block" href="/">
        <i class="bi-house tw-text-2xl tw-pr-1 tw-text-gray-400" />
      </a>
      <select
        class="tw-rounded-lg tw-py-1.5 tw-px-2"
        on:change={change}
        bind:value={select}
      >
        {#each collections as { name, path }}
          <option value={path}>{name}</option>
        {/each}
        <option on:click={del}>-</option>
        <option on:click={add}>+</option>
      </select>
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
          bind:value={input}
        />
      </form>
      <a class="tw-inline-block" href="/tag">
        <i class="bi-tags tw-text-2xl tw-pr-1 tw-text-gray-400" />
      </a>
      <a class="tw-inline-block" href="/stash">
        <i class="bi-file-arrow-up tw-text-2xl tw-pr-1 tw-text-gray-400" />
      </a>
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
