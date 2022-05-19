import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Button  , Card , Form}  from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';


const Prescription = () => {    

  const {appoint_Id} = useParams();
  const [appointment_date, set_appointment_date] = useState();

  const [health_issue, set_health_issue] = useState();
  const [patient_name, set_patient_name] = useState();
  const [available_drugs , set_available_drugs] = useState([])
  const [options , set_options] = useState([])
  const [selectedValues , set_selectedValues] = useState([])
  const [how_To_Take_Medicines , set_how_To_Take_Medicines] = useState([])
  const [patient_id , set_patient_id] = useState([])

  var available_drugs_temp = []

  const onChengehow_To_Take_Medicines = (e) => {
    set_how_To_Take_Medicines(e.target.value);
  };

  
  useEffect(() => {
    axios.get(`http://localhost:5000/appointment/${appoint_Id}`)
    .then((response) => {
      console.log(response.data)
      set_health_issue(response.data.healthIssues);
      set_appointment_date(response.data.date);
      set_patient_name(response.data.patientName);
      set_patient_id(response.data.patientId);

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
  },[available_drugs , options , patient_id ]);

  const onSelect = val =>{
    set_selectedValues(val)
  }
  const onRemove = val =>{
    set_selectedValues(val)
  }



  const onSubmit = (e) => {
    e.preventDefault();

    console.log(selectedValues)
    console.log(how_To_Take_Medicines)
    // console.log(docName)
    {if(selectedValues.length >0 && how_To_Take_Medicines != undefined ){

          const appointment = {
            medicinesPrescribed: selectedValues,
            doctorsRemark: how_To_Take_Medicines,
            appoint_Id:appoint_Id
          };

          console.log(appointment);

          axios
            .post("http://localhost:5000/appointment/update_precription", appointment)
            .then((res) => console.log(res.data))
            .catch((error) =>{
              console.log("i am here")
              console.log(error)
            })


          window.location = "/";

  }}
  };


  return (
    <div className="row" style={{ width: '55%'  , margin:'auto' , marginTop:'3%'}}>

      

      <Card style={{ width: '45%'  , marginRight:'0px !important'}}>
        <Card.Img variant="top" src="https://image.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg" />
        <Card.Body>
        <Card.Title style={{textAlign:'center'}}>{patient_name}</Card.Title>
          <Card.Text style={{textAlign:'center'}}>
          {health_issue}
          </Card.Text>
          <Link to={"/" + patient_id+ "/history"}>
          <Button variant="primary" style={{margin:'auto' , width:'100%'}} >See Patient's History</Button>
          </Link>
        </Card.Body>
      </Card>

      <Form style={{width:'40%' }} onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail" >
            <Card  style={{height:'40% !importnat'}}>
              <Card.Body>
              <Card.Title style={{textAlign:'center' , fontWeight:'10px' }}>Prescribe Medicines</Card.Title>
              <Multiselect 
                  options={options}     
                  selectedValues={selectedValues}    
                  onSelect={onSelect}     
                  onRemove={onRemove}     
                  displayValue="name"     
              />
              <Card.Text style={{textAlign:'center'}}>
                </Card.Text>
              </Card.Body>
            </Card>
            <Form.Label>How to take Medicines?</Form.Label>
            <Form.Control 
            type="textarea" 
            placeholder="How to take Medicines? " 
            as="textarea" 
            rows={3}
            value={how_To_Take_Medicines}
            onChange ={onChengehow_To_Take_Medicines}
            />
        </Form.Group>
        <Button variant="primary" type="submit" style={{width:'100%'}}>
          Submit
        </Button>
      </Form>
  </div>
  );
};

export default Prescription;
