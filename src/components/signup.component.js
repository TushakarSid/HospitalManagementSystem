import React, { Component } from "react";
import axios from 'axios';


export default class SignUp extends Component {

    constructor(props) {
        super(props)

        /* this.onChangeDocFName = this.onChangeDocFName.bind(this)
        this.onChangeDocLName = this.onChangeDocLName.bind(this)
        this.onChangeMobile = this.onChangeMobile.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeCategory = this.onChangeCategory.bind(this)*/
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            docFName: '',
            docLName: '',
            mobile: '',
            email: '',
            password: '',
            category: ''
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
        // const { name, value } = e.target;
        this.setState({
            category: e.target.value,
        })
    }

    

    onSubmit(e) {
        e.preventDefault()

        const doctor = {
            docFName: this.state.docFName,
            docLName: this.state.docLName,
            mobile: this.state.mobile,
            email: this.state.email,
            password: this.state.password
        }

        if (this.state.category === "Doctor") {
            console.log("here")

            axios
                .post('http://localhost:5000/doctor/add', doctor)
                .then((res) => console.log(res.data))
                .catch((error) => {
                    console.log(error);
                })


             this.setState({
                docFName: '',
                docLName: '',
                mobile: '',
                email: '',
                password: '',
                category: ''
            }) 

            //console.log(this.state.category)
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
                        <h3>Register Yourself</h3>

                        <div className="form-group">
                            <label>First name</label>
                            <input type="text" className="form-control" placeholder="First name"
                                value={this.state.docFName}
                                onChange={this.onChangeDocFName} />
                        </div>

                        <div className="form-group">
                            <label>Last name</label>
                            <input type="text" className="form-control" placeholder="Last name"
                                value={this.state.docLName}
                                onChange={this.onChangeDocLName} />
                        </div>

                        <div className="form-group">
                            <label>Mobile Number </label>
                            <input type="tel" className="form-control" placeholder="Mobile Number email"
                                value={this.state.mobile}
                                onChange={this.onChangeMobile} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.onChangeEmail} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password"
                                value={this.state.password}
                                onChange={this.onChangePassword} />
                        </div>

                        <div className="form-group radio">
                            <label style={{ margin: 10 }}>
                                <input type="radio" value="Patient" name="Category"
                                    onChange={this.onChangeCategory} />
                                <span>Patient</span>
                            </label>
                            <label>
                                <input type="radio" value="Doctor" name="Category"
                                    onChange={this.onChangeCategory} />
                                <span>Doctor</span>
                            </label>
                        </div>

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