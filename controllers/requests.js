const express = require('express');
const router = express.Router();
const Requests = require('../models/requests');
const { socketConnection: { io } } = require('../helpers/socket');

const LIMIT_DEFAULT = 25;

router.all('/:id', async (req, res, next) => {
  const request = new Requests({
    id: req.params.id,
    ip: req.ip,
    method: req.method,
    scheme: req.protocol,
    query: req.query,
    params: req.params,
    body: req.body,
    cookies: req.cookies,
    headers: req.headers
  });

  request.save()
    .then((data) => {
      io.sockets.to(request.id).emit('newData', data);
      res.status(201).send(data);
    })
    .catch(next);
});

router.get('/:id/requests', async ({
  params: { id },
  query: { page, limit }
}, res, next) => {
  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || LIMIT_DEFAULT;
  const skip = limit * (page - 1);

  Requests
    .find({ id })
    .sort({ createdAt: 'desc' })
    .skip(skip)
    .limit(limit)
    .then((data) => {
      res.render('requests', { data, id });
    })
    .catch(next);
});

module.exports = router;