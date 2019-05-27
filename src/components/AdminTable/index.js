import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'
import ContactRaw from "../ContactRaw";

class AdminTable extends Component {
    constructor(props) {
        super(props);
        props.changeHasBannerState();
        this.state = {
            requests: this.props.requests,
        }
    }

    render() {
        return (
            <table class="offset-lg-1 offset-sm-0 col-lg-10 col-sm-12 offset-lg-1 offset-sm-0 table-bordered table-striped table-condensed cf">
                <thead class="cf">
                    <tr>
                        <th className="text-center">Id</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Organization</th>
                        <th className="text-center">Type</th>
                        <th className="text-center">Issue</th>
                        <th className="text-center">Attachment</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.requests.map((request, i) => {
                    return (<ContactRaw key={i} request={request}/>)
                })}
                </tbody>
            </table>
        )
    }
}

export default AdminTable;