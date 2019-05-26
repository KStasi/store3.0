import React, { Component } from 'react'
import About from "../About";
import Service from "../Service";
import News from "../News";

class Home extends Component {
    constructor(props) {
        super(props);
        props.changeHasBannerState();
    }
    render() {
        return (
            <div>
                <About/>
                <Service/>
                <News/>
            </div>
        )
    }
}

export default Home;