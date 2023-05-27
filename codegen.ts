import type { CodegenConfig } from '@graphql-codegen/cli';
require('dotenv').config();
// above is required if variable is defined in local .env
// docker env is provisioned without this package too

// console.log(
//   'process.env.NEXT_PUBLIC_SKARTNER_SERVER',
//   process.env.NEXT_PUBLIC_SKARTNER_SERVER
// );

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_SKARTNER_SERVER,
  documents: 'src/**/*.{graphql,gql}',
  generates: {
    'src/gql/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
};

export default config;
