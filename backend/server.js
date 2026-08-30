const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');
const attractionRoutes = require('./routes/attractionRoutes');


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/attractions', attractionRoutes);



app.get('/', (req, res) => {
  res.send('AI Travel Planner backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});