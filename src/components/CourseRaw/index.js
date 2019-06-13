import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'

class CourseRaw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            request: this.props.request,
        }
    }

    formatDate = (date) => {
        return weekdays[date.getDay()] + ", " +
            date.getDate() + nth(date.getDate()) + " " +
            months[date.getMonth()] + " " +
            date.getFullYear();
    };
    
    render() {
        var entry;
        if (this.state.request._id % 2 === 0) {
            entry = (
                <div className="row cource-list-agile pt-4 my-4">
                    <div className="col-lg-7 agile-course-main">
                        <div className="w3ls-cource-first">
                            <img src="" alt="" className="img-fluid img-poiscour mx-auto d-block mt-2"></img>
                            <div className="px-md-5 px-4  pb-md-5 pb-4">
                                <h3 className="text-dark">
                                    {this.state.request.name}</h3>
                                <p className="mt-3 mb-4 pr-lg-5">
                                    {this.state.request.description}</p>
                                <ul className="list-unstyled text-capitalize">
                                    <li>
                                        <i className="fas fa-calendar-alt mr-3"></i>
                                        {new Date(parseInt(this.state.request.start)).toLocaleDateString() } -
                                        {new Date(parseInt(this.state.request.end)).toLocaleDateString() }
                                    </li>
                                    <li className="my-3">
                                        <i className="fas fa-clock mr-3"></i>
                                        {this.state.request.type}</li>
                                    <li>
                                        <i className="fas fa-lightbulb mr-3"></i>
                                        {this.state.request.topic}</li>
                                    <li className="my-3">
                                        <i className="fas fa-comments mr-3"></i>
                                        {this.state.request.tutor}</li>
                                    <li>
                                        <i className="fas fa-money-bill-alt mr-3"></i>
                                        {this.state.request.price}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 agile-course-main-2 mt-4">
                        <img src={this.state.request.url} alt="" className="img-fluid text-center cource-image"></img>
                    </div>
                    <div className="buttons-w3ls">
                        <a className="btn button-cour-w3ls text-white" href="course_details.html" role="button">Learn
                            More</a>
                        <a className="btn bg-dark text-white" href="form.html" role="button">Apply Now</a>
                    </div>
                </div>
            );
        }
        else {
            entry = (
                <div className="row cource-list-agile cource-list-agile-2 my-4">
                    <div className="col-lg-5 agile-course-main-3 mt-4">
                        <img src={this.state.request.url} alt="" className="img-fluid text-center cource-image"></img>
                    </div>
                    <div className="col-lg-7 agile-course-main text-right">
                        <div className="w3ls-cource-first">
                            <img src="" alt="" className="img-fluid img-poiscour mx-auto d-block mt-2"></img>
                            <div className="px-md-5 px-4  pb-md-5 pb-4">
                                <h3 className="text-dark">{this.state.request.name}</h3>
                                <p className="mt-3 mb-4 pl-lg-4">{this.state.request.description}</p>
                                <ul className="list-unstyled text-capitalize">
                                    <li>
                                        {new Date(parseInt(this.state.request.start)).toLocaleDateString() } -
                                        {new Date(parseInt(this.state.request.end)).toLocaleDateString() }
                                        <i className="fas fa-calendar-alt ml-3"></i>
                                    </li>
                                    <li className="my-3">{this.state.request.type}
                                        <i className="fas fa-clock ml-3"></i>
                                    </li>
                                    <li>{this.state.request.topic}
                                        <i className="fas fa-lightbulb ml-3"></i>
                                    </li>
                                    <li className="my-3">{this.state.request.tutor}
                                        <i className="fas fa-comments ml-3"></i>
                                    </li>
                                    <li>{this.state.request.price}
                                        <i className="fas fa-money-bill-alt ml-3"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="buttons-w3ls-2">
                        <a className="btn button-cour-w3ls text-white" href="course_details.html" role="button">Learn
                            More</a>
                        <a className="btn bg-dark text-white" href="form.html" role="button">Apply Now</a>
                    </div>
                </div>
            );
        }
        return (
            <div>
                {entry}
            </div>
        )
    }
}

var weekdays = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday",
    "Saturday"
];

var months = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

function nth(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

export default CourseRaw;