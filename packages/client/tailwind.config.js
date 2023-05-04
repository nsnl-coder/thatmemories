/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    utils: true,
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#ee403d',
          'primary-content': '#fff',
          'base-100': '#fff',
          'base-200': '#f9fafb',
          'base-300': '#f3f4f6',
          'base-content': '#000',
          neutral: '#000',
          'neutral-content': '#fff',
          accent: '#f9c300',
          success: '#16a34a',
          error: '#f87171',
          warning: '#fbbf24',
        },
      },
    ],
  },
  safelist: ['w-1/3', 'w-1/4', 'w-1/2'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ee403d',
        'primary-content': '#fff',
        'base-100': '#fff',
        'base-200': '#f9fafb',
        'base-300': '#f3f4f6',
        'base-content': '#000',
        neutral: '#000',
        'neutral-content': '#fff',
        accent: '#f9c300',
        success: '#16a34a',
        error: '#f87171',
        warning: '#fbbf24',
      },
      fontSize: {
        h1: '30px',
        h2: '22px',
        p1: '16px',
        p2: '13px',
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
};
