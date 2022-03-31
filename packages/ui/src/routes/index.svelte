<script lang="ts">
  import type { TrpcSchema } from "dstash-core";
  import { createTRPCClient } from "@trpc/client";

  const client = createTRPCClient<TrpcSchema>({
    url: "http://localhost:4000/trpc",
  });
  let results = client.query("node.all");
  async function consume() {
    await client.mutation("stash.consume");
    results = client.query("node.all");
  }
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<button on:click={consume}>Consume</button>
{#await results}
  <p>Loading...</p>
{:then nodes}
  {#if nodes.length === 0}
    <p>No entries found!</p>
  {/if}
  <ul>
    {#each nodes as node}
      <li>
        <p>{node.hash}</p>
        <img src={`http://localhost:4000/node/${node.hash}`} alt="" />
      </li>
    {/each}
  </ul>
{/await}

<style>
  img {
    max-height: 240px;
  }
</style>
