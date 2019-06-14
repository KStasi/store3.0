import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'
import LoginForm from "../LoginForm";

class Login extends Component {
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
                    <h1>Welcome!</h1>
                    <p className="mt-4 text-center">Enjoy our services!</p>
                </div>
            </div>
        ) :  (
            <div className="container py-lg-5 mt-sm-5 mt-3">
                <div className="w3ls-titles text-center mb-5">
                    <h1>Welcome</h1>
                    <p className="mt-4 text-center">Register or log in</p>
                </div>
                <div className="row align-items-center align-content-center">
                    <div className="col-md-6 position-relative m-auto">
                        <LoginForm setSendForm={this.setSendForm}/>
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

export default Login;