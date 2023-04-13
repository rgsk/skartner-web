import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8000',
  documents: 'src/**/*.{tsx,ts}',
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
