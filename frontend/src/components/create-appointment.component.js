import React, { Component, useState, useContext,useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

const CreateAppointment = () => {
  const {doctorId} = useParams();

  const [patientId,setpatientId] = useState();
  const [patientName,setPatientName] = useState();
  const [docName,setdocName] = useState();

  //for getting patient details from its email 
  useEffect(() => {
    const patientemail =   localStorage.getItem('contextEmail')
      axios
      .get(`http://localhost:5000/patient/patient_details_by_email/${patientemail}`)
      .then((response) =>{
        setpatientId(response.data[0]._id)
        setPatientName(response.data[0].PatFName + " "+ response.data[0].PatLName)
      })
      .catch((error)=>{
        console.log(error)
      })

      axios
      .get(`http://localhost:5000/doctor/doctor_details_by_id/${doctorId}`)
      .then((response) =>{
        setdocName(response.data[0].docFName + " "+ response.data[0].docLName)
      })

  },[patientId , patientName,docName])



  const [docId, setdocId] = useState(doctorId);
  const [healthIssues, sethealthIssues] = useState("");
  const [date, setdate] = useState(new Date());

  const onChangeHealthIssues = (e) => {
    sethealthIssues(e.target.value);
  };
  const onChangeDate = (date) => {
    setdate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(patientId)
    console.log(patientName)
    console.log(docName)
    {if(patientId && patientName && docName){

          const appointment = {
            docId: docId,
            patientId: patientId,
            patientName:patientName,
            docName:docName,
            healthIssues: healthIssues,
            date: date,
          };

          console.log(appointment);

          axios
            .post("http://localhost:5000/appointment/add", appointment)
            .then((res) => console.log(res.data));


          // window.location = "/";

  }}
  };

  return (
    <div>
      <h3>Enter Appointment Details</h3>
      <form onSubmit={onSubmit}>     
        <div className="form-group">
          <label>Describe your Health Issues: </label>
          <textarea
            type="textarea"
            required
            className="form-control"
            value={healthIssues}
            onChange={onChangeHealthIssues}
          />
        </div>
        
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={date}
              onChange={onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Appointment"
            className="btn btn-primary"
          />
        </div>

      </form>
    </div>
  )
}

export default CreateAppointment
