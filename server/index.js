import dotenv from 'dotenv';
import connectToDatabase from './database.js';
import express from 'express';
import orderRoutes from './routes/orderRoutes.js';

//Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Server runs on port ${port}.`);
});
