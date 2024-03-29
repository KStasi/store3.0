import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'
import EventForm from "../EventForm";

class Event extends Component {
    constructor(props) {
        super(props);
        props.changeHasBannerState();
        this.setSendForm = this.setSendForm.bind(this);
        this.state = {isLogged: false};
    }

    setSendForm() {
        this.setState({isLogged: true});
    }

    render() {
        var entry = (this.state.isLogged) ? (
            <div className="container py-lg-5 mt-sm-5 mt-3">
                <div className="w3ls-titles text-center mb-5">
                    <h1>Event Created!</h1>
                    <p className="mt-4 text-center">Thank you!</p>
                </div>
            </div>
        ) :  (
            <div className="container py-lg-5 mt-sm-5 mt-3">
                <div className="w3ls-titles text-center mb-5">
                    <h1>Initiate Event </h1>
                    <p className="mt-4 text-center">Describe your idea and make this world better</p>
                </div>
                <div className="row  py-sm-3">
                    <div className="col-md-6 mt-md-0 " id="left-image">;
                    </div>
                    <div className="col-md-6">
                        <EventForm setSendForm={this.setSendForm}/>
                    </div>
                </div>
            </div>
        );
        return (
            <section className="cont_w3">
                {entry}
            </section>
        )
    }
}

export default Event;