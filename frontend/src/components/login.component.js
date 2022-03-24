import React, {useState , useContext, useEffect} from 'react'
import { FaWindows } from 'react-icons/fa'
import axios from 'axios'
import UserContext  from './UserContext'
import Axios from 'axios'


const Login = () => {
  const {contextEmail ,setContextEmail}  = useContext(UserContext)
  const {contextCategory ,setContextCategory}  = useContext(UserContext)
  const {contextFname ,setContextFname}  = useContext(UserContext)
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [unRegistered, setUnRegistered] = useState('0');
  const [category, setCategory] = useState();
  const [Fname, setFname] = useState();

  const onChangeEmail = (e) => { setemail(e.target.value)}
  const onChangePassword = (e) => { setpassword(e.target.value)}
  const onChangeCategory = (e) => { setCategory(e.target.value)}


  

  const onSubmit = (e) => {
    e.preventDefault()

    const details = {
      email: email,
      password: password,
    }

   
    if (category === "Doctor") {

      axios
        .post('http://localhost:5000/doctor/comparePasswordByEmail/', details)
        .then((res) => {

          if (res.data.message === "Register Yourself") {
            setUnRegistered('1')
          }
          else if(res.data.message === "Passwords do not match"){
            setUnRegistered('2')
          }
          else {
            localStorage.setItem('contextEmail', email)
            localStorage.setItem('contextCategory', category)
            localStorage.setItem('contextFname', Fname)
            setContextEmail(email)
            setContextCategory(category)
            setContextFname(Fname)
          }
          window.location.href = '/'
        })
        .catch((error) => {
          console.log(error);
        })

    }
    else if(category === "Patient"){
      console.log("for patient!")

      axios
        .post('http://localhost:5000/patient/comparePasswordByEmail/', details)
        .then((res) => {

          if (res.data.message === "Register Yourself!") {
            setUnRegistered('1')
          }
          else if (res.data.message === "Passwords do not match") {
            setUnRegistered('2')
          }
          else {
            localStorage.setItem('contextEmail', email)
            localStorage.setItem('contextCategory', category)
            localStorage.setItem('contextFname', Fname)
            setContextEmail(email)
            setContextCategory(category)
            setContextFname(Fname)
            // window.location.href = '/'

          }
        })
        .catch((error) => {
          console.log(error);
        })

    }


  }

    return (
      <div className="outer">
        <div className="inner">
          <form onSubmit={onSubmit}>
            <h3>Log in</h3>


            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
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
                onChange={onChangePassword}
                required


              />
            </div>
            {<div className="form-group radio">
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
                />
                <span>Doctor</span>
              </label>
            </div>}

            {(unRegistered === '1') ? <div style={{ color: 'Red' }}> Register Yourself </div> : <div></div>}
            {(unRegistered === '2') ? <div style={{ color: 'Red' }}> Wrong Password </div> : <div></div>}

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

export default Login