import * as D from 'io-ts/Decoder';
import { NonEmptyString } from './types/NonEmptyString';

export const CreateTodoPayload = D.type({ description: NonEmptyString, isComplete: D.boolean });

export type CreateTodoPayload = D.TypeOf<typeof CreateTodoPayload>;

export const Todo = D.type({
  id: D.string,
  description: NonEmptyString,
  isComplete: D.boolean,
});

export type Todo = D.TypeOf<typeof Todo>;
