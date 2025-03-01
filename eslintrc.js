module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  // Använd vue-eslint-parser som huvudparser för .vue-filer
  parser: "vue-eslint-parser",
  parserOptions: {
    // Använd @babel/eslint-parser för script-delen
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-env"],
    },
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  rules: {
    // Dina ESLint-regler här
  },
};
