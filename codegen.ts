import type { CodegenConfig } from '@graphql-codegen/cli';
require('dotenv').config();
// above is required if variable is defined in local .env
// docker env is provisioned without this package too

// console.log('process.env.SKARTNER_SERVER', process.env.SKARTNER_SERVER);

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
