const express = require('express');
const bodyParser = require('body-parser');
const  moment = require('moment');
const https = require('https');
const app = express();
const port = process.env.PORT || 5000;
const path='/api/'


var fs = require('fs');
var data;


// A test function to  validate the use of a call to a child process
function callName(data) { 
const wstream = fs.createWriteStream('./PIPE')
  wstream.write('')
  wstream.end()
} 

// Compare function to sort the history of the alert before responding
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
  callName();
  console.log('initial data sent to client');
});


/******************************************************************************
POST: sush now
******************************************************************************/
app.post(path+'sush-now', (req,res) => {
  // Experimental 
  // Do a get request on port5000 of the Raspberry Pi connected to the speakers
  const options = {
    hostname: 'http://192.168.1.183',
    port: 5000,
    path: '/sushnow',
    method: 'GET'
  }
  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      process.stdout.write(d)
    })
  })
req.on('error', error => {
  console.error(error)
})

req.end()



// End of experimental
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


/******************************************************************************
TIME checking function
******************************************************************************/
// The server is going to check if it is supposed to be active every 1 minute
var minutes = 1, the_interval = minutes * 60 * 1000;
// TODO: for development purpose I am changing that to be every 5 sec but really
//      needs to be 1 minutes interval


// Function that checks if the system need to be active now
var isSystemActive=function(start_time,stop_time,now_time,is_next_day){
  var hour_start=start_time.hour()
  var hour_stop=stop_time.hour()
  var hour_now=now_time.hour()
  var minute_start=start_time.minute()
  var minute_stop=stop_time.minute()
  var minute_now=now_time.minutes()

  //console.log(is_next_day)
  if(!is_next_day){// the same day  ( i am gonna try all the case where it is on) 
    // I do not cross midnight
    // --> system is active if  start<now<stop
    if( hour_start < hour_now && hour_now< hour_stop){
      console.log('based on hours')
      return true
    }else if(hour_start==hour_now && hour_now<hour_stop){ // the start hour is the same a the current hour
      if(minute_start<=minute_now){
        console.log('based on minute start')
        return true
      }else{
        console.log('based on minute start')
        return false
      }
    }else if(hour_start<hour_now && hour_now==hour_stop){
      if(minute_now<minute_stop){
        console.log('based on minute stop')
        return true
      }else{
        console.log('based on minute stop')
        return false
      }
    }else if(hour_start==hour_now && hour_now==hour_stop){
      if(minute_start<=minute_now &&  minute_now<minute_stop){
        console.log('same hour call on minute') 
        return true
      }else{
        console.log('same hour call on minute') 
        return false
      }
    }else{
      return false
    }
  }else{
    // I do cross midnight
    // --> system is active if now > start OR  now < stop
    if(hour_start<hour_now || hour_now<hour_stop){
      console.log('call based on hour start')
      return true 
    }else if(hour_start==hour_now && hour_stop<hour_now){
      if(minute_start<=minute_now){
        console.log('call based on minute start')
        return true
      }else{
        console.log('call based on start minutes')
        return false
      }
    }else if(hour_stop==hour_now && hour_now<hour_start){
      if(minute_now<minute_stop){
        console.log('call based on stop minute')
        return true
      }else{
        console.log('call based on stop minute')
        return false
      }
    }else if(hour_stop==hour_now && hour_start==hour){
        if( minute_start!=minute_stop){
          console.log('we have a problem here !') 
          return false
        }else{
          console.log("running 24/7")
          return true 
        }
    }else{
      console.log('cased not done')
      return false
    }
  }
}

var isNextDay=function(start_time,stop_time){
  if(stop_time.hour()<start_time.hour()){
    return true
  }else if(stop_time.hour()==start_time.hour()){
    if(stop_time.minute()<=start_time.minute()){
      return true
    }else{
      return false
    }
  }else{
    return false
  }
}

the_interval=5000
setInterval(function() {
  data = JSON.parse(fs.readFileSync('./data/Alert.json', 'utf8'));

  var new_moment_time=moment() // Current time 
  
  if(data.status){ // Check if the system is supposed to be on/off

  // check if we are asking the system to be on overnight
  var is_next_day=isNextDay(moment(data.hour_start),moment(data.hour_stop))
  isActive=isSystemActive(moment(data.hour_start),moment(data.hour_stop),new_moment_time,is_next_day)
  }else{
    console.log('The system is off')
  }
  // now check if the system need to be on 
}, the_interval);







