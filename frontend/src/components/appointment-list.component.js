import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Appointment = props => (
  <tr>
    <td>{props.appointment.patientName}</td>
    <td>{props.appointment.healthIssues}</td>
    <td>{props.appointment.date.substring(0,10)}</td>
    <td>
      <Link to={props.appointment._id+ "/prescribe"}>OPEN</Link> 
    </td>
  </tr>
)

const AppointmentList = () =>{

  const  [appointments,setappointments] = useState();

  let id = null
  useEffect(() => {
    const ee =   localStorage.getItem('contextEmail')

    if(appointments ==undefined){
      axios
      .get(`http://localhost:5000/doctor/doctor_details_by_email/${ee}`)
      .then((response) =>{
        axios
        .get(`http://localhost:5000/appointment/byDoctorId/${response.data[0]._id}`)
        .then((response) => {
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
  },[appointments ])



  
   const deleteAppointment = (id) =>{
    axios.delete('http://localhost:5000/appointment/'+id)
      .then(response => { console.log(response.data)});
      setappointments(appointments.filter(el => el._id !== id))
    }

 const  AppointmentList = ()=> {

    return appointments.map(currentAppointment => {
     
      return <Appointment  appointment={currentAppointment} deleteAppointment={deleteAppointment} key={currentAppointment._id} />;
    })

  }

  return (
    <div style={{minHeight: '83vh'}}>

      <center>

      <h2>Scheduled Appointments</h2>
      <table className="table" style={{width:'60%'}}>
        <thead className="thead-light">
          <tr>
            <th>Patient Name</th>
            <th>Health Issues</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

         {(appointments )?AppointmentList():<></> }
        </tbody>
      </table>
      </center>
    </div>
  )

}

export default AppointmentList

