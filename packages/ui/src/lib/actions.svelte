<script lang="ts" context="module">
  import { breakpoint } from "./breakpoint";
  import { goto } from "$app/navigation";

  export const defaultLimit = 25;
  export function parseLimit(params: URLSearchParams) {
    const raw = params.get("lim");
    const int = raw ? parseInt(raw) : NaN;
    return Number.isNaN(int) ? undefined : int;
  }
</script>

<script lang="ts">
  export let page: number;
  export let limit: number;
  export let base: string;
  export let size = 200;

  const limits = [25, 50, 100];
  $: link = (lim: number) => () => {
    const offset = (page - 1) * limit + 1;
    const target = Math.ceil(offset / lim) || 1;
    const append = lim === defaultLimit ? "" : `?lim=${lim}`;
    goto(`${base}/${target}${append}`);
  };

  $: size = sizeArr[sizeInd];
  $: sizeArr = [100, 150, 200, 300, 450, 600].map(
    (sz) => sz / ($breakpoint.sm ? 1 : 1.25)
  );
  let sizeInd = 2;
  function bigger() {
    if (sizeInd < sizeArr.length - 1) sizeInd++;
  }
  function smaller() {
    if (sizeInd > 0) sizeInd--;
  }
</script>

<div class="tw-flex tw-gap-2">
  <div class="btn-group btn-group-sm">
    {#each limits as lim}
      <button
        class="btn btn-sm btn-primary tw-align-middle"
        class:active={limit === lim}
        on:click={link(lim)}
      >
        {lim}
      </button>
    {/each}
  </div>
  <div class="btn-group btn-group-sm tw-whitespace-nowrap">
    <button class="btn btn-sm btn-primary" on:click={smaller}>
      {#if $breakpoint.md} Icons Smaller {:else} Icons - {/if}
    </button>
    <button class="btn btn-sm btn-primary" on:click={bigger}>
      {#if $breakpoint.md} Icons Bigger {:else} Icons + {/if}
    </button>
  </div>
</div>
