import React, { Component } from 'react'
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'

class Footer extends Component {
    render() {
        return (
            <section className="foot-top pt-lg-5">
                <div className="container py-5">
                    <h2 className="text-white">We create opportunities</h2>
                    <p className="mt-4 text-center text-white">Don’t stop when you’re tired. Stop when you’re done.</p>
                    <div className="row inner-conent-w3ls mt-5">
                        <div className="col-md-6 inner-conent-lft">
                            <Link to="/" className="banner-button2 btn">READ MORE </Link>
                        </div>
                        <div className="col-md-6 inner-conent-rgt">
                            <Link to="/" className="banner-button btn">LEARN MORE </Link>
                        </div>
                    </div>
                </div>
                <ul className="social_section_1info text-center py-5">
                    <li><a href="#"><span className="fa fa-facebook"></span></a></li>
                    <li><a href="#"><span className="fa fa-twitter"></span></a></li>
                    <li><a href="#"><span className="fa fa-google-plus"></span></a></li>
                    <li><a href="#"><span className="fa fa-linkedin"></span></a></li>
                </ul>
            </section>
        )
    }
}

export default Footer;