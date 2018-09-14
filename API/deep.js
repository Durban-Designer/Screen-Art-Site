var express = require("express");
var mongodb = require("mongodb");
var _ = require("lodash");
var bodyParser = require("body-parser");
var app = express();
var router = express.Router();
app.use(bodyParser.json());
var fs = require('fs');
var multiparty = require('multiparty');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
var path = __dirname + "/img/";

router.post("/", (req,res) => {
  function label (location) {
    client
    .textDetection(location)
    .then(results => {
      console.log(location);
      fs.unlinkSync(location);
      const detections = results[0].fullTextAnnotation.text;
      res.send(detections);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  }
  var form = new multiparty.Form();
  var fileName
  form.on('field', function(name, value) {

  });
  form.on('part', function(part) {

  });
  form.parse(req, function(err, fields, files) {
    let part = files.file[0].path
    for(let i = 0; i < part.length; i++) {
      if (part[i] === '/' && part[(i + 1)] === '/') {
        part.splice(i, 1);
      }
    }
    label(part)
    console.log('Upload completed!');
  });
})

module.exports = router;
