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

  const [appointments,setappointments] = useState();
  const [docId,setdocId] = useState();
  let id = null
  

  useEffect(  () => {
    // const email = localStorage.getItem('contextEmail') 
    
    // console.log("email")
    // console.log(email)
    // const det ={
    //   email :email
    // }
    //  axios
    //   .post('http://localhost:5000/doctor/getIdByEmail',{email:localStorage.getItem('contextEmail')})
    //   .then((response) =>{
    //     setdocId("response.data")
    //     setdocId(response.data)
    //     id=response.data
    //     localStorage.setItem('docId' ,response.data)
    //   })
    //   .catch((error)=>{
    //     console.log(error)
    //   })
    //   console.log("heerA")

      
      // const xx = localStorage.getItem('docId')
      // if(xx !== undefined)
      // {
        const x = {
          docId :"62077ea8c74f9810a8b24ca5"
        }

        console.log("first")
        axios
        .post('http://localhost:5000/appointment/byDoctorId' , x)
        .then((response) => {
          console.log(response.data)
          setappointments(response.data)
        })
        .catch((error) => {
          console.log(error);
        })
    // }
  },[])
  console.log("first")

  
   const deleteAppointment = (id) =>{
    axios.delete('http://localhost:5000/appointment/'+id)
      .then(response => { console.log(response.data)});
      setappointments(appointments.filter(el => el._id !== id))
    }

 const  AppointmentList = ()=> {

    // return appointments.map(currentAppointment => {
    //   return <Appointment appointment={currentAppointment} deleteAppointment={deleteAppointment} key={currentAppointment._id}/>;
    // })
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
         }

          { AppointmentList() }
        </tbody>
      </table>
    </div>
  )

}

export default AppointmentList

