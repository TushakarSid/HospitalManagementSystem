import React, { useContext , useState , useEffect} from 'react'
import UserContext from './UserContext'
import axios from 'axios'


const Appointment = props => (
    <tr>
      <td>{props.appointment.docName}</td>
      <td>{props.appointment.healthIssues}</td>
      <td>{props.appointment.date.substring(0,10)}</td>
    </tr>
  )


const PreviousAppointments = () =>{

    const  [appointments,setappointments] = useState();

    
    useEffect(() => {
      const email =   localStorage.getItem('contextEmail')
  
      if(appointments ==undefined){
        axios
        .get(`http://localhost:5000/patient/patient_details_by_email/${email}`)
        .then((response) =>{
          axios
          .get(`http://localhost:5000/appointment/byPatientId/${response.data[0]._id}`)
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