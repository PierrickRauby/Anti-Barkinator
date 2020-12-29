const express = require('express');
const bodyParser = require('body-parser');
const  moment = require('moment');
const app = express();
const port = process.env.PORT || 5000;
const path='/api/'


var fs = require('fs');
var data;


var compare = function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
          if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                  // property doesn't exist on either object
                  return 0;
                }

          const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
          const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

          let comparison = 0;
          if (varA > varB) {
                  comparison = 1;
                } else if (varA < varB) {
                      comparison = -1;
                          }
          return (
                  (order === 'desc') ? (comparison * -1) : comparison
                );
        };
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// TODO: not sure if I use the following line in my code, so wait before 
// deleting it

//app.get(path+'data', (req,res)=>{
  //data = JSON.parse(fs.readFileSync('./data/Alert.json', 'utf8'));
  //res.send({express:data});
//});
//

/******************************************************************************
GET : initialize client
******************************************************************************/
app.get(path+'hello', (req,res)=>{
  data = JSON.parse(fs.readFileSync('./data/Alert.json', 'utf8'));
  res.send({express:data});
  console.log('initial data sent to client');
});


/******************************************************************************
POST: sush now
******************************************************************************/
app.post(path+'sush-now', (req,res) => {
  data = JSON.parse(fs.readFileSync('./data/Alert.json', 'utf8'));
  console.log(req.body.hour)
  var newAlert={hours:req.body.hour,
    message:"Dog sushed",
    confidence:'-',
    triger:0
  }
  data.alert_log.push(newAlert)
  data.alert_log.sort(compare('hours','desc'))
  var jsonContent = JSON.stringify(data);
  fs.writeFile('./data/Alert.json', jsonContent, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }})
  res.send({express:data});
});


/******************************************************************************
POST: update hours of operation
******************************************************************************/
app.post(path+'update-hours', (req,res) => {
  data = JSON.parse(fs.readFileSync('./data/Alert.json', 'utf8'));
  if(req.body.start_stop==='start'){
    data.hour_start=req.body.hour
  }else{
    data.hour_stop=req.body.hour
  }
  var jsonContent = JSON.stringify(data);
  fs.writeFile('./data/Alert.json', jsonContent, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }})
  res.send({express:data});
});


/******************************************************************************
POST: update status ON/OFF
******************************************************************************/
app.post(path+'update-status',(req,res)=>{
  var new_state=!req.body.post
  data = JSON.parse(fs.readFileSync('./data/Alert.json', 'utf8'));
  data.status=new_state
  var jsonContent = JSON.stringify(data);
  fs.writeFile('./data/Alert.json', jsonContent, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
  })
  res.send({express:data});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
