import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Status from './components/status.js'
import Hours from './components/hours.js'
import History from './components/history.js'
import {Container} from 'react-bootstrap'
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.statusChange = this.statusChange.bind(this);
    this.hourChange=this.hourChange.bind(this);
    this.state = {
      status:'',
      hourStart:'',
      hourStop:'',
      alertLog:[]
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({
        status:res.express.status,
        hourStart:res.express.hour_start,
        hourStop:res.express.hour_stop,
        alertLog: res.express.alert_log
      }))
      .catch(err => console.log(err));
  }
  callApi = async () => { // Initialization of API
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  
  handleChangeHour = async (start_stop,new_time) => {
    const response = await fetch('/api/update-hours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ start_stop:start_stop,
        hour: new_time }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  hourChange(start_stop,new_time){
    console.log(start_stop)
    console.log(new_time)
    this.handleChangeHour(start_stop,new_time)
      .then(res =>{this.setState({
        status:res.express.status,
        hourStart:res.express.hour_start,
        hourStop:res.express.hour_stop,
        alertLog: res.express.alert_log
      });
        console.log(this.state)}
      )
      .catch(err => console.log(err));
  }


  handleChangeState = async e => {
    const response = await fetch('/api/update-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.status }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };


  statusChange(element){
    var new_status=!this.state.status
    this.setState({status:new_status});
    this.handleChangeState()
      .then(res =>this.setState({
        status:res.express.status,
        hourStart:res.express.hour_start,
        hourStop:res.express.hour_stop,
        alertLog: res.express.alert_log
      })
      )
      .catch(err => console.log(err));
  }

  handleChangeState = async e => {
    const response = await fetch('/api/update-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.status }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <Container>
          <Status status={this.state.status} statusChange={this.statusChange} />
          <Hours hourStart={this.state.hourStart} hourStop={this.state.hourStop} hourChange={this.hourChange} />
          <History alertLog={this.state.alertLog}/>
        </Container>
      </div>
    );
  }
}

export default App;
