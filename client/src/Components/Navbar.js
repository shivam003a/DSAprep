import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi'

const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }
    const hideMenu = () => {
        setShowMenu(false)
    }

    return (
        <>
            <nav className="navbar">
                <div className="left">
                    DSAprep
                </div>
                <div className={showMenu ? "responsive-menu right" : "right"}>
                    <ul>
                        <li><NavLink to="/" className="x" onClick={hideMenu}>Home</NavLink></li>
                        <li><NavLink to="/practice" className="x" onClick={hideMenu}>Practice</NavLink></li>
                        <li><NavLink to="/login" className="x" onClick={hideMenu}>Login</NavLink></li>
                        <li><NavLink to="/register" className="x" onClick={hideMenu}>Register</NavLink></li>
                        <li><NavLink to="/logout" className="x" onClick={hideMenu}>Logout</NavLink></li>
                    </ul>
                </div>
                <div className="ham-burger">
                    <NavLink onClick={toggleMenu}><GiHamburgerMenu size={30} /></NavLink>
                </div>
            </nav>
        </>
    )
}

export default Navbar;