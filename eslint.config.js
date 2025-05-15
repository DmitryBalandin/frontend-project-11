import pluginJs from '@eslint/js'
import globals from 'globals'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  pluginJs.configs.recommended,
  {
    files: [
      '**/*.{js}',
    ],
  },
  {
    ignores: ['dist/'],
  },
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      '@stylistic/js/no-multi-spaces': 'error',
      '@stylistic/js/no-extra-semi': 'error',
      '@stylistic/js/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/js/semi': ['error', 'never'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/js/quote-props': ['error', 'as-needed'],
      '@stylistic/js/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/js/eol-last': ['error', 'always'],
      '@stylistic/js/space-before-blocks': 'error',
      '@stylistic/js/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      '@stylistic/js/keyword-spacing': ['error'],
    },
  },
]
