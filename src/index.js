import express from 'express';
import dotenv from 'dotenv';
import reminderRoutes from './routes/reminderRoutes.js';
import errorHandler from './middlewares/errorHandlerMiddleware.js';
import redisClient from './config/redis.js';

dotenv.config();

const app = express();

app.use(express.json());

async function startServer() {
  try {
    await redisClient.connect();
    console.log('✅ Redis Connected');

    app.use('/reminders', reminderRoutes);

    app.use(errorHandler);

    const PORT = process.env.PORT || 3001;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Startup Error:', err);
  }
}

startServer();