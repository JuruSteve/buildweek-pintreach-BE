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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const article = await Articles.findById(id);
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ message: 'article does not exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'database error' });
  }
});

module.exports = router;
