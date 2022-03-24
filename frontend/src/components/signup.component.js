import React, { Component, useState, useContext  } from 'react'
import UserContext  from './UserContext'

import axios from 'axios'



const SignUp = () => {
    // const [baseEmail , setbaseEmail] = useContext(Context);
    const {contextEmail ,setContextEmail}  = useContext(UserContext)
    const {contextCategory ,setContextCategory}  = useContext(UserContext)
    const {contextFname ,setContextFname}  = useContext(UserContext)
    const [docFName, setdocFName] = useState();
    const [docLName, setdocLName] = useState();
    const [mobile, setmobile] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [category, setcategory] = useState('Doctor');
    const [errors, seterrors] = useState();
    const [unRegistered, setUnRegistered] = useState(0);
    const [pic, setPic] = useState();


    const onChangeDocFName = (e) => { setdocFName(e.target.value) }
    const onChangeDocLName = (e) => { setdocLName(e.target.value) }
    const onChangeMobile = (e) => { setmobile(e.target.value) }
    const onChangeEmail = (e) => {
         setemail(e.target.value) 
        }
    const onChangePassword = (e) => { 
        setpassword(e.target.value) 
    }
    const onChangeCategory = (e) => { setcategory(e.target.value) }

    const postDetails =(pics)=>{

        const data =new FormData();
        data.append('file' , pics)
        data.append('upload_preset' ,'hospital')
        data.append('cloud_name' ,'dnthkai57')
        fetch("https://api.cloudinary.com/v1_1/dnthkai57/image/upload",{
          method:"post",
          body: data,
        }).then((res) =>res.json().then((data) =>{
          console.log(data.url.toString())
          setPic(data.url.toString());
        }))
      }

    const onSubmit = (e) => {
        e.preventDefault()

        if (category === 'Doctor') {
            const doctor = {
                docFName: docFName,
                docLName: docLName,
                mobile: mobile,
                email: email,
                password: password,
                pic :pic
            }

            axios
                .post('http://localhost:5000/doctor/add', doctor)
                .then((res) => {
                    seterrors(0)
                    setcategory('Doctor')
                    if (res.data.message === "Email already in Use") {
                        console.log("tttttttt")
                        setUnRegistered(2)
                      }
                    else if (res.data.message === "Mobile Number Already Registered") {
                        console.log("tttttttt")
                        setUnRegistered(3)
                      }
                    else{
                        localStorage.setItem('contextEmail', email)
                        localStorage.setItem('contextCategory', category)
                        setContextEmail(email)
                        setContextCategory(category)
                        // setbaseEmail(email)
                          window.location.href = '/'
                      }
                })
                .catch((error) => {

                    seterrors(1)
                    setcategory('Doctor')
                    console.log(errors)
                    console.log(category)
                })
        } else {
            console.log('for patient!')

            const patient = {
                PatFName: docFName,
                PatLName: docLName,
                mobile: mobile,
                email: email,
                password: password,
                pic :pic
            }
            axios
                .post('http://localhost:5000/patient/add', patient)
                .then((res) => {
                    console.log(res.status)
                    seterrors(0)
                    setcategory('Patient')
                    localStorage.setItem('contextEmail', email)
                    localStorage.setItem('contextCategory', category)
                    setContextEmail(email)
                    setContextCategory(category)
                    window.location.href = '/'

                })
                .catch((error) => {
                    console.log('i am here')
                    console.log(error)
                    seterrors(1)
                    setcategory('Patient')
                    console.log(errors)
                    console.log(category)
                })
            }
    }

    return (

        <>
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

                        {(unRegistered == 2)?(<div style={{ color: 'red' }}>Email already in Use</div>):(<div></div>)}
                        {(unRegistered == 3)?(<div style={{ color: 'red' }}>Mobile Number Already Registered</div>):(<div></div>)}
                        
                        <label for="myfile">Select a file:</label>
                        <input type="file" id="myfile" name="myfile"
                            onChange={(e) => postDetails(e.target.files[0])}
                        ></input>
                        <button type="submit" className="btn btn-dark btn-lg btn-block">
                            Register
                        </button>
                        <p className="forgot-password text-right">
                            Already registered <a href="/login">log in?</a>
                        </p>
                    </form>
                </div>
           </div>

                
        </>
    )


}

// SignUp.contextType = Context
export default SignUp
