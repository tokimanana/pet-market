const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        retroCustom: {
          ...require("daisyui/src/theming/themes")["retro"],
          "primary": "#8b7355",
          "primary-content": "#1f2937",
        },
      },
      "luxury"
    ],
  },
};
