const mongoose = require('mongoose');

const DatasetSchema = new mongoose.Schema({
  DATASET: [{
    type: String
  }],
});

module.exports = mongoose.model('DATASET', DatasetSchema)
