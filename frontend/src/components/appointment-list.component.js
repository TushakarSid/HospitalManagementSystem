import React, { Component, useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Appointment = props => (
  <tr>
    <td>{props.apointment.patientId}</td>
    <td>{props.appointment.healthIssues}</td>
    <td>{props.appointment.date.substring(0,10)}</td>
    <td>
      <Link to={props.appointment._id+ "/prescribe"}>OPEN</Link> 
      {/* <a href="#" onClick={() => { props.deleteAppointment(props.appointment._id) }}>delete</a> */}
      {/* <Link to={"/edit/"+props.appointment._id}>edit</Link> | <a href="#" onClick={() => { props.deleteAppointment(props.appointment._id) }}>delete</a> */}
    </td>
  </tr>
)

const AppointmentList = () =>{

  const  [appointments,setappointments] = useState();
  const [docId,setdocId] = useState();
  const [patientId,setpatientId] = useState();

  let id = null
  useEffect(() => {
    const ee =   localStorage.getItem('contextEmail')

    axios
    .get(`https://localhost:5000/appointment/getPatientIdByAppointmentId/${props.appointment._id}`)
    .then((response) =>{
      setpatientId(response.data)
    })



    if(docId ==undefined){
      axios
      .get(`http://localhost:5000/doctor/getIdByEmail/${ee}`)
      .then((response) =>{

        setdocId(response.data)
        localStorage.setItem('docId' ,response.data)
        axios
        .get(`http://localhost:5000/appointment/byDoctorId/${response.data}`)
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
  },[appointments , docId])



  
   const deleteAppointment = (id) =>{
    axios.delete('http://localhost:5000/appointment/'+id)
      .then(response => { console.log(response.data)});
      setappointments(appointments.filter(el => el._id !== id))
    }

 const  AppointmentList = ()=> {

    return appointments.map(currentAppointment => {
      return <Appointment appointment={currentAppointment} deleteAppointment={deleteAppointment} key={currentAppointment._id} patientId={patientId}/>;
    })
  }

  return (
    <div>

      <center>

      <h2>Scheduled Appointments</h2>
      <table className="table" style={{width:'60%'}}>
        <thead className="thead-light">
          <tr>
            <th>Health Issues</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {/* <Link to="/"> */}

         {(appointments)?AppointmentList():<></> }
        {/* </Link> */}
        </tbody>
      </table>
      </center>
    </div>
  )

}

export default AppointmentList

