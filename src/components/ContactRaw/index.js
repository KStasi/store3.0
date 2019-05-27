import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'

class ContactRaw extends Component {
    constructor(props) {
        super(props);
        props.changeHasBannerState();
        this.state = {
            request: this.props.request,
        }
    }
    
    render() {
        var src, image;
        if (this.state.request.file) {
            src = "../../db/" + this.state.request.file + ".png";
            image = (<img className="text-center attachment-image" src={src} alt="image"/>)
        }
        return (
            <tr>
                <td className="text-center" data-title="Id">{this.state.request.id}</td>
                <td className="text-center" data-title="Name">{this.state.request.name}</td>
                <td className="text-center" data-title="Organization">{this.state.request.organization}</td>
                <td className="text-center" data-title="Type">{this.state.request.type}</td>
                <td className="text-center" data-title="Issue">{this.state.request.issue}</td>
                <td className="text-center" data-title="Attachment" className="align-content-center text-center">
                    {image}
                </td>
                <td data-title="Action" className="text-center">
                    <a className='btn btn-info btn-xs' onClick='edit(<%-JSON.stringify(this.state.request)})' href="#">
                        <span className="glyphicon glyphicon-edit"></span> Edit
                    </a>
                    <a onClick="remove({this.state.request.id})" href="#" className="btn btn-danger btn-xs">
                        <span className="glyphicon glyphicon-remove"></span> Del
                    </a>
                </td>
            </tr>
        )
    }
}

export default ContactRaw;