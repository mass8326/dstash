// In vscode settings.json, add the following so <element class={ ... } /> works
// "tailwindCSS.experimental.classRegex": ["class={([^{}]*)}"]

// Tailwind config must be in root for vscode to detect


module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    // Copy bootstrap breakpoints for consistency
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px',
    },
  },
  variants: {
    extend: {
      visible: ["group-hover"]
    }
  },
  plugins: [],
  // Add prefix to prevent collisions with bootstrap
  prefix: "tw-",
};
