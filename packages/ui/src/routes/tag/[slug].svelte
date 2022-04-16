<script lang="ts" context="module">
  import { displayify, unslugify } from "$lib/tag";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ params }) => {
    const { namespace, name } = unslugify(params.slug) ?? {};
    const display = name ? displayify(name, namespace) : undefined;
    return { props: { display, namespace, name } };
  };
</script>

<script lang="ts">
  export let name: string;
  export let namespace: string | undefined;
  export let display: string | undefined;
</script>

<p>Display: {display}</p>
<p>Namespace: {namespace}</p>
<p>Name: {name}</p>
