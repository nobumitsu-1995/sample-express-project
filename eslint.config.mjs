import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import parser from '@typescript-eslint/parser'

export default [
  { files: ['**/*.ts'] },
  { ignores: ['dist/**/*', 'vite.config.ts'] },
  {
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    name: 'custom-rules',
    files: ['./src/**/*.ts'],
    rules: [
      {
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
      },
    ],
  },
]
