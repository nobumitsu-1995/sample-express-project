import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  { files: ['./src/**/*.{ts}'] },
  { languageOptions: { globals: globals.es2023 } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]
