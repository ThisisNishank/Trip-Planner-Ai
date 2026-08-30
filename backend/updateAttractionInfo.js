const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Destination = require('./models/Destination');
const attractionInfo = require('./data/attractionInfo');

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    for (const destinationName of Object.keys(attractionInfo)) {
      const destination = await Destination.findOne({
        name: new RegExp(`^${destinationName}$`, 'i'),
      });

      if (!destination) {
        console.log(`Destination not found: ${destinationName}`);
        continue;
      }

      let updatedCount = 0;
      destination.attractions.forEach((attraction) => {
        const info = attractionInfo[destinationName][attraction.name];
        if (info) {
          attraction.detailedInfo = info;
          updatedCount++;
        }
      });

      await destination.save();
      console.log(`Updated ${updatedCount} attractions for ${destinationName}`);
    }

    console.log('All done!');
    process.exit();
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
};

run();