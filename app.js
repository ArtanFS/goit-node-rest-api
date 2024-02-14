import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import { serverConfig } from './configs/index.js';

import { authRouter, contactsRouter } from './routes/index.js';

const app = express();

mongoose
  .connect(serverConfig.mongoUrl)
  .then(() => console.log('Database connection successful'))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

if (serverConfig.environment === 'development') app.use(morgan('tiny'));

app.use('/api/users', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

const port = serverConfig.port ?? 3001;

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
