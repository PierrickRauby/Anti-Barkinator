import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container,Row,Table} from 'react-bootstrap'
import './history.css'

class History extends Component {
  render(){
    var alertLog=this.props.alertLog.map((element)=>
      <tr key={element.hours.toString()} >
        <td>{element.hours}</td>
        <td>{element.message}</td>
        <td>{element.confidence}</td>
        <td>{ element.triger===1 ? 'auto' :'manual'}</td>
      </tr>
    );
    return(
      <div>
        <Container className="hoursComponent">
          <h3> History of Alerts</h3>
          <Row className="justify-content-md-center">
          <Table style={{color:"#000"}} striped bordered hover>
            <thead>
              <tr>
                <th>Hours</th>
                <th>Message</th>
                <th>Confidence</th>
                <th>triggered</th>
              </tr>
            </thead>
            <tbody>
              {alertLog}
            </tbody>
          </Table>
          </Row>
        </Container>
      </div>
    )
  }
}
export default History
