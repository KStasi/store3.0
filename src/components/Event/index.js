import React, { Component } from 'react'

class Event extends Component {
    constructor(props) {
        super(props);
        props.changeHasBannerState();
    }

    render() {
        return (
            <div>
                Event
            </div>
        )
    }
}

export default Event;