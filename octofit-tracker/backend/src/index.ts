import express from 'express';
import mongoose from 'mongoose';
import apiRoutes from './routes/api.js';

const app = express();
const port = 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-tracker-backend' });
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB at', mongoUri);

    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit Tracker API listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

startServer();
