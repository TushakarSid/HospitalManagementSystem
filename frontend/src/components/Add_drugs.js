import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form , Button } from 'react-bootstrap';


const Add_drugs = () =>{

    const [medicine_name , set_medicine_name] = useState();
    const [medicine_quantity , set_medicine_quantity] = useState();

    const onChange_medicine_name = (e) => {
        set_medicine_name(e.target.value);
      };
      const onChange_medicine_quantity = (e) => {
        set_medicine_quantity(e.target.value);
      };
    

    const onSubmit = (e) => {
        e.preventDefault();
    
    
        {if(medicine_name && medicine_quantity){
    
              const detail = {
                drugName:medicine_name,
                drugQuantity:medicine_quantity,
              };
    
              console.log(detail);
    
              axios
                .post("http://localhost:5000/drugs/add", detail)
                .then((res) => console.log(res.data))
                .catch((error) => {
                    console.log(error)
                })
    
              window.location = "/Add_drugs";
            }}
      };

  return (
      <>
      <h1 style={{width:'40%'  , margin:'auto' , paddingTop:'5%'}}>Enter New Medicine Available  </h1>
    <Form  onSubmit={onSubmit} style={{width:'40%'  , margin:'auto'  ,paddingTop:'1%'}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Medicine Name</Form.Label>
            <Form.Control 
            value = {medicine_name}
            onChange = {onChange_medicine_name}
            required
            type="text" placeholder="Enter Medicine Name" />
            
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Quantity of Medicine</Form.Label>
            <Form.Control 
            value = {medicine_quantity}
            onChange = {onChange_medicine_quantity}
            required
            type="text"
            placeholder="Enter Quantity of Medicine" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
        </Form.Group>
        <Button variant="primary" 
        type="submit" style={{marginLeft:'40%' ,marginRight:'40%'}}>
            Submit
        </Button>
    </Form>
</>

  )

}

export default Add_drugs

