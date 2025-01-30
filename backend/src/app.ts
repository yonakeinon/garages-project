import express from 'express';
import cors from 'cors';
import connectDB from './config/database';
import garageRoutes from './routes/garage.routes';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/garages', garageRoutes);

export default app;
