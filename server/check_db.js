const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ContactInfo = require('./models/ContactInfo');

dotenv.config();

const checkDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    const info = await ContactInfo.findOne();
    console.log('Contact Info:', JSON.stringify(info, null, 2));
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkDB();
