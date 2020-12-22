import express from 'express';
import { getTodos, insertTodo } from '../db';
import { CreateTodoPayload } from '../domain/todo';
import { validator } from '../middleware/validator.middleware';
import { ParamsDictionary } from 'express-serve-static-core';
import { Request } from 'express';

const listTodos = async (_req: express.Request, res: express.Response): Promise<void> => {
  const todos = await getTodos();
  res.json(todos);
};

const createTodo = async (req: Request<ParamsDictionary, any, CreateTodoPayload>, res: express.Response): Promise<void> => {
  const id = await insertTodo(req.body);
  res.json(id);
};

const routes = () => {
  const router = express.Router();

  router.route('/todos').get(listTodos).post(validator(CreateTodoPayload), createTodo);

  return router;
};

export default routes;
