import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'
import CourseRaw from "../CourseRaw";

class Goods extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: this.props.requests,
        }
    }

    render() {
        var entrails = (this.state.requests && this.state.requests.length) ?
            (
                <div className="course-w3ls py-5">
                    <div className="container py-xl-5 py-lg-3">
                        {this.state.requests.map((request, i) => {
                            return (<CourseRaw key={i} request={request}/>)
                        })}
                    </div>
                </div>
            ) :
            (
                <div className="course-w3ls py-5">
                    <div className="container py-xl-5 py-lg-3">
                        <div> Nothing found...</div>
                    </div>
                </div>
            );
        return (
            <section>
                {entrails}
            </section>
        )
    }
}

export default Goods;