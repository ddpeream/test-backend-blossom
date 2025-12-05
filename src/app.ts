import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { testConnection } from './config/database';
import { loggingMiddleware } from './middlewares/logging.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(loggingMiddleware);

// Health Check Endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is running 🚀' });
});

const startServer = async () => {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();

export default app;
