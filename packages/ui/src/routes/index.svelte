<script lang="ts" context="module">
  import { client } from "$lib/trpc";
  import List from "$lib/list.svelte";
</script>

<script lang="ts">
  async function consume() {
    await client.mutation("stash.consume");
    location.reload();
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
<List size={sizeArr[sizeInd]} />
