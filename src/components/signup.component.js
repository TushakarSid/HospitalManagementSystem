import React, { Component, useState, useContext } from 'react'
import UserState, { Context } from './UserState'
import temporary from './temporary.component'
import axios from 'axios'


// const newState = {

//     email = email,
//     password = password
// }

 const SignUp = () => {
   /*  const [baseEmail, basePassword, setbaseEmail, setbasePassword] = useContext(Context); */

    const [docFName, setdocFName] = useState();
    const [docLName, setdocLName] = useState();
    const [mobile, setmobile] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [category, setcategory] = useState('Doctor');
    const [errors, seterrors] = useState();


    const onChangeDocFName = (e) => { setdocFName(e.target.value) }
    const onChangeDocLName = (e) => { setdocLName(e.target.value) }
    const onChangeMobile = (e) => { setmobile(e.target.value) }
    const onChangeEmail = (e) => { setemail(e.target.value) }
    const onChangePassword = (e) => { setpassword(e.target.value) }
    const onChangeCategory = (e) => { setcategory(e.target.value) }

    const onSubmit = (e) => {
        e.preventDefault()

        if (category == 'Doctor') {
            console.log('here')
            const doctor = {
                docFName: docFName,
                docLName: docLName,
                mobile: mobile,
                email: email,
                password: password,
            }

            axios
                .post('http://localhost:5000/doctor/add', doctor)
                .then((res) => {
                    console.log(res.status)
                    seterrors(0)
                    setcategory('Doctor')
                    //   setState({
                    //     errors: 0,
                    //     category: 'Doctor',
                    //   })
                })
                .catch((error) => {
                    console.log('i am here')
                    console.log(error)
                    seterrors(1)
                    setcategory('Doctor')
                    //   setState({
                    //     errors: 1,
                    //     category: 'Doctor',
                    //   })
                    console.log(errors)
                    console.log(category)
                })
            window.location.href = '/create'
        } else {
            console.log('for patient!')

            const patient = {
                PatFName: docFName,
                PatLName: docLName,
                mobile: mobile,
                email: email,
                password: password,
            }
            axios
                .post('http://localhost:5000/patient/add', patient)
                .then((res) => {
                    console.log(res.status)
                    seterrors(0)
                    setcategory('Patient')
                    //   setState({
                    //     errors: 0,
                    //     category: 'Patient',
                    //   })
                })
                .catch((error) => {
                    console.log('i am here')
                    console.log(error)
                    seterrors(1)
                    setcategory('Patient')
                    //   setState({
                    //     errors: 1,
                    //     category: 'Patient',
                    //   })
                    console.log(errors)
                    console.log(category)
                })
            window.location.href = '/create'
        }
    }

    return (
       
            
            <div className="outer">
                <div className="inner">
                    <form onSubmit={onSubmit}>
                        <h3>Register Yourself</h3>

                        <div className="form-group">
                            <label>First name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="First name"
                                value={docFName}
                                onChange={onChangeDocFName}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Last name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last name"
                                value={docLName}
                                onChange={onChangeDocLName}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Mobile Number </label>
                            <input
                                type="tel"
                                className="form-control"
                                placeholder="Mobile Number email"
                                value={mobile}
                                onChange={onChangeMobile}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={email}
                                onChange={onChangeEmail}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={onChangePassword}
                                required
                            />
                        </div>

                        <div className="form-group radio">
                            <label style={{ margin: 10 }}>
                                <input
                                    type="radio"
                                    value="Patient"
                                    name="Category"
                                    onChange={onChangeCategory}
                                    required
                                />
                                <span>Patient</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="Doctor"
                                    name="Category"
                                    onChange={onChangeCategory}
                                    checked
                                />
                                <span>Doctor</span>
                            </label>
                        </div>

                        {errors === 1 ? (
                            <div style={{ color: 'red' }}>
                                Some errors , check the fields , or try again later
                            </div>
                        ) : (
                            <div></div>
                        )}

                        <button type="submit" className="btn btn-dark btn-lg btn-block">
                            Register
                        </button>
                        <p className="forgot-password text-right">
                            Already registered <a href="/login">log in?</a>
                        </p>
                    </form>
                </div>
           </div>

               

    )


}

SignUp.contextType = Context
export default SignUp
