
// init project
var express = require('express'); //a minimal and flexible node.js web application framework
var bodyParser = require('body-parser'); //Parse incoming request bodies in a middleware before your handlers
var cors = require('cors'); //Cross Origin Resource Sharing, allows use of REST API served from a different origin
var path = require('path'); //utilities for working with file and directory paths
var fs = require('fs'); //API for interacting with the file system

//create instance of express. Instantiate bodyParser and cors
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

//GET call
app.get('/', (req,res) => {
  var fileName = path.join(__dirname, 'index.html');
  res.sendFile(fileName, (err) => {
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
app.get('/:dateStr', (req,res) => {
  //gets unix code user input to be formatted
  var dateValue = req.params.dateStr;
  
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
app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});
