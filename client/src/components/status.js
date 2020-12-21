import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Badge} from 'react-bootstrap'


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
    <p> The system is currently: 
      <Badge variant={this.state.status_variante_on}>ON</Badge>
      {' '}
      <Badge pill variant={this.state.status_variante_off}>OFF</Badge>
    </p>
  )
}
}
export default Status
