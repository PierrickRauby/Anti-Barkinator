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
                      <td>Start time</td>
                      <td><HoursButton className="test" value={'start'}/></td>
                    </tr>
                    <tr>
                      <td>Stop time</td>
                      <td>
                        <HoursButton className="test2" value={'stop'}/>
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
