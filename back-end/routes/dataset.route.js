const express = require('express');
const datasetRoute = express.Router();
const db = require("mongoose");
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



datasetRoute.post("/search", async (req, res) => {
  if (req.url.length && req.url.substring(8).length) {
    const searchParam = JSON.parse('{"' + req.url.substring(8).replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) });

    const dataset = await (await Dataset.distinct("DATASET")).filter(e => e.toLowerCase().includes(searchParam.data_name.toLowerCase()));

    return res.status(200).send(dataset)
  }


  return res.status(400).send({ error: "No name was found" })

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
