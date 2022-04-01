<script lang="ts">
  import type { TrpcSchema } from "dstash-core";
  import { createTRPCClient } from "@trpc/client";

  const client = createTRPCClient<TrpcSchema>({
    url: "http://localhost:4000/trpc",
  });
  let results = client.query("entry.all");
  async function consume() {
    await client.mutation("stash.consume");
    results = client.query("entry.all");
  }
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<button on:click={consume}>Consume</button>
{#await results}
  <p>Loading entries...</p>
{:then entries}
  {#if entries.length === 0}
    <p>No entries found!</p>
  {/if}
  <ul>
    {#each entries as entry}
      <li>
        <p>{entry.id} - {entry.hash}</p>
        <ul>
          {#await client.query("entry.tags", entry.id)}
            <li>Loading tags...</li>
          {:then tags}
            {#if !tags}
              <li>No tags found!</li>
            {:else}
              {#each tags as { namespace, name }}
                <li>{namespace ? namespace + ":" : ""}{name}</li>
              {/each}
            {/if}
          {/await}
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
