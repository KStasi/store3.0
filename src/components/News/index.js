import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'
import mountains7 from '../../images/mountains7.jpg'
import mountains4 from '../../images/mountains4.jpg'
import mountains5 from '../../images/mountains5.png'

class News extends Component {
    render() {
        return (
            <section className="news py-5" id="news">
                <div className="container py-lg-5">
                    <h3>Chose your approach</h3>
                    <p className="mt-4 text-center">There are a number of ways to get to the same point</p>
                    <div className="row news-grids py-lg-5 mt-3 text-center">
                        <div className="col-md-4 newsgrid1">
                            <img src={mountains7} alt="news" className="img-fluid"/>
                                <h4 className="mt-4">Effective Courses</h4>
                                <p className="mt-4">Whatever you are, be a good one.<br/><br/></p>
                                <a className="btn btn-primary mt-lg-4 mt-3 agile-link-bnr1" href="#" data-type="1"
                                   role="button" methods="post">More</a>
                        </div>
                        <div className="col-md-4 mt-md-0 mt-5 newsgrid2">
                            <img src={mountains4} alt="news" className="img-fluid"/>
                                <h4 className=" mt-4">Homely Consultations</h4>
                                <p className="mt-4">Everything you can imagine is real.<br/><br/></p>
                                <a className="btn btn-primary mt-lg-4 mt-3 agile-link-bnr1" href="#" data-type="2"
                                   role="button">More</a>
                        </div>
                        <div className="col-md-4  newsgrid3">
                            <img src={mountains5} alt="news" className="img-fluid"/>
                                <h4 className=" mt-4">Cozy Meetings</h4>
                                <p className="mt-4">Change the game, don’t let the game change you.</p>
                                <a className="btn btn-primary mt-lg-4 mt-3 agile-link-bnr1" href="#" data-type="3"
                                   role="button">More</a>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default News;