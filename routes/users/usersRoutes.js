const express = require('express');
const router = express.Router();
const Users = require('../../models/userModel');

const db = require('../../data/dbConfig');

router.get('/', async (req, res) => {
  try {
    const users = await db('users');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'database error' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const users = await Users.findById(id);
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: 'user does not exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'database error' });
  }
});

module.exports = router;
