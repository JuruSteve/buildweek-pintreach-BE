const express = require('express');
const authRoutes = require('../routes/auth/authRouter.js');
const db = require('../data/dbConfig.js');

const configMiddleware = require('./middleware');

const server = express();

//apply helmet, cors, express.json middleware to server
configMiddleware(server);

//routes:
server.use('/auth', authRoutes);

server.get('/users', async (req, res) => {
  try {
    const users = await db('users');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ erro: 'database error' });
  }
});

server.get('/', (req, res) => {
  res.status(200).json({ message: 'sanity check passed!' });
});

module.exports = server;
