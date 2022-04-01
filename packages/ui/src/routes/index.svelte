<script lang="ts">
  import type { TrpcSchema } from "dstash-core";
  import { createTRPCClient } from "@trpc/client";

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
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<button on:click={consume}>Consume</button>
{#await init()}
  <p>Loading entries...</p>
{:then}
  {#if entries.length === 0}
    <p>No entries found!</p>
  {/if}
  <ul>
    {#each entries as entry}
      <li>
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
        <img src={`http://localhost:4000/entry/${entry.id}`} alt="" />
      </li>
    {/each}
  </ul>
{/await}

<style>
  img {
    max-height: 240px;
  }
</style>
