import React, { useContext , useState , useEffect} from 'react'
import UserContext from './UserContext'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios'


const Appointment = props => (
    <tr>
      <td>{props.appointment.docName}</td>
      <td>{props.appointment.healthIssues}</td>
      <td>{props.appointment.date.substring(0,10)}</td>
      <td>
      <Link to={props.appointment._id+ "/patient_appointment_details"}>OPEN</Link> 
    </td>
    </tr>
  )

const PreviousAppointments = () =>{

  const {id} =   useParams()
  console.log(id)
    const  [appointments,setappointments] = useState();

    useEffect(() => {
  
      if(appointments == undefined){
          axios
          .get(`http://localhost:5000/appointment/byPatientId/${id}`)
          .then((response) => {
            setappointments(response.data)
            console.log(appointments)
          })
          .catch((error) => {
            console.log(error);
          })
  
        }
    },[appointments ])


    
 const  AppointmentList = ()=> {

    return appointments.map(currentAppointment => {
     
      return <Appointment  appointment={currentAppointment}  key={currentAppointment._id} />;
    })

  }

  return (
    <div>

      <center>

      <h2>Previous Appointments</h2>
      <table className="table" style={{width:'60%'}}>
        <thead className="thead-light">
          <tr>
            <th>Doctor Name</th>
            <th>Health Issues</th>
            <th>Date</th>
            
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

export default PreviousAppointments