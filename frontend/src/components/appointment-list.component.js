import React, { Component, useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Appointment = props => (
  <tr>
    <td>{props.appointment.docName}</td>
    <td>{props.appointment.healthIssues}</td>
    <td>{props.appointment.duration}</td>
    <td>{props.appointment.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.appointment._id}>edit</Link> | <a href="#" onClick={() => { props.deleteAppointment(props.appointment._id) }}>delete</a>
    </td>
  </tr>
)

const AppointmentList = () =>{

  const  [appointments,setappointments] = useState();
  const [docId,setdocId] = useState();
  let id = null
  

  useEffect(   () => {
    // const email = localStorage.getItem('contextEmail') 
    
    // console.log("email")
    // console.log(email)
    // const det ={
    //   email :email
    // }http://localhost:5000/doctor/getIdByEmail
    let  appoin =[]
    const ee =   localStorage.getItem('contextEmail')
    if(docId ==undefined){

      axios
      .get(`http://localhost:5000/doctor/getIdByEmail/${ee}`)
      .then((response) =>{

        setdocId(response.data)
        localStorage.setItem('docId' ,response.data)
        axios
        .get(`http://localhost:5000/appointment/byDoctorId/${response.data}`)
        .then((response) => {
          appoin = response.data
          setappointments(response.data)
        })
        .catch((error) => {
          console.log(error);
        })
      })
      .catch((error)=>{
        console.log(error)
      })
    }

  // },[])
  },[appointments , docId])
  // console.log("first")

  
   const deleteAppointment = (id) =>{
    axios.delete('http://localhost:5000/appointment/'+id)
      .then(response => { console.log(response.data)});
      setappointments(appointments.filter(el => el._id !== id))
    }

 const  AppointmentList = ()=> {

    return appointments.map(currentAppointment => {
      return <Appointment appointment={currentAppointment} deleteAppointment={deleteAppointment} key={currentAppointment._id}/>;
    })
  }

  return (
    <div>

      {
        
      }
      <h3>Scheduled Appointments</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Doctor's Name</th>
            <th>Health Issues</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
         {(appointments)?AppointmentList():<></> }
        </tbody>
      </table>
    </div>
  )

}

export default AppointmentList

