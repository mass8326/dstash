<script lang="ts" context="module">
  import { client, type QueryAwaited } from "$lib/trpc";
</script>

<script lang="ts">
  export let size = 200;
  export let page = 1;
  let entries: QueryAwaited<"entry.all"> = [];
  let pages = 1;
  $: init(page);
  async function init(page: number) {
    const [response, count] = await client.query("entry.page", {
      limit: 20,
      offset: 20 * (page - 1),
    });
    entries = response;
    pages = Math.floor(count / 20) + 1;
  }
</script>

<p>
  Pages:
  {#each Array(pages) as _, index}
    <a class="page" href={`/page/${index + 1}`}>{index + 1}</a>
  {/each}
</p>
{#if entries.length === 0}
  <p>No entries found!</p>
{/if}
<div class="list" style={`--icon-size:${size}px`}>
  {#each entries as entry}
    {#key entry.id}
      <div class="item">
        <input class="check" type="checkbox" />
        <img
          class="bg"
          src={`http://localhost:4000/entry/${entry.id}`}
          alt=""
        />
        <a class="link" href={`/item/${entry.id}`}>
          <img
            class="thumbnail"
            src={`http://localhost:4000/entry/${entry.id}`}
            alt=""
          />
        </a>
      </div>
    {/key}
  {/each}
</div>

<style lang="scss">
  .list {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(var(--icon-size, 240px), 1fr)
    );
  }
  .item {
    margin: 0.5em;
    border: 1px solid #ddd;
    aspect-ratio: 1/1;

    // Background
    position: relative;
    overflow: hidden;
    &:hover {
      background-color: #eee9;
      border: 1px solid #999;
    }
    .bg {
      position: absolute;
      height: calc(100% + 2em);
      width: calc(100% + 2em);
      filter: blur(1em);
      opacity: 0.5;
      z-index: -1;
    }
    &:hover .check,
    .check:checked {
      visibility: visible;
    }
    .check {
      visibility: hidden;
      position: absolute;
      top: 0;
      left: 0;
      margin: 0.25em;
    }
    .link {
      height: 100%;
      width: 100%;

      // Flex children
      display: flex;
      justify-content: center;
      align-items: center;
      .thumbnail {
        max-height: 100%;
        max-width: 100%;
      }
    }
  }
  .page {
    margin-left: 0.25em;
    margin-right: 0.25em;
  }
</style>
