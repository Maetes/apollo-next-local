import {
  makeSchema,
  objectType,
  stringArg,
  asNexusMethod,
  queryType,
  intArg,
  mutationType,
  FieldResolver,
} from '@nexus/schema';
import { GraphQLDate } from 'graphql-iso-date';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { ApolloServer } from 'apollo-server-micro';
import { Mutation } from './mutationTypes';
import { Project, Task, Tech, User } from './objectTypes';
import { Query } from './queryTypes';
import { nexusPrismaPlugin } from 'nexus-prisma';

export const GLDate = asNexusMethod(GraphQLDate, 'date');

export const schema = makeSchema({
  types: [Query, Mutation, User, Tech, Project, GLDate, Task],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    typegen: path.join(process.cwd(), 'pages', 'api', 'types.ts'),
    schema: path.join(process.cwd(), 'pages', 'api', 'schema.graphql'),
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default new ApolloServer({
  schema,
  context(ctx) {
    return ctx;
  },
}).createHandler({
  path: '/api',
});
