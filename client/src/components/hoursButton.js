import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Col,Button,Modal,Form} from 'react-bootstrap'
import moment from 'moment';
import './hoursButton.css'
class hourButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      hours:['...',0,1,2,3,4,5,6,7,8,9,10,11,12],
      //minutes:['...',0,5,10,15,20,25,30,35,40,45,50,55],
      minutes:['...',0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],
      am_pm:['...','am','pm'],
      hour_selected:0,
      minute_selected:0,
      am_pm_selected:'am'
    };
  }

  handleSave=()=>{
    this.setState({show:false});
    var new_time;
    var new_moment_time;
    switch(this.state.am_pm_selected){
      case 'am':
        if(this.state.hour_selected===12){ // 12 am => midnight
          new_moment_time=moment().hour(0).minute(this.state.minute_selected)
          new_time=new_moment_time.toISOString()
        }else{ 
          new_moment_time=moment().hour(this.state.hour_selected).minute(this.state.minute_selected)
          new_time=new_moment_time.toISOString()
        }
        break
      case 'pm':
        if(this.state.hour_selected===12){ // 12pm => noon
          new_moment_time=moment().hour(12).minute(this.state.minute_selected)
          new_time=new_moment_time.toISOString()
        }else{
          new_moment_time=moment().hour(this.state.hour_selected+12)
            .minute(this.state.minute_selected)
          new_time=new_moment_time.toISOString()
        }
        break
      default:
        console.log('error on am pm switch')
    }
    this.props.hourChange(this.props.value,new_time);
  }

  handleClose = () => {
    this.setState({show:false});
  }

  handleShow = () =>{
    this.setState({show:true});
  }
  handleChangeTime = (event) => {
    var [value_type,xvalue]=event.target.value.split(',')
    switch(value_type){
      case 'hour':
        this.setState({hour_selected:parseInt(xvalue, 10)});
        break;
      case 'minute':
        this.setState({minute_selected:parseInt(xvalue, 10)});
        break;
      case 'am_pm':
        this.setState({am_pm_selected:xvalue});
        break;
      default:
        console.log('Error on switch, hours was not changed');
    }
  }

  render(){
    return(
      <div>
          <Button variant="primary" onClick={this.handleShow} >
            {moment(this.props.hour).format('LT')} 
          </Button>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New {this.props.value} time</Modal.Title>
            </Modal.Header>
            <Modal.Body>Please enter the new {this.props.value} time:
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId="FormHours">
                    <Form.Label>Hours:</Form.Label>
                    <Form.Control as="select" onChange={this.handleChangeTime}>
                      {this.state.hours.map(x=><option value={['hour',x]} key={x}>{x}</option>)}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} controlId="FormMinutes">
                    <Form.Label>Minutes:</Form.Label>
                    <Form.Control as="select" onChange={this.handleChangeTime} defaultValue={this.state.minutes[0]}>
                      {this.state.minutes.map(x=><option value={['minute',x]} key={x}>{x}</option>)}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} controlId="FormAmPm">
                    <Form.Label>am/pm:</Form.Label>
                    <Form.Control as="select" onChange={this.handleChangeTime}>
                      {this.state.am_pm.map(x=><option value={['am_pm',x]} key={x}>{x}</option>)}
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleSave}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
    )
  }
}
export default hourButton
