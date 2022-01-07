import React, { Component } from "react";
import axios from 'axios';


export default class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            docFName: '',
            docLName: '',
            mobile: '',
            email: '',
            password: '',
            category: 'Doctor',
            errors: 0,
        }
    }
    onChangeDocFName = (e) => {
        this.setState({
            docFName: e.target.value,
        })
    }
    onChangeDocLName = (e) => {
        this.setState({
            docLName: e.target.value,
        })
    }
    onChangeMobile = (e) => {
        this.setState({
            mobile: e.target.value,
        })
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
        this.setState({
            category: e.target.value,
        })
    }
   

    

    onSubmit = (e) => {
        e.preventDefault()

        const doctor = {
            docFName: this.state.docFName,
            docLName: this.state.docLName,
            mobile: this.state.mobile,
            email: this.state.email,
            password: this.state.password
        }

        if (this.state.category == "Doctor") {
            console.log("here")

            axios
                .post('http://localhost:5000/doctor/add', doctor)
                .then((res) => {
                    console.log(res.status)
                    this.setState({
                        errors: 0,
                        category:'Doctor',
                    })
                })
                .catch((error) => {
                    console.log("i am here")
                    console.log(error);
                    this.setState({
                        errors: 1,
                        category:'Doctor',
                    })
                    console.log(this.state.errors)
                    console.log(this.state.category)
                })
             
        }
        else {
            console.log("for patient!")

            axios
                .post('http://localhost:5000/patient/add', doctor)
                .then((res) => {
                    console.log(res.status)
                    this.setState({
                        errors: 0,
                        category:'Patient',
                    })
                })
                .catch((error) => {
                    console.log("i am here")
                    console.log(error);
                    this.setState({
                        errors: 1,
                        category:'Patient',
                    })
                    console.log(this.state.errors)
                    console.log(this.state.category)
                })
        }


    }


    render() {
        return (
            <div className="outer">
                <div className="inner">

                    <form onSubmit={this.onSubmit}>
                        <h3>Register Yourself</h3>

                        <div className="form-group">
                            <label>First name</label>
                            <input type="text" className="form-control" placeholder="First name"
                                value={this.state.docFName}
                                onChange={this.onChangeDocFName}
                                required />
                        </div>

                        <div className="form-group">
                            <label>Last name</label>
                            <input type="text" className="form-control" placeholder="Last name"
                                value={this.state.docLName}
                                onChange={this.onChangeDocLName} 
                                required/>
                        </div>

                        <div className="form-group">
                            <label>Mobile Number </label>
                            <input type="tel" className="form-control" placeholder="Mobile Number email"
                                value={this.state.mobile}
                                onChange={this.onChangeMobile} 
                                required/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.onChangeEmail} 
                                required/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                required />
                        </div>

                        <div className="form-group radio">
                            <label style={{ margin: 10 }}>
                                <input type="radio" value="Patient" name="Category"
                                    onChange={this.onChangeCategory} 
                                    required/>
                                <span>Patient</span>
                            </label>
                            <label>
                                <input type="radio" value="Doctor" name="Category"
                                    onChange={this.onChangeCategory}
                                    checked />
                                <span>Doctor</span>
                            </label>
                        </div>
                       
                        {(this.state.errors === 1) ? <div style={{color:'red'}}>Some errors , check the fields , or try again later</div> : <div></div>}
                        

                        <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                        <p className="forgot-password text-right">
                            Already registered <a href="/login">log in?</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}