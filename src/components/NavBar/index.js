import React, { Component } from 'react'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'

class NavBar extends Component {
    render() {
        return (
            <ul id="menu">
                <li>
                    <input id="navbar-state" type="checkbox" name="menu"/>
                    <label className="menulist" htmlFor="navbar-state">&nbsp;</label>
                    <ul className="submenu">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/events">Events</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/card">Card</Link></li>
                        <li><Link to="/contacts">Contacts</Link></li>
                    </ul>
                </li>
            </ul>
        )
    }
}

export default NavBar;