import { useMemo } from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { typeDefs } from './localTypeDefs';
import { resolvers } from './localResolvers';

let apolloClient: ApolloClient<NormalizedCacheObject | null>;

function createIsomorphLink() {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('apollo-link-schema');
    const { schema } = require('../pages/api/index');
    return new SchemaLink({ schema });
  } else {
    const { HttpLink } = require('apollo-link-http');
    return new HttpLink({
      uri: 'http://localhost:3000/api',
      credentials: 'same-origin',
    });
  }
}

function createApolloClient() {
  let cache = new InMemoryCache();
  cache.writeData({
    data: {
      currentUser: {
        email: 'a@a.com',
        nachname: 'john',
        title: 'prof',
        __typename: 'currentUser',
      },
    },
  });
  return new ApolloClient({
    connectToDevTools: true,
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: cache,
    resolvers: resolvers,
    typeDefs: typeDefs,
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: null | undefined) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
