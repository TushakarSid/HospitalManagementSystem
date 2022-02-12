import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import Card from './card.component'

let doctor = [];

const Doctors = () => {

  useEffect(() => {
    axios.get('http://localhost:5000/doctor/')
      .then(response => {

        if (response.data.length > 0) {
          console.log(response.data)
          //console.log(this.state.docList[0].docFName)
          doctor=response.data;

          //console.log(doctor[0])

        }
      })
      .catch((error) => {
        console.log(error);
      })

     
  })

  return (
    <div>
      {doctor.map((resp)=>(
        <Card docFName={resp.docFName} docLName = {resp.docLName} doctorId = {resp._id}/>
        //console.log(resp)
      ))}
    </div>
  )
}


export default Doctors