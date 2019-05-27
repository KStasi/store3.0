import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'
import AdminVideo from "../AdminVideo";
import AdminTable from "../AdminTable";

class Admin extends Component {
    constructor(props) {
        super(props);
        props.changeHasBannerState();
        this.state = {
            requests: this.props.requests,
        }
    }

    render() {
        var entrails = (this.state.requests.length) ?
            (
                <div id="no-more-tables">
                    <AdminTable requests={this.state.requests}/>
                </div>
            ) :
            (
                <AdminVideo/>
            );
        return (
            <section>
                <div className="container-fluid py-5 align-content-center">
                    <div className="row-fluid">
                        {entrails}
                    </div>
                </div>
            </section>
        )
    }
}

export default Admin;