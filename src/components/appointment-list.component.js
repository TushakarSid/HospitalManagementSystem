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
  const [docId,setdocId] = useState(null);

  useEffect( () => {
    const email = local.storage.getItem('contextEmail') 
    axios.get('http://localhost:5000/doctor/getIdByEmail',email)
      .then(response =>{
          setdocId(response.docId)
      })

      axios.get('http://localhost:5000/appointment/byDoctorId' , )
      .then(response => {
        setappointments(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  },[])
  
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
          { AppointmentList() }
        </tbody>
      </table>
    </div>
  )

}


/* export default class AppointmentList extends Component {
  constructor(props) {
    super(props);

    this.deleteAppointment = this.deleteAppointment.bind(this)

    this.state = {
      appointments: [],
      docId: null,

    };
  }

  componentDidMount() {
    const email = local.storage.getItem('contextEmail') 
    axios.get('http://localhost:5000/doctor/getIdByEmail',email)
      .then(response =>{
        this.setState({
          docId :response.docId
        })
      })
    axios.get('http://localhost:5000/appointment/byDoctorId' , )
      .then(response => {
        this.setState({ appointments: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteAppointment(id) {
    axios.delete('http://localhost:5000/appointment/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      appointments: this.state.appointments.filter(el => el._id !== id)
    })
  }

  AppointmentList() {
    return this.state.appointments.map(currentAppointment => {
      return <Appointment appointment={currentAppointment} deleteAppointment={this.deleteAppointment} key={currentAppointment._id}/>;
    })
  }

  render() {
    return (
      <div>
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
            { this.AppointmentList() }
          </tbody>
        </table>
      </div>
    )
  }
} */