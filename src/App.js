import React,{useState} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import UserContext from "./components/UserContext";
// import  { UserProvider } from './components/UserContext'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css'

import Mainbar from './components/navbar.component'

import Doctors from './components/doctors.component'
import AppointmentList from './components/appointment-list.component'
import EditAppointment from './components/edit-appointment.component'
import CreateAppointment from './components/create-appointment.component'

import Login from './components/login.component'
import SignUp from './components/signup.component'

const App = () => { 
  const [contextEmail ,setContextEmail] = useState()
  const [contextCategory ,setContextCategory] = useState()
  const [contextFname ,setContextFname] = useState()
  const value = {contextEmail , contextCategory, setContextEmail , contextCategory, contextFname ,setContextFname}
  return (
    <UserContext.Provider value = {value}>
      <Router>
        <div className="App">
          <Mainbar />
          <Route path="/doctors" component={Doctors}/>
          <Route path="/list" component={AppointmentList} />
          <Route path="/edit/:id" component={EditAppointment} />
          <Route path="/:doctorId/create" component={CreateAppointment} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </div>
      </Router>
    </UserContext.Provider>
  )

    // <Router>
    //   <div className="App">
    //     {/*<UserState>

    //     <Mainbar />*/}
    //     <Mainbar />
    //     <br />
    //     {/* <Route path="/" component={Mainbar} /> */}
    //         <Route path="/doctors" component={Doctors}/>
    //         <Route path="/list" component={AppointmentList}/>
    //         <Route path="/edit/:id" component={EditAppointment} />
    //         <Route path="/:doctorId/create" component={CreateAppointment} />
    //         <Route path="/login" component={Login} />
    //         <Route path="/signup" component={SignUp} />
    //     {/*</UserState>*/}

    //   </div>
    // </Router>
  // );
}
export default App
