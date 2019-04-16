const router = require('express').Router();
const db = require('../../data/dbConfig');

router.get('/', async (req, res) => {
  try {
    const articles = await db('articles');
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: 'database error' });
  }
});

module.exports = router;
