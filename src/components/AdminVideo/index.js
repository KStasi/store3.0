import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'
import noresponse from '../../images/noresponse.mp4'

class AdminVideo extends Component {
    render() {
        return (
            <div>
                <video id="video-noresponse" src={noresponse} autoPlay muted loop></video>
                <h1 className="centered text-center">No requests. At all.</h1>
            </div>
        )
    }
}

export default AdminVideo;