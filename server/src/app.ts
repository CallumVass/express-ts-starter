import express, { Application, Router } from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import errorMiddleware from "./middleware/error.middleware";

const connectToDatabase = () => {
  mongoose.connect(process.env.DATABASE_URL as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

const initialiseMiddleware = (app: Application) => {
  app.use(morgan("common"));
  app.use(helmet());
  app.use(express.json());
};

const initialiseRouters = (app: Application, routers: Router[]) => {
  routers.forEach((router) => {
    app.use("/", router);
  });
};

const initialiseErrorHandler = (app: Application) => {
  app.use(errorMiddleware);
};

const app = (routers: Router[]) => {
  const app = express();

  connectToDatabase();
  initialiseMiddleware(app);
  initialiseRouters(app, routers);
  initialiseErrorHandler(app);

  const port = process.env.PORT ?? 1337;

  app.listen(port, () => {
    console.log(`Server listening at https://localhost:${port}`);
  });
};

export default app;
