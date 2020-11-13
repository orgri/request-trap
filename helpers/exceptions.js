const errorHandler = (err, req, res, next) => {
  return res.status(500).json({ error: err.toString() });
};

module.exports = { errorHandler };
