import { objectType } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.nachname();
    t.model.password();
    t.model.email();
  },
});

export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.beschreibung();
    t.model.code();
  },
});

export const Project = objectType({
  name: 'Project',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.url();
    t.model.beschreibung();
  },
});

export const Tech = objectType({
  name: 'Tech',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.beschreibung();
  },
});
