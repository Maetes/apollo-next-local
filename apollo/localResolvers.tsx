import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';

interface User {
  email: String;
  nachname: String;
  title: String;
}

export const GET_CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser @client {
      email
      nachname
      title
    }
  }
`;

export const SET_CURRENT_USER = gql`
  mutation setCurrentUser(
    $email: String!
    $nachname: String!
    $title: String!
  ) {
    setCurrentUser(email: $email, nachname: $nachname, title: $title) @client
  }
`;

export const resolvers = {
  Query: {
    getCurrentUser: (_: {}, { cache }: { cache: InMemoryCache }) => {
      console.log('startedGetter');
      const { user }: any = cache.readQuery({
        query: GET_CURRENT_USER,
      });
      console.log(user);
      return user;
    },
  },
  Mutation: {
    setCurrentUser: (
      _: {},
      variables: User,
      { cache }: { cache: InMemoryCache }
    ) => {
      const { currentUser }: any = cache.readQuery({ query: GET_CURRENT_USER });
      console.log(
        'olduser',
        currentUser.email,
        currentUser.nachname,
        currentUser.title
      );
      const newUser = {
        email: variables.email,
        title: variables.title,
        nachname: variables.nachname,
        __typename: 'CurrentUser',
      };
      console.log('newUser', newUser);
      const erg = cache.writeQuery({
        query: GET_CURRENT_USER,
        data: newUser,
      });
      return newUser;
    },
  },
};
