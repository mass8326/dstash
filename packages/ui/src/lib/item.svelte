<script lang="ts">
  export let src: string;
  export let href: string;
</script>

<div class="item">
  <input class="check" type="checkbox" />
  <img class="bg" {src} alt="" />
  <a class="link" {href}>
    <img class="thumbnail" {src} alt="" />
  </a>
</div>

<style lang="scss">
  .list {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(var(--icon-size, 240px), 1fr)
    );
  }
  .item {
    margin: 0.5em;
    border: 1px solid #ddd;
    aspect-ratio: 1/1;

    // Background
    position: relative;
    overflow: hidden;
    &:hover {
      background-color: #eee9;
      border: 1px solid #999;
    }
    .bg {
      position: absolute;
      height: calc(100% + 2em);
      width: calc(100% + 2em);
      filter: blur(1em);
      opacity: 0.5;
      z-index: -1;
    }
    &:hover .check,
    .check:checked {
      visibility: visible;
    }
    .check {
      visibility: hidden;
      position: absolute;
      top: 0;
      left: 0;
      margin: 0.25em;
    }
    .link {
      height: 100%;
      width: 100%;

      // Flex children
      display: flex;
      justify-content: center;
      align-items: center;
      .thumbnail {
        max-height: 100%;
        max-width: 100%;
      }
    }
  }
</style>
