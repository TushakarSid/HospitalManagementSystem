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
  const [patient_id , set_patient_id] = useState()
  const [pic , setPic] = useState()
  
  useEffect(()=>{
    setX(localStorage.getItem('contextEmail'))
    axios
    .post('http://localhost:5000/doctor/getDetailsByEmail',det)
    .then((res) => {
      setFname(res.data.docFname)
      setPic(res.data.pic)
    })
    .catch((error)=>{
    })
    
    console.log(localStorage.getItem('contextEmail'))
    
    if(localStorage.getItem('contextCategory') == 'Patient' && patient_id == undefined){

      axios
      .get(`http://localhost:5000/patient/getIdByEmail/${localStorage.getItem('contextEmail')}`)
      .then((res) => {
        console.log(res.data)
        set_patient_id(res.data)
      })
      .catch((error)=>{
      })
    }
  
  } , [patient_id])

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
        <h5  style={{    color: 'white',    display: 'flex',     marginTop: '17px',}}>Dispensary Management System</h5>
        <div style={{ display: 'flex'}}>
          <Bars />
          <NavMenu>

            {(localStorage.getItem("contextCategory") == "Doctor")?<NavLink to="/list" activestyle>Appointments</NavLink>:<></>}
            {(localStorage.getItem("contextCategory") == "Patient")?<NavLink to="/doctors" activestyle>Get an Appointment</NavLink>:<></>}
            {(patient_id != undefined)?<NavLink to={`/${patient_id}/history`} activestyle>Previous Appointments</NavLink>:<></>}
            {/* <NavLink to="/add_drugs" activestyle>
              Pharmacy
            </NavLink> */}
          </NavMenu>

          {
          
          (x === null)?(
          <NavBtn>
            <NavBtnLink to="/SignUp">Login / SignUp</NavBtnLink>
          </NavBtn>

          ):(
            <NavBtn>
            <NavLink  to="">
                <img src={pic} style={{ width: "50px",borderRadius: "45px"}} alt=""/>
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
