import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/user.js';
import bodyParser from 'body-parser';
import cors from 'cors';
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.listen(3001, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', UserRouter);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});