// server.js
// where your node app starts

// init project
const express = require('express');
const moment = require('moment');
const path = require('path');
const app = express();
const data = {
  'unix': null,
  'natural': null
};
app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/views'));

app.get('/',function(req,res){
  res.sendFile('/index.html');
  //__dirname : It will resolve to your project folder.
});

app.get("/:q", function (request, response) {
  //check if unix
  const paramPassed = request.params.q;
  if(paramPassed > 0) {
    console.log('unix');
    data.unix = paramPassed;
    data.natural = moment.unix(paramPassed).format("MMMM, Do YYYY");
    response.send(data);
    
  }

  if(moment(paramPassed).isValid()){
    console.log('natural date');
    data.unix = moment(paramPassed).unix();
    data.natural = paramPassed;
    response.send(data);
  }
  
  response.send(data);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
