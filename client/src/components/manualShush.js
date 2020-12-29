import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap'
import './hoursButton.css'

class manualSush extends Component {

  constructor(props) {
    super(props);
    this.handleSush=this.handleSush.bind(this);
    this.state = {
      buttonMessage:'Sush now!',
      buttonStyle:'outline-success',
      buttonStatus:false
    };
  }

  handleSush=()=>{
    this.props.sushNow()
    this.setState({
      buttonMessage:'Sushed!',
      buttonStyle:'danger',
      buttonStatus:true
    });
    setTimeout(function(){
    this.setState({
      buttonMessage:'Sush now!',
      buttonStyle:'outline-success',
      buttonStatus:false
    })}.bind(this), 1000);
  }

  render(){
    return(
      <Button variant={this.state.buttonStyle} disabled={this.state.buttonStatus} onClick={this.handleSush} block>
        {this.state.buttonMessage}
      </Button>
    )
  }
}
export default manualSush
