import { derived, readable } from "svelte/store";
import { browser } from "$app/env";

// Window may not be defined during ssr

const width = browser
  ? readable(window.innerWidth, function start(set) {
      const listener = () => set(window.innerWidth);
      window.addEventListener("resize", listener);
      return function stop() {
        window.removeEventListener("resize", listener);
      };
    })
  : readable(0);

export const breakpoint = derived(width, (width) => {
  const siloed = {
    gte: {
      sm: width >= 576,
      md: width >= 768,
      lg: width >= 992,
      xl: width >= 1200,
      xxl: width >= 1400,
    },
    eq: {
      xs: width < 576,
      sm: width >= 576 && width < 768,
      md: width >= 768 && width < 992,
      lg: width >= 992 && width < 1200,
      xl: width >= 1200 && width < 1400,
      xxl: width >= 1400,
    },
  };
  const breaks = { ...siloed, ...siloed.gte };
  switch (true) {
    case breaks.xxl:
      return { ...breaks, display: "xxl" };
    case breaks.xl:
      return { ...breaks, display: "xl" };
    case breaks.lg:
      return { ...breaks, display: "lg" };
    case breaks.md:
      return { ...breaks, display: "md" };
    case breaks.sm:
      return { ...breaks, display: "sm" };
  }
  return { ...breaks, display: "xs" };
});
