/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(115, 103, 240, 1)',
        'primary-light': 'rgba(115, 103, 240, 0.3)',
        success: 'rgba(40, 199, 111, 1)',
        'success-light': 'rgba(40, 199, 111, 0.5)',
        danger: 'rgba(234, 84, 85, 1)',
        'danger-light': 'rgba(234, 84, 85, 0.5)',
        warning: 'rgba(255, 173, 95, 1)',
        'warning-light': 'rgba(255, 173, 95, 0.5)',
        heading: 'rgba(51, 48, 60,0.87)',
        paragraph: 'rgba(51, 48, 60,0.87)',
        'paragraph-light': 'rgba(51, 48, 60,0.38)',
      },
      fontSize: {
        h1: '20px',
        h2: '16px',
        p1: '16px',
        p2: '14px',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: false,
  },
};
