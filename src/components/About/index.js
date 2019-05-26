import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import mountains2 from '../../images/mountains2.jpg'
import './styles.css'

class About extends Component {
    render() {
        return (
            <section className="banner-bottom py-5" id="about">
                <div className="container py-lg-5">
                    <div className="banner-top row middle-grids">
                        <div className="col-lg-6 advantage-grid-info">
                            <div className="advantage_left">
                                <h3>Get right knowledge, make the right choice</h3>
                                <p className="mt-4">UChoice helps school-leaving students to chose their future job.
                                    We provide offline practice courses which allow to deep in and test the profession.
                                    UCoice contains a huge database of career-related information.</p>
                                <p className="mt-4">
                                    Apply for learning, teaching and editing content. Join curses, share your knowledge
                                    or ask about professional support.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 advantage-grid-info1">
                            <div className="advantage_left2 text-center">
                                <img src={mountains2} className="img-fluid" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default About;