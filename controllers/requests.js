const express = require('express');
const router = express.Router();
const Requests = require('../models/requests');
const { socketConnection : { io } } = require('../helpers/socket');

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

  try {
    await request.save();
    io.sockets.to(request.id).emit('newData', request);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
});

router.get('/:id/requests', async ({
  params: { id },
  query: { page, limit }
}, res, next) => {
  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || LIMIT_DEFAULT;
  const skip = limit * (page - 1);

  try {
    const data = await Requests
      .find({ id })
      .sort({ createdAt: 'desc' })
      .skip(skip)
      .limit(limit);

    res.render('requests', { data, id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;