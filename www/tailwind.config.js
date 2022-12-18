module.exports = {
  purge: [
    './components/**/*.tsx',
    './components/**/*.js',
    './pages/**/*.tsx',
    './pages/**/*.js',
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
