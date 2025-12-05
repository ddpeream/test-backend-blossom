import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { testConnection } from './config/database';
import { testRedisConnection } from './config/redis';
import { loggingMiddleware } from './middlewares/logging.middleware';
import { createApolloServer } from './graphql';
import cacheService from './cache/cache.service';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(loggingMiddleware);

// Health Check Endpoint
app.get('/health', (req: Request, res: Response) => {
  const redisConnected = cacheService.isConnected();
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running 🚀',
    redis: redisConnected ? 'connected' : 'disconnected'
  });
});

const startServer = async () => {
  // Conectar a PostgreSQL
  await testConnection();
  
  // Conectar a Redis
  await testRedisConnection();
  
  // Inicializar Apollo Server
  await createApolloServer(app);
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();

export default app;
