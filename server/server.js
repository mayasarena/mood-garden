const pool = require('./db');
const cors = require('cors');
const express = require('express');
require('dotenv').config();
const userController = require('./controllers/userController');
const moodEntriesController = require('./controllers/moodEntriesController');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Test database connection
pool.connect()
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.error('PostgreSQL connection error:', err));

// Define user routes
const userRouter = express.Router();
userRouter.get('/:id', userController.getUser);
userRouter.post('/login', userController.getOrCreateUserByGoogleId);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.patch('/:id/points', userController.updateUserPoints);
userRouter.patch('/:id/purchased-plants', userController.addPurchasedPlant);

// Define mood entries routes
const moodEntriesRouter = express.Router();
moodEntriesRouter.get('/:userId', moodEntriesController.getMoodEntries);
moodEntriesRouter.post('/', moodEntriesController.createMoodEntry);
moodEntriesRouter.put('/:id', moodEntriesController.updateMoodEntry);
moodEntriesRouter.patch('/:id/note', moodEntriesController.updateMoodNote);

// Use routers
app.use('/api/users', userRouter);
app.use('/api/mood-entries', moodEntriesRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Send a message
app.get('/', (req, res) => {
  res.send('Server is running!');
});