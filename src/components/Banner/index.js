import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'
import {Link} from "react-router-dom";

class Banner extends Component {
    render() {
        return (
            <div className="container">
                <div className="baner-text text-center">
                    <span className="fa fa-files-o mb-4 tp_bt"></span>
                    <h1 className="mx-auto">Invest In Your Mind</h1>
                    <p className="mx-auto mt-4 pt-2">Immersion into the profession for a week: find yourself or change
                        the vector! </p>
                    <Link className="btn btn-primary mt-lg-5 mt-3 agile-link-bnr scroll" to="/" role="button">Learn
                        More</Link>
                    <div className="mt-5 btmarw">
                        <Link className="scroll" to="/" role="button"><span
                            className="fa fa-long-arrow-down bt-ar"></span></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Banner;