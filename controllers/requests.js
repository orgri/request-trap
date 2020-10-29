const express = require('express');
const router = express.Router();

router.all('/:id', async (req, res) => {
  try {
    res.redirect('/');
    res.status(201).send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/:id/requests', async (req, res) => {
  try {
    const content = {};

    content.date = new Date().toLocaleString();
    content.ip = req.ip;
    content.method = req.method;
    content.scheme = {};
    content.query = req.query;
    content.params = req.path;
    content.body = req.body;
    content.cookies = req.cookies;
    content.headers = req.headers;

    res.render('requests', {
      header: 'Requests:',
      content: JSON.stringify(content, null, 2)
    });
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;