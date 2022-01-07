import React from 'react'
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './Navbarcomponents'

const Navbar = () => {
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
          <NavBtnLink to="/SignUp">Sign Up</NavBtnLink>
        </NavBtn>
      </Nav>
      <h1 >main page </h1>

    </>
  )
}

const styles = {
  Icon: {
    height: 70,
    marginRight: 20,
  },
}

export default Navbar
