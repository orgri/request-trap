const express = require('express');
const router = express.Router();
const Requests = require('../models/requests');
const io = require('../helpers/socket').socketConnection.io;

const LIMIT_DEFAULT = 10;

router.all('/:id', async (req, res) => {
  const request = new Requests({
    id: req.params.id,
    ip: req.ip,
    method: req.method,
    query: req.query,
    params: req.params,
    body: req.body,
    cookies: req.cookies,
    headers: req.headers
  });

  try {
    await request.save();
    io.sockets.to(request.id).emit('messages', request);
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id/requests', async (req, res) => {
  const id = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.perPage) || LIMIT_DEFAULT;
  const skip = limit * (page - 1);
  const content = {
    header: 'Requests :',
    list: `There are no requests for "${id}"`
  };

  try {
    const reqList = await Requests
      .find({ id: id })
      .sort({ createdAt: 'desc' })
      .select('-_id -__v')
      .skip(skip)
      .limit(limit);

    if (reqList.length) {
      content.header = `Requests to "${id}":`;
      content.list = JSON.stringify(reqList, null, 2);
    }

    res.render('requests', content);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;