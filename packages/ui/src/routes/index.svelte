<script lang="ts" context="module">
  import { client, type QueryAwaited } from "$lib/trpc";
</script>

<script lang="ts">
  let entries: (QueryAwaited<"entry.all">[0] & {
    tags: QueryAwaited<"entry.tags">;
  })[];
  async function init() {
    const response = await client.query("entry.all");
    entries = await Promise.all(
      response.map(async (entry) => ({
        ...entry,
        tags: await client.query("entry.tags", entry.id),
      }))
    );
  }

  async function consume() {
    await client.mutation("stash.consume");
    await init();
  }

  let sizeArr = [100, 150, 200, 300, 450, 600];
  let sizeInd = 2;
  function bigger() {
    if (sizeInd < sizeArr.length - 1) sizeInd++;
  }
  function smaller() {
    if (sizeInd > 0) sizeInd--;
  }
</script>

<p>
  Actions:
  <button on:click={consume}>Consume</button>
</p>
<p>
  Icon Size:
  <button on:click={smaller}>Smaller</button>
  <button on:click={bigger}>Bigger</button>
</p>
{#await init()}
  <p>Loading entries...</p>
{:then}
  {#if entries.length === 0}
    <p>No entries found!</p>
  {/if}
  <div class="list" style={`--icon-size:${sizeArr[sizeInd]}px`}>
    {#each entries as entry}
      <div class="item">
        <input class="check" type="checkbox" />
        <img
          class="bg"
          src={`http://localhost:4000/entry/${entry.id}`}
          alt=""
        />
        <a class="link" href={`item/${entry.id}`}>
          <img
            class="thumbnail"
            src={`http://localhost:4000/entry/${entry.id}`}
            alt=""
          />
        </a>
      </div>
    {/each}
  </div>
{/await}

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
</style>
