
// init project
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

//create instance of express. Instantiate bodyParser and cors
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res){
  console.log('URL works');
});

// listen for requests
app.listen(3001, function () {
  console.log('Your app is listening');
});
