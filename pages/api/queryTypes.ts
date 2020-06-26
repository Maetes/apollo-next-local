import {
  makeSchema,
  objectType,
  stringArg,
  asNexusMethod,
  queryType,
  intArg,
  mutationType,
  FieldResolver,
  idArg,
} from '@nexus/schema';
import { PrismaClient } from '@prisma/client';

// USER MODEL

export const Query = queryType({
  definition(t) {
    t.field('getUser', {
      type: 'User',
      args: { email: stringArg({ required: true }) },
      resolve: async (_, { email }) => {
        const user = await prisma.user.findOne({
          where: {
            email: email,
          },
        });
        if (user === null) {
          throw new Error(`No User with email of ${email} found"`);
        }
        return user;
      },
    });

    t.list.field('allUsers', {
      type: 'User',
      resolve: async (_, _2) => {
        return await prisma.user.findMany();
      },
    });

    t.list.field('allTasks', {
      type: 'Task',
      resolve: async (_, _2) => {
        return await prisma.task.findMany();
      },
    });

    t.field('getTask', {
      type: 'Task',
      args: { name: stringArg({ required: true }) },
      resolve: async (_, { name }) => {
        const task = await prisma.task.findOne({
          where: {
            name: name,
          },
        });
        if (task === null) {
          throw new Error(`No Task with name of ${name} found"`);
        }
        return task;
      },
    });

    t.list.field('allProjects', {
      type: 'Project',
      //@ts-ignore: Unreachable code error
      resolve: async (_, _2) => {
        return await prisma.project.findMany();
      },
    });

    t.field('getProject', {
      type: 'Project',
      args: { name: stringArg({ nullable: false }) },
      resolve: async (_, { name }) => {
        const project = await prisma.project.findOne({
          where: {
            name: name,
          },
        });
        if (project === null) {
          throw new Error(`No Project with name of ${name} found"`);
        }
        return project;
      },
    });

    t.list.field('allTechs', {
      type: 'Tech',
      //@ts-ignore: Unreachable code error
      resolve: async (_, _2) => {
        return await prisma.tech.findMany();
      },
    });

    t.field('getTech', {
      type: 'Tech',
      args: { name: stringArg({ nullable: false }) },
      resolve: async (_, { name }) => {
        const tech = await prisma.tech.findOne({
          where: {
            name: name,
          },
        });
        if (tech === null) {
          throw new Error(`No Tech with name of ${name} found"`);
        }
        return tech;
      },
    });
  },
});

const prisma = new PrismaClient();
