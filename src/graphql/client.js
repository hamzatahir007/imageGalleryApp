import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://nearby-buck-48.hasura.app/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      'x-hasura-admin-secret': 'AKOlsv0QEgwny0Q0vAI7Yv4Vw25uvvEAF3mspzYl2v2U7lzJIuyKGGShD19sOIUv',
      ...headers,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), 
  cache: new InMemoryCache(),
});

export default client;