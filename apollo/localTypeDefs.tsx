import gql from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    getCurrentUser: User!
  }

  type User {
    email: String!
    nachname: String!
    title: String!
  }

  input currentUserInput {
    email: String!
    nachname: String!
    title: String!
  }

  type Mutation {
    setCurrentUser(input: currentUserInput): User!
  }
`;
