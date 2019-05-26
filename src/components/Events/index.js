import React, { Component } from 'react'

class Events extends Component {
    constructor(props) {
        super(props);
        props.changeHasBannerState();
    }
    render() {
        return (
            <div>
                Events
            </div>
        )
    }
}

export default Events;