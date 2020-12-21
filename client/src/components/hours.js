import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button,Modal,Form} from 'react-bootstrap'
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

class Hours extends Component {

  constructor(props) {
    super(props);
    this.state = {
      format : 'h:mm a',
      now : moment().hour(0).minute(0),
      show: false
    };
  }
  onChange=(value)=> {
  console.log(value && value.format(format));
}

  handleClose = () => {
    this.setState({show:false});
  }
  handleShow = () =>{
    this.setState({show:true});
  }

render(){
  return(
    <div>
      <Button variant="primary" onClick={this.handleShow} >
        Launch demo modal
      </Button>
      <TimePicker
        showSecond={false}
        defaultValue={this.state.now}
        className="xxx"
        onChange={this.onChange}
        format={this.state.format}
        use12Hours
        inputReadOnly
      />
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New hours</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please enter</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    )
}
}
export default Hours
