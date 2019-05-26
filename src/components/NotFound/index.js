import React, { Component } from 'react'

class NotFound extends Component {
    constructor(props) {
        super(props);
        props.changeHasBannerState();
    }

    render() {
        return (
            <div>
                Not Found
            </div>
        )
    }
}

export default NotFound;