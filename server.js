// init project
const express = require('express'); //a minimal and flexible node.js web application framework
const bodyParser = require('body-parser'); //Parse incoming request bodies in a middleware before your handlers
const cors = require('cors'); //Cross Origin Resource Sharing, allows use of REST API served from a different origin
const path = require('path'); //utilities for working with file and directory paths
const fs = require('fs'); //API for interacting with the file system
const port = process.env.PORT || 8080; //set port

//create instance of express. Instantiate bodyParser and cors
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint for no date entry...
app.get("/api/timestamp/", function (req, res) {
  let dateNow = new Date()
  let unixDateNow = dateNow
  res.json({
    unix: dateNow.getTime(),
    utc: dateNow.toUTCString()
  });
});

//when a GET request is made to the homepage, respond with the index.html file,
//If error, log an error, else log 'sent'
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

//GET call for 'date_string' data parameters
app.get("/api/timestamp/:date_string", (req,res) => {
  //gets unix code user input to be formatted
  var dateValue = req.params.date_string;

  //check if data passed in is not a number then assume it is a date
  if(isNaN(dateValue)){
    var naturalDate = new Date(dateValue);
    console.log(naturalDate)

    if(naturalDate == "Invalid Date"){
      naturalDate = "error";
      unixDate = "invalid date";
    } else {
      var unixDate = new Date(dateValue).getTime()/1000;
      naturalDate = naturalDate.toUTCString()
    }
  }

  //if it is a number then it must be Unix format so derive natural date from that
  else{
    var unixDate = dateValue;
    var naturalDate = new Date(dateValue*1000);
    naturalDate = naturalDate.toUTCString()
  }

  //output the Unix and natural date in JSON.
  res.json({
    unix: unixDate,
    utc: naturalDate
  });
});

const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' +port);
});