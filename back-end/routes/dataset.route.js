const express = require('express');
const datasetRoute = express.Router();

const Dataset = require('../models/Dataset');


datasetRoute.route('/dataset').get((req, res) => {
  Dataset.find((error, data) => {
    if (error) {
      return res.status(500).json(error);
    } else {

      return res.json(data)
    }
  })
})



datasetRoute.route('/dataset').post((req, res) => {
  Dataset.create(req.body, (error, data) => {
    if (error) {
      return res.status(500).json(error);
    } else {

      return res.json(data)
    }
  })
})

module.exports = datasetRoute;
