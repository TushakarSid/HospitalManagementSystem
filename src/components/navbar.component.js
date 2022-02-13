import React, { useContext , useState , useEffect} from 'react'
import UserContext from './UserContext'
import axios from 'axios'

import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from '../style/NavbarStyle'


const Navbar = () => {
  // const [baseEmail, setbaseEmail ] = useContext(Context);
  const {contextEmail, setContextEmail} = useContext(UserContext)
  const {contextCategory, setContextCategory} = useContext(UserContext)
  const {contextFname, setContextFname} = useContext(UserContext)
  const [x ,setX] = useState(contextEmail)
  const det = {
    email : x
  }
  
  const [Fname , setFname] = useState()
  
  useEffect(()=>{
    
    
    setX(localStorage.getItem('contextEmail'))
    axios
    .post('http://localhost:5000/doctor/getDetailsByEmail',det)
    .then((res) => {
      setFname(res.data.message)
    })
    .catch((error)=>{
    })
  
  })

  const logoutfunction = (e) =>{
    console.log("here")
    localStorage.removeItem('contextEmail')
    localStorage.removeItem('contextCategory')
    localStorage.removeItem('contextFname')
    setContextFname(undefined)
    setContextEmail(undefined)
    setContextCategory(undefined)
    setX(null)
  }
  return (
    <>
      <Nav>
        <NavLink to="/">
          <img
            style={styles.Icon}
            src="https://www.nitj.ac.in/physics/caneupa2020/images/logo_250.png"
            alt="logo"
          />
        </NavLink>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Bars />
          <NavMenu>
            <NavLink to="/list" activestyle>
              Appointments
            </NavLink>
            <NavLink to="/doctors" activestyle>
              Get an Appointment
            </NavLink>
            <NavLink to="/medicine" activestyle>
              Pharmacy
            </NavLink>
          </NavMenu>

          {
          
          (x === null)?(
          <NavBtn>
            <NavBtnLink to="/SignUp">Login / SignUp</NavBtnLink>
          </NavBtn>

          ):(
            <NavBtn>
            <NavLink style = {{paddingLeft: "43px"}} to="">
                <a value="actual value 1">{Fname}</a> 
                <a value="Logout" onClick ={logoutfunction}>&nbsp;Logout</a>

           
            </NavLink>
          </NavBtn>
          )}
        </div>
      </Nav>


    </>

  )
}

const styles = {
  Icon: {
    height: 70,
    marginRight: 20,
  },
}
// Navbar.contextType = Context
export default Navbar
