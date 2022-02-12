import React, { Component, useEffect,useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';


const Editappointment = () =>{

  let [healthIssues, sethealthIssues] = useState("");
  let [date, setdate] = useState(new Date());
  let  [ docId, setdocId] = useState();

  const {id} = useParams();
  
  const onChangeHealthIssues = (e) => {
    sethealthIssues(e.target.value);
  };
  const onChangeDate = (date) => {
    setdate(date);
  };

  useEffect(()=>{
    axios.get('http://localhost:5000/appointment/'+id)
    .then(response => {
      docId = response.data.docId
      healthIssues =  response.data.healthIssues
      date =  new Date(response.data.date)
    })
  })

  const onSubmit = (e) => {
    e.preventDefault();

    const appointment = {
      docId: docId,
      healthIssues: healthIssues,
      date: date
    };


    console.log(appointment);

    axios
      .post("http://localhost:5000/appointment/update", appointment)
      .then((res) => console.log(res.data));

    window.location = "/";

  };

  return (
    <div>
      console.log('here')
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
            value="Edit appointment Log"
            className="btn btn-primary"
          />
        </div>

      </form>
    </div>
  )
}

export default Editappointment

/* 
export default class Editappointment extends Component {
  constructor(props) {
    super(props);

    this.onChang  docId = this.onChang docId.bind(this);
    this.onChangehealthIssues = this.onChangehealthIssues.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      docId: '',
      healthIssues: '',
      duration: 0,
      date: new Date(),
      docIds: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/appointment/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          docId: response.data docId,
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
            docIds: response.data.map  docId => docId),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChang docId(e) {
    this.setState({
      docId: e.target.value
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
      docId: this.state  docId,
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
              value={this.state docId}
              onChange={this.onChang  docId}>
              {
                this.state  docIds.map(function  docId) {
                  return <option 
                    key=  docId}
                    value=  docId}>  docId}
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
} */