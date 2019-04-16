const db = require('../../data/dbConfig');
const Articles = require('../../models/articlesModel');

const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const articles = await db('articles');
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: 'database error' });
  }
});

router.post('/', async (req, res) => {
  const article = req.body;
  try {
    const added = await Articles.add(article);
    res.status(200).json(added);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
