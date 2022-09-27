module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
  ],
  globals: {
    $ref: 'readonly',
    $computed: 'readonly',
    $shallowRef: 'readonly',
    $customRef: 'readonly',
    $toRef: 'readonly',
  },
}
