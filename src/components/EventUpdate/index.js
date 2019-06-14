import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'
import EventForm from "../EventForm";

class EventUpdate extends Component {
    constructor(props) {
        super(props);
        props.changeHasBannerState();
        this.setSendForm = this.setSendForm.bind(this);
        this.state = {
            isLogged: false,
            data: [],
            isLoading: false,
            id: props.match.params.id
        };
    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `http://localhost:8080/events/show/${this.state.id}`, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var data = new URLSearchParams();
        data.append("id", this.state.id);
        xhr.send(data);
        this.setState({ isLoading: true });

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return false
            }

            if (xhr.status !== 200) {
                console.log(xhr.status + ': ' + xhr.statusText)
            } else {
                this.setState({
                    data: JSON.parse(xhr.response).result,
                    isLoading: false,
                })
            }
        };
    }

    setSendForm() {
        this.setState({isLogged: true});
    }

    render() {
        var entry = (this.state.isLogged) ? (
            <div className="container py-lg-5 mt-sm-5 mt-3">
                <div className="w3ls-titles text-center mb-5">
                    <h1>Event Updated!</h1>
                    <p className="mt-4 text-center">Thank you!</p>
                </div>
            </div>
        ) :  (
            <div className="container py-lg-5 mt-sm-5 mt-3">
                <div className="w3ls-titles text-center mb-5">
                    <h1>Update Event </h1>
                    <p className="mt-4 text-center">Describe your idea and make this world better</p>
                </div>
                <div className="row  py-sm-3">
                    <div className="col-md-6 mt-md-0 " id="left-image">;
                    </div>
                    <div className="col-md-6">
                        <EventForm state={this.state.data} setSendForm={this.setSendForm}/>
                    </div>
                </div>
            </div>
        );

        return (
            <section className="cont_w3">
                {(this.state.isLoading) ?
                    (<div className="container py-lg-5 mt-sm-5 mt-3">
                        <div className="w3ls-titles text-center mb-5">
                            <h1>Loading...</h1>
                            <p className="mt-4 text-center">Thank you!</p>
                        </div>
                    </div>)
                    :
                    entry
                }
            </section>
        )
    }
}

export default EventUpdate;