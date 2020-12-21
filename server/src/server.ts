import app from './app';
import dotenv from 'dotenv';
import todo from './routes/todo';

dotenv.config();

const routes = [todo()];

app(routes);
