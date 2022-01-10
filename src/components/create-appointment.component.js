import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateAppointment extends Component {
  constructor(props) {
    super(props);

   

    this.state = {
      docName: '',
      healthIssues: '',
      duration: 0,
      date: new Date(),
      docNames: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/doctor/')
      .then(response => {
        console.log("here")
        if (response.data.length > 0) {
          this.setState({
            docNames: response.data.map(docdetails => docdetails.docFName),
            docName: response.data[0].docFName
          })
          console.log(this.state.docNames)
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeDocName = (e) => {
    this.setState({
      docName: e.target.value
    })
  }

  onChangeHealthIssues= (e) =>{
    this.setState({
      healthIssues: e.target.value
    })
  }

  onChangeDuration= (e) => {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate= (date) => {
    this.setState({
      date: date
    })
  }

  onSubmit= (e) => {
    e.preventDefault();

    const appointment = {
      docName: this.state.docName,
      healthIssues: this.state.healthIssues,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(appointment);

    axios.post('http://localhost:5000/appointment/add', appointment)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Enter Appointment Details</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Doctor's Name: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.docName}
              onChange={this.onChangeDocName}>
              {
                this.state.docNames.map(function(docName) {
                  return <option 
                    key={docName}
                    value={docName}>{docName}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Describe your Health Issues: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.healthIssues}
              onChange={this.onChangeHealthIssues}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Appointment" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}