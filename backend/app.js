import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import menuRoutes from './routes/menuRoutes.js';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/menu', menuRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});