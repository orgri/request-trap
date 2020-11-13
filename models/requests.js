const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
  },
  method: String,
  ip: String,
  scheme: String,
  query: Object,
  params: Object,
  body: Object,
  cookies: Object,
  headers: Object,
}, {
  timestamps: true
});

module.exports = mongoose.model('Requests', requestSchema);
