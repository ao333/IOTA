const express = require("express");
const bodyParser = require("body-parser");
const cors = require('./cors');
const Record = require('../models/Record');

const chartRouter = express.Router();
chartRouter.use(bodyParser.json());

//send general statistics to client
chartRouter.route('/')
  .get(cors.corsWithOptions, (req, res, next) => {
    Record.find({}, function (error, docs) {
      if(error){
        return next(error);
      }
      let submit_content = {};
      let time = [];
      let MeanConTime = [];
      let ValuePerSec = [];
      let Non_value_Percent = [];
      let ValuePerTran = [];
      for(let i = 0; i < docs.length; i++){
        time.push(docs[i].createdAt);
        MeanConTime.push(docs[i].MeanConTime);
        ValuePerSec.push(docs[i].ValuePerSec);
        Non_value_Percent.push(docs[i].Non_value_Percent);
        ValuePerTran.push(docs[i].ValuePerTran);
      }
      submit_content.time = time;
      submit_content.MeanConTime = MeanConTime;
      submit_content.ValuePerSec = ValuePerSec;
      submit_content.Non_value_Percent = Non_value_Percent;
      submit_content.ValuePerTran = ValuePerTran;
      res.setHeader('contentType', 'application/json');
      res.statusCode = 200;
      res.json(submit_content);
    })

  });

module.exports = chartRouter;