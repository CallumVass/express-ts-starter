import { CreateTodoPayload, Todo } from '../domain/todo';
import mongoose, { Schema, Document } from 'mongoose';
import { rights } from 'fp-ts/Array';
import { pipe } from 'fp-ts/lib/function';

interface ITodo extends Document {
  description: string;
  isComplete: boolean;
}

const TodoSchema: Schema = new Schema({
  description: { type: String, required: true, unique: true },
  isComplete: { type: Boolean, required: true },
});

const repo = mongoose.model<ITodo>('Todo', TodoSchema);

export const insertTodo = async (payload: CreateTodoPayload): Promise<Todo['id']> => {
  const todo = await repo.create(payload);

  return todo._id;
};

export const getTodos = async (): Promise<Array<Todo>> => {
  const todos = await repo.find({});

  const decoded = todos.map(t => Todo.decode(t));

  return pipe(decoded, rights);
};
