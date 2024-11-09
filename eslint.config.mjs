import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import parser from '@typescript-eslint/parser'
import boundaries from 'eslint-plugin-boundaries'

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
  {
    plugins: {
      boundaries,
    },
    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: 'src/domain/**',
              allow: ['src/domain/**'],
            },
            {
              from: 'src/application/**',
              allow: ['src/application/**', 'src/domain/**'],
            },
            {
              from: 'src/infrastructure/**',
              allow: [
                'src/infrastructure/**',
                'src/application/**',
                'src/domain/**',
              ],
            },
          ],
        },
      ],
      'boundaries/no-private': ['error'],
    },
    settings: {
      'boundaries/elements': [
        { type: 'domain', pattern: 'src/domain/**' },
        { type: 'application', pattern: 'src/application/**' },
        { type: 'infrastructure', pattern: 'src/infrastructure/**' },
      ],
    },
  },
]
