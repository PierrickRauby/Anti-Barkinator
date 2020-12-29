const express = require('express');
const bodyParser = require('body-parser');
const  moment = require('moment');
const app = express();
const port = process.env.PORT || 5000;
const path='/api/'


var fs = require('fs');
var data;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(path+'data', (req,res)=>{
  data = JSON.parse(fs.readFileSync('./data/Alert.json', 'utf8'));
  res.send({express:data});
});


app.get(path+'hello', (req,res)=>{
  data = JSON.parse(fs.readFileSync('./data/Alert.json', 'utf8'));
  res.send({express:data});
  console.log('initial data sent to client');
});

app.post(path+'update-hours', (req,res) => {
  data = JSON.parse(fs.readFileSync('./data/Alert.json', 'utf8'));
  if(req.body.start_stop==='start'){
    data.hour_start=req.body.hour
  }else{
    data.hour_stop=req.body.hour
  }

  console.log("Start time")
  console.log(data.hour_start)
  console.log("Stop time")
  console.log(data.hour_stop)
  var jsonContent = JSON.stringify(data);
  fs.writeFile('./data/Alert.json', jsonContent, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }})
  res.send({express:data});
});

app.post(path+'update-status',(req,res)=>{
  var new_state=!req.body.post
  data = JSON.parse(fs.readFileSync('./data/Alert.json', 'utf8'));
  data.status=new_state
  var jsonContent = JSON.stringify(data);
  console.log(jsonContent);
  fs.writeFile('./data/Alert.json', jsonContent, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    } 
    console.log(data)
  })
  res.send({express:data});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
