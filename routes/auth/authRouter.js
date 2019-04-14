const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../../models/userModel');

router.post('/register', async (req, res) => {
  const user = req.body;

  if (!user.username || !user.password) {
    res
      .status(406)
      .json({ message: 'Must include a username and passowrd to register' });
  }

  const hash = bcrypt.hashSync(user.password, 11);
  user.password = hash;

  try {
    const added = await Users.add(user);
    if (added) {
      res.status(201).json(added); //successful registration returns user info
    } else {
      res.status(405).json({ error: 'User already registered' });
    }
  } catch (error) {
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
