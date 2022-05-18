import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Button  , Card} from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';

const Prescription = () => {    

  const {appoint_Id} = useParams();
  const [appointment_date, set_appointment_date] = useState();

  const [health_issue, set_health_issue] = useState();
  const [patient_name, set_patient_name] = useState();
  const [available_drugs , set_available_drugs] = useState([])
  const [options , set_options] = useState([])
  const [selectedValues , set_selectedValues] = useState([])

  var available_drugs_temp = []

  
  useEffect(() => {
    axios.get(`http://localhost:5000/appointment/${appoint_Id}`)
    .then((response) => {
      set_health_issue(response.data.healthIssues);
      set_appointment_date(response.data.date);
      set_patient_name(response.data.patientName);

    });



    if(available_drugs_temp.length == 0){
      axios.get('http://localhost:5000/drugs/')
          .then((response) => {
            response.data.map( cur_drug =>{
              available_drugs_temp.push(cur_drug.drugName)
            })
            if(available_drugs.length ==0){
              set_available_drugs(available_drugs_temp)
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }


      if(available_drugs.length >0){
        var t =1;
        var tmp_ =[]
        available_drugs.map(cur_drug =>{
            var tmp = {name:cur_drug , key:t}
            tmp_.push(tmp)
            t = t+1
        })
        if(options.length ==0){
          set_options(tmp_)
        }
      }
  },[available_drugs , options ]);

  const onSelect = val =>{
    set_selectedValues(val)
  }
  const onRemove = val =>{
    set_selectedValues(val)
  }

  if(selectedValues.length > 0 )
  console.log(selectedValues)



  return (
    <div className="row" style={{ width: '55%'  , margin:'auto' , marginTop:'3%'}}>
      <Card style={{ width: '45%'  , marginRight:'0px !important'}}>
        <Card.Img variant="top" src="https://image.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg" />
        <Card.Body>
        <Card.Title style={{textAlign:'center'}}>{patient_name}</Card.Title>
          <Card.Text style={{textAlign:'center'}}>
          {health_issue}
          </Card.Text>
          <Button variant="primary" style={{margin:'auto' , width:'100%'}} >{appointment_date}</Button>
        </Card.Body>
      </Card>
      {/* <div style={{width:'30%'}}>    */}
      <Card style={{ width: '45%'  , marginRight:'0px !important'}}>
        <Card.Img variant="top" src="https://image.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg" />
        <Card.Body>
        <Card.Title style={{textAlign:'center' , fontWeight:'10px' }}>Prescribe Medicines</Card.Title>
        <Multiselect 
            options={options}     
            selectedValues={selectedValues}    
            onSelect={onSelect}     
            onRemove={onRemove}     
            displayValue="name"     
        />
        </Card.Body>
      </Card>
       
      {/* </div> */}
  </div>
  );
};

export default Prescription;
