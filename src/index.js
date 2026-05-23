import express from 'express';
import reminderRoutes from './routes/reminderRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()) // Middleware to parse JSON
app.use('/reminders', reminderRoutes)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})