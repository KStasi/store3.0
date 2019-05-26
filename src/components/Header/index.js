import React, { Component } from 'react'
import NavBar from '../NavBar'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'


class Header extends Component {
    render() {
        return (
            <section className="innerbanner">
                <div className="nav-sec position-relative">
                    <NavBar/>
                </div>
            </section>
        )
    }
}

export default Header;