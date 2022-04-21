<script lang="ts">
  export let src: string;
  export let href: string;
</script>

<div
  class="tw-relative tw-overflow-hidden tw-aspect-square sm:tw-border tw-border-slate-300 hover:tw-border-slate-400 hover:tw-bg-slate-100/50"
>
  <input class="check tw-absolute tw-m-1" type="checkbox" />
  <img class="bg tw-hidden sm:tw-block" {src} alt="" />
  <a
    class="tw-h-full tw-w-full tw-flex tw-justify-center tw-items-center"
    {href}
  >
    <img
      class={`tw-object-cover tw-h-full tw-w-full sm:tw-max-h-full sm:tw-h-auto sm:tw-w-auto`}
      {src}
      alt=""
    />
  </a>
</div>

<style lang="scss">
  .bg {
    position: absolute;
    height: calc(100% + 2em);
    width: calc(100% + 2em);
    filter: blur(1em);
    opacity: 0.5;
    z-index: -1;
  }
  .check {
    visibility: hidden;
    :hover &,
    &:checked {
      visibility: visible;
    }
  }
</style>
