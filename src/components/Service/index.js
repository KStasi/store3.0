import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'

class Service extends Component {
    render() {
        return (
            <section className="slide-wrapper py-5" id="service">
                <div className="container py-lg-5">
                    <div className="services">
                        <div className="row service_w3top">
                            <div className="col-lg-6 ser-lt text-center">
                                <ul>
                                    <li><span className="fa fa-cog"></span></li>
                                    <li><span className="fa fa-code"></span></li>
                                    <li><span className="fa fa-copy"></span></li>
                                    <li><span className="fa fa-cog"></span></li>
                                    <li><span className="fa fa-code"></span></li>
                                    <li><span className="fa fa-copy"></span></li>
                                </ul>
                            </div>
                            <div className="col-lg-6 ser-rgt">
                                <h3>Your dream is closer</h3>
                                <p className="mt-4">We aim to deliver you to your dream. Everybody was born for
                                    happiness. We build your bright happy future.</p>
                                <p className="mt-4">Through testing the whole Universe of professions and opening new
                                    areas we tend to find own place for every single student.</p>
                                <p className="mt-4">Make few steps and find your career benchmark right now. It's your
                                    life and your decisions!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Service;