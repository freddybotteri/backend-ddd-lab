import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import compress from 'compression';
import { registerRoutes } from './routes';
import cors from 'cors';

const app: express.Express = express();

const allowedOrigins = ['http://localhost:3000']

app.use(cors())

app.set('port', process.env.PORT || 3001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(compress());

registerRoutes(app);

export default app;
