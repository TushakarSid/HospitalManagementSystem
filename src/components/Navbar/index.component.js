import React from 'react'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from './Navbarcomponents';

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink to="/">
                    <img style={styles.Icon}src="https://www.nitj.ac.in/physics/caneupa2020/images/logo_250.png" alt="logo" />
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="contact" activeStyle>
                        Contact us
                    </NavLink>
                    <NavLink to="doctors" activeStyle>
                        Our Doctors
                    </NavLink>
                    <NavLink to="medicine" activeStyle>
                        Medicine
                    </NavLink>
                </NavMenu>
            <NavBtn>
                <NavBtnLink to="/login">
                    Sign In
                </NavBtnLink>
            </NavBtn>
            </Nav>
        </>
    )
}


const styles = {
    Icon: {
        height: 70,
        marginRight: 20
    }
}

export default Navbar;

