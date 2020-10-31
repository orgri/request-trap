const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true
  },
  method: {
    type: String
  },
  scheme: {
    type: Object
  },
  query: {
    type: Object
  },
  params: {
    type: Object
  },
  body: {
    type: Object
  },
  cookies: {
    type: Object
  },
  headers: {
    type: Object
  }
}, {
  timestamps: true
});

const Requests = mongoose.model('Requests', requestSchema);

module.exports = Requests;