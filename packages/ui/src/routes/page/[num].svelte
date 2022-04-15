<script lang="ts" context="module">
  import { page } from "$app/stores";
  import List from "$lib/list.svelte";
</script>

<script lang="ts">
  $: int = parseInt($page.params.num);
  $: parsed = Number.isNaN(int) || int < 1 ? 1 : int;
</script>

<List page={parsed} />
