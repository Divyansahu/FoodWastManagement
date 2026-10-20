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
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/user',Userroutes);
app.use('/api/donation',Donationroutes)
app.use('/api/notifications', Notificationroutes);
app.use('/api/admin', Adminroutes);
connection();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
