<script lang="ts" context="module">
  import { breakpoint } from "./breakpoint";
</script>

<script lang="ts">
  export let cls = "";
  export let size = 200;

  let sizeArr = [100, 150, 200, 300, 450, 600];
  let sizeInd = 2;
  function bigger() {
    if (sizeInd < sizeArr.length - 1) sizeInd++;
    size = sizeArr[sizeInd];
  }
  function smaller() {
    if (sizeInd > 0) sizeInd--;
    size = sizeArr[sizeInd];
  }
</script>

<div class={"btn-group " + cls}>
  <button class="btn btn-sm btn-primary" on:click={smaller}>
    {#if $breakpoint.md}
      Icons Smaller
    {:else}
      Icons -
    {/if}
  </button>
  <button class="btn btn-sm btn-primary" on:click={bigger}>
    {#if $breakpoint.md}
      Icons Bigger
    {:else}
      Icons +
    {/if}
  </button>
</div>
