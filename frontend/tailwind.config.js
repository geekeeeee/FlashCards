/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navbar': '#002F4E',
        'logoutred': '#FF4C4C',
        'primary' : '#0099FF',
        'creategreen' : '',
        'secondary' : '#0065A9'
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'plus' : "url('./assets/Create.svg')",
        'filtered': "url('./assets/FilteredBg.svg')",
        'hero': "url('./assets/Background.svg')",
        'logo': "url('./assets/logo1.svg')",
        'authlogo': "url('./assets/logo2.png')",
        'txtt' : "url('./assets/txtt.svg')",
      }
    },
  },
  plugins: [],
}