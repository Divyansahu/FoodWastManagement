const mongoose = require('mongoose');

let isConnected = false;

const connection = async () => {
    if (isConnected) {
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/foodwastemgmt');
        isConnected = db.connections[0].readyState === 1;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connection;