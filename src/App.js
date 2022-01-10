import React ,{useContext}  from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import UserState ,{Context} from './components/UserState';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';

import Mainbar from "./components/navbar.component"
import Navbar from "./components/navbar.component"
import AppointmentList from "./components/appointment-list.component";
import EditAppointment from "./components/edit-appointment.component";
import CreateAppointment from "./components/create-appointment.component";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";


const  App = ()=> {
  return (

    <Router>
      <div className="App">
        <UserState>

            <Mainbar />
            <Route path="/list" component={AppointmentList}/>
            <Route path="/edit/:id" component={EditAppointment} />
            <Route path="/create" component={CreateAppointment} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
        </UserState>

      </div>
    </Router>
  );
}
export default App;
