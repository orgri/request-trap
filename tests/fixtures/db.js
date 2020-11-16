const path = require('path');
const dotenv = require('dotenv');
const Requests = require('../../models/requests');

dotenv.config({ path: path.resolve('./config/test.env') });

const setupDB = async () => {
  await Requests.deleteMany();
};

module.exports = {
  setupDB,
};
