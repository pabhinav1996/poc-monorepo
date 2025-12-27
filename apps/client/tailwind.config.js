const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4e2683',
          hover: '#3B2E58',
        },
        danger: '#cc333d',
        warning: '#e68217',
        success: '#60ad25',
        neutral: {
          light: '#605E5C',
          dark: '#323130',
          border: '#d2d0ce',
        }
      },
      fontFamily: {
        opensans: ['"Open Sans"', 'sans-serif'],
        roboto: ['"Roboto"', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
