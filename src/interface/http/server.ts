import express from 'express';
import dotenv from "dotenv"
dotenv.config()

const app = express();
import container from '../../../di-setup';
const { database, messenger } = container.cradle;

database();
messenger.createChannel();

const PORT = process.env.PORT || 4000

app.use(express.json());
import customerRouter from './routes/customer.routes';

// Set test page
app.get('/', (req, res) => {
  res.send('<h1>Customer Service<h1>');
});

app.use('/v1/customers', customerRouter);

app.listen(PORT, () => {
  console.log(`Customer Service listening on Port ${PORT}...`);
});
