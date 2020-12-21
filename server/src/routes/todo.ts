import express from 'express';
import { getTodos, insertTodo } from '../db';
import { CreateTodoPayload } from '../domain/todo';
import { validator } from '../middleware/validator.middleware';

const listTodos = async (_req: express.Request, res: express.Response): Promise<void> => {
  const todos = await getTodos();
  res.json(todos);
};

const createTodo = async (req: express.Request, res: express.Response): Promise<void> => {
  const id = await insertTodo(req.body);
  res.json(id);
};

const router = () => {
  const router = express.Router();

  router.route('/todos').get(listTodos).post(validator(CreateTodoPayload), createTodo);

  return router;
};

export default router;
