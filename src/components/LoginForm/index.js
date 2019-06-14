import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'

class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {login: '', password: ''};
        this.setSendForm = props.setSendForm;
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    async onSubmit(event){
        event.preventDefault();
        return false;
    }

    async onClick(event){
        event.preventDefault();
        const xhr = new XMLHttpRequest();
        var eventLabel = this.state;
        if (event.target.innerHTML === "Login") {
            xhr.open('POST', `http://localhost:8080/login`, true);
        } else {
            xhr.open('POST', 'http://localhost:8080/registr', true);
        }
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var data = new URLSearchParams();
        for (var key in eventLabel) {
            data.append(key, eventLabel[key]);
        }
        xhr.send(data);

        this.setState({ isLoading: true });
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return false

            }
            if (xhr.status !== 200) {
                console.log(xhr.status + ': ' + xhr.statusText)
            } else {
                this.setSendForm();
                this.setState({
                    data: JSON.parse(xhr.response).result,
                    isLoading: false,
                })
            }
        };
        return false;
    }

    onChangeLogin(event) {
        this.setState({login: event.target.value});
    }

    onChangePassword(event){
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <form id="contact-form" name="myForm" className="form" onSubmit={this.onSubmit}
                  method="POST">
                <div className="form-group">
                    <label className="form-label" id="loginLabel" htmlFor="login"></label>
                    <input type="text" className="form-control" id="login" name="login"
                           placeholder="Login" tabIndex="1"  value={this.state.login}
                           onChange={this.onChangeLogin} required/>
                </div>
                <div className="form-group">
                    <label className="form-label" id="passwordLabel" htmlFor="password"></label>
                    <input type="text" className="form-control" id="password" name="password"
                           placeholder="Password" tabIndex="2" value={this.state.password}
                           onChange={this.onChangePassword} required/>
                </div>
                <div className="text-center mt-5">
                    <button type="submit" className="serv_bottom btn btn-border btn-lg w-auto m-3" onClick={this.onClick}>Login
                    </button>
                    <button type="submit" className="serv_bottom btn btn-border btn-lg w-auto m-3" onClick={this.onClick}>Sign up
                    </button>
                </div>
            </form>
        )
    }
}

export default EventForm;