import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Status from './components/status.js'
import Hours from './components/hours.js'
import History from './components/history.js'
import {Container} from 'react-bootstrap'

import './App.css';


class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };
  
render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>

        <p>{this.state.response}</p>
        <Container>
          <Status/>
          <Hours/>

          {/*  Part to delet when server is ready */}
          {/*
        <Form onSubmit={this.handleSubmit}>
          <Form.Label>Request to post to the server</Form.Label>
          <Form.Control type="text" placeholder="Enter Something"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <Button type="submit">Submit</Button>
        </Form>
        <Alert>{this.state.responseToPost}</Alert>
        */}
          {/*  End of the part to delet */}
          <History/>
        </Container>

      </div>
    );
  }
}

export default App;
