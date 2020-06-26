import { stringArg, intArg, mutationType } from '@nexus/schema';
// import { Project, Task, Tech, User } from './objectTypes';

import { PrismaClient, UserCreateInput } from '@prisma/client';
const prisma = new PrismaClient();

export const Mutation = mutationType({
  definition(t) {
    // USERS

    t.field('createUser', {
      type: 'User',
      args: {
        title: stringArg({ nullable: false }),
        nachname: stringArg({ nullable: false }),
        email: stringArg({ required: true }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_, { title, nachname, email, password }) => {
        const user = await prisma.user.create({
          data: {
            title,
            nachname,
            email,
            password,
          },
        });
        if (user === null) {
          throw new Error(`Couldn't create user of name ${name}"`);
        }
        return user;
      },
    });

    t.field('deleteUser', {
      type: 'User',
      nullable: true,
      args: {
        userId: intArg({ nullable: false }),
      },
      resolve: async (_, { userId }) => {
        const user = await prisma.user.delete({ where: { id: userId } });
        if (user === null) {
          throw new Error(`Could not find User ${name}"`);
        }

        return user;
      },
    });

    t.field('updateUser', {
      type: 'User',
      nullable: true,
      args: {
        title: stringArg({ nullable: false }),
        nachname: stringArg({ nullable: false }),
        email: stringArg({ required: true }),
        password: stringArg({ nullable: false }),
        oldMail: stringArg({ nullable: false }),
      },
      resolve: async (_: {}, { oldMail, title, nachname, email, password }) => {
        const user = await prisma.user.update({
          where: { email: oldMail },
          data: { title, nachname, email, password },
        });
        if (user === null || user === undefined) {
          throw new Error(`User ${name} not found"`);
        }
        return user;
      },
    });

    // TASKS

    t.field('createTask', {
      type: 'Task',
      args: {
        name: stringArg({ required: true }),
        beschreibung: stringArg({ nullable: false }),
        code: stringArg({ nullable: false }),
      },
      resolve: async (_, { name, beschreibung, code }) => {
        const task = await prisma.task.create({
          data: {
            name,
            beschreibung,
            code,
          },
        });
        if (task === null) {
          throw new Error(`Couldn't create task of name ${task}"`);
        }
        return task;
      },
    });

    t.field('deleteTask', {
      type: 'Task',
      args: {
        taskId: intArg({ required: true }),
      },
      resolve: async (_, { taskId }) => {
        const task = await prisma.task.delete({ where: { id: taskId } });
        if (task === null) {
          throw new Error(`Could not find Task ${task}"`);
        }

        return task;
      },
    });

    t.field('updateTask', {
      type: 'Task',
      args: {
        oldName: stringArg({ required: true }),
        name: stringArg({ required: true }),
        beschreibung: stringArg({ nullable: false }),
        code: stringArg({ nullable: false }),
      },
      resolve: async (_: {}, { oldName, name, beschreibung, code }) => {
        const task = await prisma.task.update({
          where: { name: oldName },
          data: { name, beschreibung, code },
        });
        if (task === null) {
          throw new Error(`User ${task} not found"`);
        }
        return task;
      },
    });

    //PROJECT

    t.field('createProject', {
      type: 'Project',
      args: {
        name: stringArg({ required: true }),
        url: stringArg({ nullable: false }),
        beschreibung: stringArg({ nullable: false }),
      },
      resolve: async (_, { name, beschreibung, url }) => {
        const project = await prisma.project.create({
          data: {
            name,
            beschreibung,
            url,
          },
        });
        if (project === null) {
          throw new Error(`Couldn't create task of name ${project}"`);
        }
        return project;
      },
    });

    t.field('deleteProject', {
      type: 'Project',
      args: {
        projectId: intArg({ required: true }),
      },
      resolve: async (_, { projectId }) => {
        const project = await prisma.project.delete({
          where: { id: projectId },
        });
        if (project === null) {
          throw new Error(`Could not find Task ${project}"`);
        }

        return project;
      },
    });

    t.field('updateProject', {
      type: 'Project',
      args: {
        oldName: stringArg({ required: true }),
        name: stringArg({ required: true }),
        url: stringArg({ nullable: false }),
        beschreibung: stringArg({ nullable: false }),
      },
      resolve: async (_: {}, { oldName, name, beschreibung, url }) => {
        const project = await prisma.project.update({
          where: { name: oldName },
          data: { name, beschreibung, url },
        });
        if (project === null) {
          throw new Error(`User ${project} not found"`);
        }
        return project;
      },
    });

    //TECH

    t.field('createTech', {
      type: 'Tech',
      args: {
        name: stringArg({ required: true }),
        beschreibung: stringArg({ nullable: false }),
      },
      resolve: async (_, { name, beschreibung }) => {
        const tech = await prisma.tech.create({
          data: {
            name,
            beschreibung,
          },
        });
        if (tech === null) {
          throw new Error(`Couldn't create task of name ${tech}"`);
        }
        return tech;
      },
    });

    t.field('deleteTech', {
      type: 'Tech',
      args: {
        techId: intArg({ required: true }),
      },
      resolve: async (_, { techId }) => {
        const tech = await prisma.tech.delete({
          where: { id: techId },
        });
        if (tech === null) {
          throw new Error(`Could not find Tech ${tech}"`);
        }
        return tech;
      },
    });

    t.field('updateTech', {
      type: 'Tech',
      args: {
        oldName: stringArg({ required: true }),
        name: stringArg({ required: true }),
        beschreibung: stringArg({ nullable: false }),
      },
      resolve: async (_: {}, { oldName, name, beschreibung }) => {
        const tech = await prisma.tech.update({
          where: { name: oldName },
          data: { name, beschreibung },
        });
        if (tech === null) {
          throw new Error(`User ${tech} not found"`);
        }
        return tech;
      },
    });
  },
});
