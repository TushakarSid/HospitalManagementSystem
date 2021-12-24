import React, { Component } from 'react'
import axios from 'axios'

export default class CreateDoctor extends Component {
  constructor(props) {
    super(props)

    this.onChangeDocName = this.onChangeDocName.bind(this)
    this.onChangeMobile = this.onChangeMobile.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      docName: '',
      mobile: '',
      password: '',
    }
  }

  onChangeDocName(e) {
    this.setState({
      docName: e.target.value,
    })
  }
  onChangeMobile(e) {
    this.setState({
      mobile: e.target.value,
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const doctor = {
      docName: this.state.docName,
      mobile: this.state.mobile,
      password: this.state.password,
    }

    console.log(doctor)

    axios
      .post('http://localhost:5000/doctor/add', doctor)
      .then((res) => console.log(res.data)) 
      .catch((error) => {
        console.log(error);
      })

    this.setState({
      docName: '',
      mobile: '',
      password: '',
    })
    console.log("heeeeee")
  }

  render() {
    return (
      <div>
        <h3>Register yourself Doc!</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              required
              className="form-control"
              value={this.state.docName}
              onChange={this.onChangeDocName}
            />
          </div>
          <div className="form-group">
            <label>Mobile Number </label>
            <input
              type="tel"
              placeholder="Mobile Number"
              required
              className="form-control"
              value={this.state.mobile}
              onChange={this.onChangeMobile}
            />
          </div>
          <div className="form-group">
            <label>Create Password</label>
            <input
              type="password"
              placeholder="Password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Register" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
