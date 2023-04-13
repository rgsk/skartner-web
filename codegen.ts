import type { CodegenConfig } from '@graphql-codegen/cli';
require('dotenv').config();
const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.SKARTNER_SERVER,
  documents: 'src/**/*.{tsx,ts}',
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
