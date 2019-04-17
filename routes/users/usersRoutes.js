const express = require('express');
const router = express.Router();
const Users = require('../../models/userModel');

const restricted = require('../../commonMiddleware/restricted');
const db = require('../../data/dbConfig');

router.get('/', restricted, async (req, res) => {
  try {
    const users = await db('users');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'database error' });
  }
});

router.get('/:id', restricted, async (req, res) => {
  const { id } = req.params;
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

router.get('/:id/articles', restricted, async (req, res) => {
  const { id } = req.params;
  try {
    const joined = await db('articles')
      .join('users', 'articles.user_id', '=', 'users.id')
      .select(
        'articles.id',
        'articles.title',
        'articles.url',
        'articles.img',
        'articles.user_id'
      )
      .where({ user_id: id });
    res.status(200).json(joined);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
