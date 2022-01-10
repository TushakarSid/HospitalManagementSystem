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

        <div style={{display:'flex', justifyContent:'space-between'}}>


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
