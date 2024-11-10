import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import parser from '@typescript-eslint/parser'
import eslintPluginTS from '@typescript-eslint/eslint-plugin'

export default [
  { files: ['**/*.ts'] },
  { ignores: ['dist/**/*'] },
  {
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  {
    plugins: {
      '@typescript-eslint': eslintPluginTS,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['function', 'parameter'],
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: ['variable'],
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
]
