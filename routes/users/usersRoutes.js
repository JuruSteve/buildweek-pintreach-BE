const router = require('express').Router();
const db = require('../../data/dbConfig');

router.get('/', async (req, res) => {
  try {
    const users = await db('users');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'database error' });
  }
});
