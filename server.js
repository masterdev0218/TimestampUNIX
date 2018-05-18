
// init project
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

//create instance of express. Instantiate bodyParser and cors
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

//GET call for data parameters
app.get('/date/:dateValue', function(req,res,next){
  //gets unix code user input to be formatted
  var dateValue = req.params.dateValue;
  
  //Date formatting options
  var optionsDateFormatting = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  if(isNaN(dateValue)){
    var naturalDate = new Date(dateValue);
    
    if(naturalDate == "Invalid Date"){
      naturalDate = null;
      unixDate = null;
    }
    else{
      naturalDate = naturalDate.toLocaleDateString("en-us", optionsDateFormatting);    
      var unixDate = new Date(dateValue).getTime()/1000;
    }
  }
  else{
    var unixDate = dateValue;
    var naturalDate = new Date(dateValue*1000);
    naturalDate = naturalDate.toLocaleDateString("en-us", optionsDateFormatting);
  }
  
  res.json({unix: dateValue, natural: naturalDate}); 
});

// listen for requests
app.listen(3010, function () {
  console.log('Your app is listening');
});
