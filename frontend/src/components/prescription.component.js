import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Button  , Card} from 'react-bootstrap';

const Prescription = () => {    

  const {appoint_Id} = useParams();
  const [appointment_date, set_appointment_date] = useState();

  const [health_issue, set_health_issue] = useState();
  const [patient_name, set_patient_name] = useState();

  const [available_drugs, set_available_drugs] = useState();
  // const [available_drugs, set_available_drugs] = useState([{_id:"" , drugName:"" , drugQuantity:""}]);

  useEffect(() => {
    axios.get(`http://localhost:5000/appointment/${appoint_Id}`)
    .then((response) => {
      set_health_issue(response.data.healthIssues);
      set_appointment_date(response.data.date);
      set_patient_name(response.data.patientName);

    });

    if(available_drugs == undefined){
      console.log("herwe")
      var cur_drug_details
      var arr
      axios.get('http://localhost:5000/drugs/')
          .then((response) => {
            response.data.map( cur_drug =>(
              console.log(cur_drug),
              //  cur_drug_details = {_id:cur_drug._id , drugName:cur_drug.drugName , drugQuantity:cur_drug.drugQuantity}
              //  arr = availaible_drugs.concat({_id:cur_drug._id , drugName:cur_drug.drugName , drugQuantity:cur_drug.drugQuantity})
              set_available_drugs(available_drugs.concat({_id:cur_drug._id , drugName:cur_drug.drugName , drugQuantity:cur_drug.drugQuantity}))
            ))
            set_available_drugs(
              available_drugs._id
            )
            console.log(response.data)
            console.log(available_drugs)
          })
          .catch((error) => {
            console.log(error)
          })
      }
  },[available_drugs]);

  return (
    <div>
      <h3></h3>

      {/* <select>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option selected value="coconut">Coconut</option>
          <option value="mango">Mango</option>
      </select> */}
      {/* <div className="row" style={{marginTop:'100px'}}>
        <div style={{ width: '25%'  , margin:'auto' , textAlign:'center' , fontSize:'35px'}}>Patient Details </div>
        <div style={{ width: '25%'  , margin:'auto'}}></div>
      </div>
      <div className="row">


      <Card style={{ width: '25%'  , margin:'auto' , marginRight:'0px !important'}}>
        <Card.Img variant="top" src="https://image.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg" />
        <Card.Body>
        <Card.Title style={{textAlign:'center'}}>{patient_name}</Card.Title>
          <Card.Text style={{textAlign:'center'}}>
          {health_issue}
          </Card.Text>
          <Button variant="primary" style={{marginLeft:'40%' ,marginRight:'40%'}}>{appointment_date}</Button>
        </Card.Body>
      </Card>

      
      </div> */}

    </div>
  );
};

export default Prescription;
