<script lang="ts">
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

<div class="btn-group">
  <button class="btn btn-sm btn-primary" on:click={smaller}>
    Icons Smaller
  </button>
  <button class="btn btn-sm btn-primary" on:click={bigger}>
    Icons Bigger
  </button>
</div>
