import express from 'express';
import log from 'morgan';
import cors from 'cors';
import { Chequeo_Routes } from './routes/chequeo.routes';

const app = express();

app.use(cors());
app.use(log('dev'));
app.use(express.json());

app.use(Chequeo_Routes);

app.listen(3000, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${3000}`);
})
