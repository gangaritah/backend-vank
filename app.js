// index.js (antes server.js o app.js)
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import user from './routes/user.js';

import  { connectSequelize } from './database/sequelize.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express()
  .use(bodyParser.json())
  .use(cookieParser(process.env.COOKIE_SECRET))
  .use(cors({
    origin: '*',
    credentials: true,
    methods: '*',
    allowedHeaders: '*'
  }));

app.use('/user', user);


async function startServer() {
  try {
    await connectSequelize();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error iniciando la aplicación:', error);
  }
}

startServer();