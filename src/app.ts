import express, { Application } from 'express';
import bodyparser from 'body-parser';
import { routes } from './routes';

export const app: Application = express();

app.use(bodyparser.urlencoded({ extended: true }));

routes(app);
