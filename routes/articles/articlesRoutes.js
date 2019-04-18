const db = require('../../data/dbConfig');
const Articles = require('../../models/articlesModel');
const restricted = require('../../commonMiddleware/restricted');

const router = require('express').Router();

router.get('/', restricted, async (req, res) => {
  try {
    const articles = await db('articles');
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: 'database error' });
  }
});

router.post('/', restricted, async (req, res) => {
  const article = req.body;
  try {
    const added = await Articles.add(article);
    res.status(200).json(added);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', restricted, async (req, res) => {
  const { id } = req.params;
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

router.delete('/:id', restricted, async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db('articles')
      .where({ id })
      .del();
    if (deleted) {
      res.status(200).json({ message: 'article deleted' });
    } else {
      res.status(404).json({ message: 'article does not exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'database error' });
  }
});

router.put('/:id', restricted, async (req, res) => {
  const { id } = req.params;
  const edits = req.body;
  try {
    const edited = await db('articles')
      .where({ id })
      .update(edits);
    if (edited) {
      const toReturn = await db('articles')
        .where({ id })
        .first();
      res.status(200).json(toReturn);
    } else {
      res.status(404).json({ message: 'article does not exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'database error' });
  }
});

module.exports = router;
