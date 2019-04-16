const express = require('express');
const authRoutes = require('../routes/auth/authRouter.js');
const usersRoutes = require('../routes/users/usersRoutes.js');

const db = require('../data/dbConfig.js');

const configMiddleware = require('./middleware');

const server = express();

//apply helmet, cors, express.json middleware to server
configMiddleware(server);

//routes:
server.use('/auth', authRoutes);
server.use('/users', usersRoutes);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'sanity check passed!' });
});

module.exports = server;
