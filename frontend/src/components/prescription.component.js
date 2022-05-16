import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Button  , Card} from 'react-bootstrap';





const Prescription = () => {    

  const {appoint_Id} = useParams();

  const [health_issue, set_health_issue] = useState();
  const [appointment_date, set_appointment_date] = useState();
  // const [appointment_Detail, set_Appointment_Detail] = useState();
  // const [appointment_Detail, set_Appointment_Detail] = useState();
  // const [appointment_Detail, set_Appointment_Detail] = useState();

  useEffect(() => {
    axios.get(`http://localhost:5000/appointment/${appoint_Id}`)
    .then((response) => {
      set_health_issue(response.data.healthIssues);
      set_appointment_date(response.data.date);
      // set_health_issue(response.data.healthIssues);
      // set_health_issue(response.data.healthIssues);
      // set_health_issue(response.data.healthIssues);

    });
  }, []);


  return (
    <div>
      <h3>Patient Details </h3>
      
      
      
      <Card style={{ width: '18rem'  , margin:'auto'}}>
        <Card.Img variant="top" src="https://source.unsplash.com/doctor" />
        <Card.Body>
          <Card.Title>Patient  Name</Card.Title>
          <Card.Text>
          {health_issue}
          </Card.Text>
          <Button variant="primary">{appointment_date}</Button>
        </Card.Body>
      </Card>
     {/* <form>
        <div className="form-group">
          <label>Prescription </label>
          <select
          multiple={true}
            required
            className="form-control"
            value={appointment_Detail}
            
          >
            {
            appointment_Detail === undefined ? <div></div>:
            appointment_Detail
            }
          </select>
        </div>
      </form>   */}
    </div>
  );
};

export default Prescription;
