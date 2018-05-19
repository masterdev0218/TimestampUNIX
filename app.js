
// init project
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var fs = require('fs');

//create instance of express. Instantiate bodyParser and cors
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

//GET call
app.get('/', function(req,res){
  var fileName = path.join(__dirname, 'index.html');
  res.sendFile(fileName, function(err) {
    if (err){
     console.log(err);
      res.status(err.status).end();
    }
    else {
     console.log('Sent:', fileName); 
    }
  });
});

//GET call for data parameters
app.get('/:datestring', function(req,res){
  //gets unix code user input to be formatted
  var dateValue = req.params.datestring;
  
  //Date formatting options
  var format = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  if(isNaN(dateValue)){
    var naturalDate = new Date(dateValue);
    
    if(naturalDate == "Invalid Date"){app
      naturalDate = null;
      unixDate = null;
    }
    else{
      naturalDate = naturalDate.toLocaleDateString("en-us", format);    
      var unixDate = new Date(dateValue).getTime()/1000;
    }
  }
  else{
    var unixDate = dateValue;
    var naturalDate = new Date(dateValue*1000);
    naturalDate = naturalDate.toLocaleDateString("en-us", format);
  }
  
  res.json({unix: dateValue, natural: naturalDate}); 
});

var port = process.env.PORT || 8080; //set port
// listen for requests
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
