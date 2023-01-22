const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './components/**/*.tsx',
    './components/**/*.js',
    './pages/**/*.tsx',
    './pages/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin')
  ],
  content: [
    "./node_modules/flowbite/**/*.js",
  ]
}
