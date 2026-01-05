import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import scheduleRoutes from './routes/scheduleRoutes.js';
import {connectDB} from './config/db.js'

connectDB();

export const app = express();

app.use((req, res, next) => {
  console.log(`📡 New Request: ${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/schedule', scheduleRoutes);

app.get('/', (req, res)=> {
    res.send('Testing')
});