<script lang="ts" context="module">
  import type { TrpcSchema } from "dstash-core";
  import { createTRPCClient } from "@trpc/client";
</script>

<script lang="ts">
  type QueryAwaited<T extends keyof TrpcSchema["_def"]["queries"]> = Awaited<
    ReturnType<TrpcSchema["_def"]["queries"][T]["call"]>
  >;
  const client = createTRPCClient<TrpcSchema>({
    url: "http://localhost:4000/trpc",
  });

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

  /*
  const inputs = {} as Record<number, string>;
  async function addTag(id: number) {
    const result = await client.mutation("entry.tag-add", {
      id,
      tag: ["", inputs[id]],
    });
    if (!result) return alert("Something went wrong!");
    const index = entries.findIndex((entry) => entry.id === id);
    entries[index] = { ...result, tags: await client.query("entry.tags", id) };
  }
  */

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
      <a href={`item/${entry.hash}`} class="item">
        <img
          class="bg"
          src={`http://localhost:4000/entry/${entry.id}`}
          alt=""
        />
        <!--         
        <p>{entry.id} - {entry.hash}</p>
        <ul>
          {#if !entry.tags}
            <li>No tags found!</li>
          {:else}
            {#each entry.tags as { namespace, name }}
              <li>{namespace ? namespace + ":" : ""}{name}</li>
            {/each}
          {/if}
          <li>
            <button on:click={() => addTag(entry.id)}>Add</button>
            <input bind:value={inputs[entry.id]} />
            {inputs[entry.id]}
          </li>
        </ul>
        -->
        <img
          class="thumbnail"
          src={`http://localhost:4000/entry/${entry.id}`}
          alt=""
        />
        <span class="label">{entry.id}</span>
      </a>
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
    &:hover .label {
      visibility: visible;
    }
    .label {
      visibility: hidden;
      position: absolute;
      bottom: 0;
      left: 0;
      margin: 0.25em;
      border-radius: 0.25em;
      padding: 0.25em;
      background-color: #fff;
    }

    // Flex children
    display: flex;
    justify-content: center;
    align-items: center;
    .thumbnail {
      max-height: 100%;
      max-width: 100%;
    }
  }
</style>
