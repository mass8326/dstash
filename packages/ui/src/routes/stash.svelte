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

<div class="row">
  <div class="col-4">
    <form class="form-inline my-3" on:submit|preventDefault={change}>
      <div class="input-group">
        <input class="form-control form-control-sm" bind:value />
        <button class="btn btn-sm btn-primary" type="submit">
          Change Directory
        </button>
      </div>
    </form>
    <form class="form my-3" on:submit|preventDefault={consume}>
      <button class="btn btn-sm btn-primary"> Consume Dropoff </button>
    </form>
  </div>
</div>
