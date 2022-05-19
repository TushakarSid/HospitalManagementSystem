import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Button  , Card , Form}  from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';



const Prescription = () => {    

  const {appoint_Id} = useParams();
 const [appointment_details ,set_appointment_details] = useState({
    "docId":'',
    "patientId" :'',
    "patientName" :'',
    "docName" :'',
    "healthIssues":'',
    "medicinesPrescribed":[
        {
            "name":'',
            "key":""
        }
    ],
    "doctorsRemark":'', 
    "date":'',
 })

 

  
//  console.log(appointment_details)
  useEffect(() => {
    axios.get(`http://localhost:5000/appointment/${appoint_Id}`)
    .then((response) => {
        if(appointment_details.docId == '')
        set_appointment_details(response.data)
        // console.log(response.data)

    });



  },[appointment_details]);



  const  medicinesPrescribed = ()=> {

    return appointment_details.medicinesPrescribed.map(cur_medicine => {
        console.log(cur_medicine.name)
        return <Button variant="primary" style={{margin:'2px 2px '}} >{cur_medicine.name}</Button>
    })

  }

  return (
    <div className="row" style={{ width: '55%'  , margin:'auto' , marginTop:'3%'}}>

      

      <Card style={{ width: '45%'  , marginRight:'0px !important'}}>
        <Card.Img variant="top" src="https://image.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg" />
        <Card.Body>
        <Card.Title style={{textAlign:'center'}}>{appointment_details.docName}</Card.Title>
          <Card.Text style={{textAlign:'center'}}>
          {appointment_details.healthIssues}
          </Card.Text>

        </Card.Body>
      </Card>
      
      <Card style={{ width: '45%'  , marginRight:'0px !important' ,margin:'2% 2%'}}>
        <Card.Body >
        <Card.Title style={{textAlign:'center' , fontSize: "2.0rem" }}>Medicines Prescribed</Card.Title>
        {(appointment_details.docId != '')?medicinesPrescribed():<></> }

        <Card.Text style={{textAlign:'center' , fontSize: "1.5rem"}}>
          Doctor's Remark
        </Card.Text>
        
        <Card.Text style={{fontSize: "1rem"}}>
          {appointment_details.doctorsRemark}
        </Card.Text>
        
         <Card.Text style={{textAlign:'center' , fontSize: "1.5rem"}}>
          Wanna Book Another Appointment?
        </Card.Text>
        </Card.Body>
      </Card>

     
  </div>
  );
};

export default Prescription;
