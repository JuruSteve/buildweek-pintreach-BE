const router = require('express').Router();
const bcrypt = require('bcryptjs');

const tokenService = require('./tokenService');
const Auth = require('../../models/userModel');

router.post('/register', async (req, res) => {
  let user = req.body;

  if (!user.username || !user.password || !user.name || !user.email) {
    return res
      .status(406)
      .json({ message: 'Must include a username and password to register' });
  }

  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  try {
    const register = await Auth.add(user);
    if (register) {
      res.status(201).json(register);
    } else {
      res
        .status(400)
        .json({ message: 'user already registered' })
        .end();
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/login', async (req, res) => {
  let { username, password } = req.body;
  try {
    const user = await Auth.findBy(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = tokenService.generateToken(user);
      res.status(202).json({
        message: `welcome ${user.username}`,
        id: user.id,
        token,
      });
    } else {
      res
        .status(401)
        .json({ error: 'Invalid Credentials. Please try again' })
        .end();
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'server error, please try logging in again' });
  }
});

module.exports = router;
