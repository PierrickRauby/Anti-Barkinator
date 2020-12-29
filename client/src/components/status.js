import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import ManualSush from './manualShush.js'
import {Nav, Navbar,Form} from 'react-bootstrap'
import './status.css'

class Status extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
    handleChange(e) {
      this.props.statusChange(e.target.checked);
    }

  render(){
    return(
      <div >
        <Navbar defaultExpanded className="statusComponent" bg="dark"  variant="dark" expand="lg">
          <Navbar.Brand  href="#home">Anti-Barkinator</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav></Nav>
            <ManualSush sushNow={this.props.sushNow} />
            <Form className="text-center mt-2 mb-2 justify-content-md-center" variant="form-dark" inline >
              <Form.Check checked={this.props.status} onChange={this.handleChange} type="switch" id="custom-switch" />
              <span className="statusComponent">Status ON/OFF</span>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
export default Status
