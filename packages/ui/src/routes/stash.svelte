<script lang="ts" context="module">
  import { client } from "$lib/trpc";
</script>

<script lang="ts">
  let value = "";

  async function consume() {
    await client().mutation("stash.consume");
    location.reload();
  }
  async function change() {
    await client().mutation("db.reconnect", value);
  }
</script>

<div class="tw-max-w-sm">
  <form class="form-inline my-3" on:submit|preventDefault={change}>
    <div class="input-group tw-">
      <input class="form-control form-control-sm" bind:value />
      <button class="btn btn-sm btn-primary"> Change Directory </button>
    </div>
  </form>
  <form class="form my-3" on:submit|preventDefault={consume}>
    <button class="btn btn-sm btn-primary"> Consume Dropoff </button>
  </form>
</div>
