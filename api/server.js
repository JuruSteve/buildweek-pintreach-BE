const express = require('express');
const authRoutes = require('../routes/auth/authRouter.js');
const usersRoutes = require('../routes/users/usersRoutes.js');
const articlesRoutes = require('../routes/articles/articlesRoutes.js');

const configMiddleware = require('./middleware');

const server = express();

//apply helmet, cors, express.json middleware to server
configMiddleware(server);

//routes:
server.use('/auth', authRoutes);
server.use('/users', usersRoutes);
server.use('/articles', articlesRoutes);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'sanity check passed!' });
});

module.exports = server;
