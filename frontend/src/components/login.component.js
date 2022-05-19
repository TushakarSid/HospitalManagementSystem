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
          window.location.href = '/list'
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
            window.location.href = '/'

          }
        })
        .catch((error) => {
          console.log(error);
        })

    }


  }

    return (
      <div style={{ display: 'flex', backgroundColor: 'white' }}>
            <nav className='w3-sidebar w3-hide-medium w3-hide-small' style={{ width: '40%' }}>
                <div className='bgimg'>
                    <img style={{ width: "607.67px", height: "796px" }}
                        src="https://s3-ap-southeast-1.amazonaws.com/site.uploads/image/2022/05/41831652988280-699.jpg" alt="" srcset="" />
                </div>
            </nav>
          <div className="outer" style={{margin: '8% 1% 1% 6%'}}>
            <div className="inner" style={{margin:'0% 0% !important'}}>
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
      </div>
    )
}

export default Login