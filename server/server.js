require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./db');
const { authRoutes } = require('./auth');
const { setupSocket } = require('./socket');

const app = express();
const server = http.createServer(app);

connectDB(); // Connect to MongoDB

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes); // Authentication routes
app.use(express.static('public')); // Serve static files
app.use('/secure', (req, res) => res.sendFile(__dirname + '/../sources/main.html')); // Serve main.html

setupSocket(server); // Attach Socket.io

server.listen(3000, () => console.log('Server running on port 3000'));
