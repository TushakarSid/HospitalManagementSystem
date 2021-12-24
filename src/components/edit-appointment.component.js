import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class Editappointment extends Component {
  constructor(props) {
    super(props);

    this.onChangedocName = this.onChangedocName.bind(this);
    this.onChangehealthIssues = this.onChangehealthIssues.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      docName: '',
      healthIssues: '',
      duration: 0,
      date: new Date(),
      docNames: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/appointment/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          docName: response.data.docName,
          healthIssues: response.data.healthIssues,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/doctor/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            docNames: response.data.map(docName => docName.docName),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangedocName(e) {
    this.setState({
      docName: e.target.value
    })
  }

  onChangehealthIssues(e) {
    this.setState({
      healthIssues: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const appointment = {
      docName: this.state.docName,
      healthIssues: this.state.healthIssues,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(appointment);

    axios.post('http://localhost:5000/appointment/update/' + this.props.match.params.id, appointment)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Appointment Details </h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Doctor's Name:</label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.docName}
              onChange={this.onChangedocName}>
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
          <label>Describe your Health Issues:</label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.healthIssues}
              onChange={this.onChangehealthIssues}
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
          <input type="submit" value="Edit appointment Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}