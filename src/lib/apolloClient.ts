import { ApolloClient, InMemoryCache } from '@apollo/client';
import environmentVars from 'lib/environmentVars';
const apolloClient = new ApolloClient({
  uri: process.env.SKARTNER_SERVER ?? environmentVars.SKARTNER_SERVER,
  cache: new InMemoryCache(),
});
export default apolloClient;
