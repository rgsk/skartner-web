import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';

import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import environmentVars from './environmentVars';

const httpUrl = `${environmentVars.SKARTNER_SERVER}/graphql`;
const wsUrl = httpUrl.replace('http', 'ws');

const httpLink = new HttpLink({
  uri: httpUrl,
});

const getSplitLink = () => {
  const wsLink = new GraphQLWsLink(
    createClient({
      url: wsUrl,
    })
  );

  // The split function takes three parameters:
  //
  // * A function that's called for each operation to execute
  // * The Link to use for an operation if the function returns a "truthy" value
  // * The Link to use for an operation if the function returns a "falsy" value
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  );
  return splitLink;
};

const apolloClient = new ApolloClient({
  // this check ensures that websocket connection is not initialized on server side
  link: typeof window === 'undefined' ? httpLink : getSplitLink(),
  cache: new InMemoryCache(),
});
export default apolloClient;
