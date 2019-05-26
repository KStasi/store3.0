import React, { Component } from 'react'
import v404 from '../../images/404.mp4'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'

class NotFound extends Component {
    constructor(props) {
        super(props);
        props.changeHasBannerState();
    }

    render() {
        return (
            <section className="cont_w3">
                <div className="container">
                    <div className="row">
                        <div className="video-container">
                            <video className="z-depth-1" id="video-404" src={v404} autoPlay muted loop/>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default NotFound;