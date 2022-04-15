<script lang="ts" context="module">
  import { page } from "$app/stores";
  import List from "$lib/list.svelte";
</script>

<List page={parseInt($page.params.num)} />
