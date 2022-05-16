import React, { Component, useState, useContext,useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

const CreateAppointment = () => {
  const {doctorId} = useParams();
  console.log(doctorId)

  const [patientId,setpatientId] = useState();

  
  let id = null
  useEffect(() => {
    const patientemail =   localStorage.getItem('contextEmail')
    //if(patientId ==undefined){
      axios
      .get(`http://localhost:5000/patient/getIdByEmail/${patientemail}`)
      .then((response) =>{
        console.log(response.data)
        setpatientId(response.data)
        localStorage.setItem('patientId' ,response.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    //}
  },[])

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

    const appointment = {
      docId: docId,
      patientId: localStorage.getItem('patientId'),
      healthIssues: healthIssues,
      date: date,
    };

    console.log(appointment);

    axios
      .post("http://localhost:5000/appointment/add", appointment)
      .then((res) => console.log(res.data));

    window.location = "/";
  };

  return (
    <div>
      <h3>Enter Appointment Details</h3>
      <form onSubmit={onSubmit}>     
        <div className="form-group">
          <label>Describe your Health Issues: </label>
          <input
            type="text"
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
