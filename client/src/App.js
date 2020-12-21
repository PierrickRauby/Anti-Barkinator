import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Button, Alert, Form, Table} from 'react-bootstrap'

import './App.css';

class Status extends Component {
  state= {
    status_state:'ON'
  };
render(){
  console.log("rendering the status")
  return(
    <p> The system is currently</p>
  )
}
}



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
  console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <h1> The Anti-Barkinator</h1>
        </header>

        <p>{this.state.response}</p>
        <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Label>Request to post to the server</Form.Label>
          <Form.Control type="text" placeholder="Enter Something"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <Button type="submit">Submit</Button>
        </Form>
        <Alert>{this.state.responseToPost}</Alert>
          <Table style={{color:"#000"}} striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </Container>

      </div>
    );
  }
}

export default App;
