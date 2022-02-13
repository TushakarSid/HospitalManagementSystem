import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import Card from './card.component'



const Doctors = () => {
  
  const [doctor, setDoctor] = useState();
  useEffect(() => {
    console.log("1")
    axios.get('http://localhost:5000/doctor/')
      .then(response => {

        if (response.data.length > 0) {
          setDoctor(response.data)
        }
      })
      .catch((error) => {
        console.log(error);
      })

     
  },[])

  return (
    <div style={{display: "flex" , margin :"10px 10px"}}>
      {
        (doctor === undefined)?(<div> </div>):(doctor.map((resp)=>(<Card docFName={resp.docFName} docLName = {resp.docLName} doctorId = {resp._id}/>)))}
    </div>
  )
}


export default Doctors