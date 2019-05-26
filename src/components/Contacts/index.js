import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'
import ContactForm from '../ContactForm'

class Contracts extends Component {
    constructor(props) {
        super(props);
        props.changeHasBannerState();
    }
    render() {
        return (
            <section className="cont_w3">
                <div className="container py-lg-5 mt-sm-5 mt-3">
                    <div className="w3ls-titles text-center mb-5">
                        <h1>Contact Us </h1>
                        <p className="mt-4 text-center">Just say hello <a href="mailto:theinformedchoince@gmail.com">via
                            email.</a> Or left you contacts to get call back.</p>
                    </div>
                    <div className="row  py-sm-3">
                        <div className="col-md-6">
                            <ContactForm/>
                        </div>
                        <div className="col-md-6 mt-md-0 " id="bottom-img">
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Contracts;