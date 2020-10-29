const express = require('express');
const router = express.Router();
const requests = require('./requests');

router.use(requests);

router.get('/', (req, res) => {
  res.render('index', {
    header: 'Instructions:',
    content: 'Some instructions here will be added futher.'
  });
});

router.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    error: '404! Page not found.'
  });
});

module.exports = router;