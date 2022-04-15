<script lang="ts" context="module">
  import { page } from "$app/stores";
  import { client, type QueryAwaited } from "$lib/trpc";
</script>

<script lang="ts">
  const id = parseInt($page.params.id);
  let item: QueryAwaited<"entry.one">;
  let tags: QueryAwaited<"entry.tags">;
  async function init() {
    [item, tags] = await Promise.all([
      client().query("entry.one", id),
      client().query("entry.tags", id),
    ]);
  }

  let input: string;
  async function addTag() {
    const result = await client().mutation("entry.tag-add", {
      id,
      tag: ["", input],
    });
    if (!result) return alert("Something went wrong!");
    tags = await client().query("entry.tags", id);
  }
</script>

<a href="/">[Back]</a>
{#await init()}
  <p>Loading entry...</p>
{:then}
  <p>ID: {item.id}</p>
  <p>Hash: {item.hash}</p>
  {#if tags.length === 0}
    <p>Tags: No tags found!</p>
  {:else}
    <p>
      Tags:
      {tags
        .map(
          ({ namespace, name }) =>
            `"${namespace ? namespace + ":" : ""}${name}"`
        )
        .sort()
        .join(", ")}
    </p>
  {/if}
  <p>
    <input bind:value={input} />
    <button on:click={addTag}>Add Tag</button>
  </p>
{/await}
<img src={`http://localhost:4000/entry/${id}`} alt="" />

<style>
  img {
    max-width: 100%;
  }
</style>
