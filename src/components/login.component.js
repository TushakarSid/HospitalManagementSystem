import React, { Component } from 'react'
import { FaWindows } from 'react-icons/fa'
import axios from 'axios'

export default class Login extends Component {

  constructor(props) {
    super(props)


    /* this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangeCategory = this.onChangeCategory.bind(this)
    this.onSubmit = this.onSubmit.bind(this) */

    this.state = {
      email: '',
      password: '',
      unregistered: 'true',
      category: ''
    }
  }
  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    })
  }
  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    })
  }
  onChangeCategory = (e) => {
    // const { name, value } = e.target;
    this.setState({
      category: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const doctor = {
      email: this.state.email,
      password: this.state.password,
    }

    if (this.state.category === "Doctor") {
      console.log("here")

      axios
        .post('http://localhost:5000/doctor/comparePasswordByEmail/', doctor)
        .then((res) => {

          if (res.data.message === "Try Signing In") {
            this.setState({
              unregistered: false
            })

          }
          else {
            window.location = "http://localhost:3000/"
          }
        })
        .catch((error) => {
          console.log(error);
        })

      // this.setState({
      //     email: '',
      //     password: '',
      //     category: '',
      // })
      // console.log("heeeeee")
    }
    else {
      console.log("for patient!")
    }


  }

  render() {
    return (
      <div className="outer">
        <div className="inner">
          <form onSubmit={this.onSubmit}>
            <h3>Log in</h3>


            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={this.onChangeEmail}
                required

              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={this.onChangePassword}
                required


              />
            </div>
            {<div className="form-group radio">
              <label style={{ margin: 10 }}>
                <input
                  type="radio"
                  value="Patient"
                  name="Category"
                  onChange={this.onChangeCategory}
                  required
                />
                <span>Patient</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="Doctor"
                  name="Category"
                  onChange={this.onChangeCategory}
                />
                <span>Doctor</span>
              </label>
            </div>}

            {(this.state.unregistered === false) ? <div style={{ color: 'Red' }}> Register Yourself </div> : <div></div>}

            {/* <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div> */}

            <button type="submit" className="btn btn-dark btn-lg btn-block">
              Sign in
            </button>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      </div>
    )
  }
}
