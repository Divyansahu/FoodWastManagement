require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');

const app = express();
const connection = require('./config/db');
const User = require('./Models/users');
const authRoutes = require('./Routes/Authroutes');
const jwt = require('jsonwebtoken');
const Userroutes = require('./Routes/Userroutes');
const Donationroutes = require('./Routes/Donationroutes');
const Notificationroutes = require('./Routes/Notificationroutes');
const Adminroutes = require('./Routes/Adminroutes');
app.use(cors({
    origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL, "http://localhost:5173"] : true,
    credentials: true
}));
app.use(express.json());

// Ensure MongoDB is connected before processing requests
app.use(async (req, res, next) => {
    await connection();
    next();
});

app.use('/api/auth',authRoutes);
app.use('/api/user',Userroutes);
app.use('/api/donation',Donationroutes)
app.use('/api/notifications', Notificationroutes);
app.use('/api/admin', Adminroutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
