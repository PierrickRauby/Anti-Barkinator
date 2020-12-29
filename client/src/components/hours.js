import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container,Row, Col,Table} from 'react-bootstrap'
import HoursButton from './hoursButton.js'
import './hours.css'

class Hours extends Component {

  render(){
    return(
      <div>
        <Container className="hoursComponent">
          <h3> Hours of operation</h3>
          <Row className="justify-content-md-center">
            <Col lg xl={{span:8}}>
                <Table responsive style={{color:"#000"}} striped bordered hover>
                  <tbody>
                    <tr>
                      <td><b>Start time</b><br/> The time at which the system will start listening</td>
                      <td><HoursButton hour={this.props.hourStart} value={'start'} hourChange={this.props.hourChange}/></td>
                    </tr>
                    <tr>
                      <td><b>Stop time</b><br/> The time at which the system will stop listening</td>
                      <td>
                        <HoursButton hour={this.props.hourStop} value={'stop'} hourChange={this.props.hourChange}/>
                      </td>
                    </tr>
                  </tbody>
                </Table>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
export default Hours
