import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types/lib/NonEmptyString';

export const CreateTodoPayload = t.type({ description: NonEmptyString, isComplete: t.boolean }, 'CreateTodoPayload');

export type CreateTodoPayload = t.TypeOf<typeof CreateTodoPayload>;

export const Todo = t.type(
  {
    id: t.string,
    description: NonEmptyString,
    isComplete: t.boolean,
  },
  'Todo',
);

export type Todo = t.TypeOf<typeof Todo>;
