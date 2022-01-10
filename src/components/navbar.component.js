import React, { useContext } from 'react'
import { Context } from './UserState'
import UserState from './UserState'
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from '../style/NavbarStyle'

const newState = {
  email: 'dfghjk@ghjk.hbjhk',
  password: 'ghgujhbk',
}
const Navbar = () => {
  const [baseEmail, basePassword, setbaseEmail, setbasePassword] = useContext(Context);
  return (
    <userState>
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
            <NavLink to="contact" activestyle>
              Contact us
            </NavLink>
            <NavLink to="doctors" activestyle>
              Our Doctors
            </NavLink>
            <NavLink to="medicine" activestyle>
              Pharmacy
            </NavLink>
          </NavMenu>

          <NavBtn>
            <NavBtnLink to="/SignUp">Login / SignUp</NavBtnLink>
          </NavBtn>
        </div>
      </Nav>

      {/* {(setbaseEmail('bn,m'), setbasePassword('jbj,kjj'))} */}
     
      <div>
        <p>
          email :{baseEmail}
        </p>
        <p>
          password :{basePassword}
        </p>

      </div> 
    </userState>
  )
}

const styles = {
  Icon: {
    height: 70,
    marginRight: 20,
  },
}
Navbar.contextType = Context
export default Navbar
