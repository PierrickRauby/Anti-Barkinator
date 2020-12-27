import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Nav, Navbar,Form} from 'react-bootstrap'
import './status.css'

class Status extends Component {

  state= {
    status_state:'ON',
    status_variante_on:'secondary',
    status_variante_off:'secondary'
  };

  handleClick = () => {
    console.log('Cliqué');
  }

  changeStatusColor=()=>
  {
    if (this.state.status_state==="ON"){
      this.setState({status_variante_on:'success',status_variante_off:'secondary'})
    }else{
      this.setState({status_variante_on:'secondary',status_variante_off:'danger'})
    }
  }
componentDidMount(){
  this.changeStatusColor()
  console.log(this.state.status_state)
}
render(){
  return(
    <div >
      <Navbar className="statusComponent" bg="dark"  variant="dark" expand="lg">
        <Navbar.Brand  href="#home">Anti-Barkinator</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
    <Form className="justify-content-md-center" variant="form-dark" inline>
      <Form.Check type="switch" id="custom-switch"/>
      <span className="statusComponent">Status ON/OFF</span>
    </Form>
      </Navbar.Collapse>
    </Navbar>
    </div>
  )
}
}
export default Status
