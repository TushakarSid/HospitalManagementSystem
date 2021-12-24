import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Mainbar from "./components/Navbar/index.component"
import Navbar from "./components/navbar.component"
import AppointmentList from "./components/appointment-list.component";
import EditAppointment from "./components/edit-appointment.component";
import CreateAppointment from "./components/create-appointment.component";
import CreateDoctor from "./components/create-doctor.component";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Mainbar />
      <br/>
      {/* <Route path="/" component={Mainbar} /> */}
      <Route path="/list" component={AppointmentList}/>
      <Route path="/edit/:id" component={EditAppointment} />
      <Route path="/create" component={CreateAppointment} />
      <Route path="/user" component={CreateDoctor} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      </div>
    </Router>
  );
}

export default App;
