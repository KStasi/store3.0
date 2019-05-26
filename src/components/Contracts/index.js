import React, { Component } from 'react'

class Contracts extends Component {
    constructor(props) {
        super(props);
        props.changeHasBannerState();
    }

    render() {
        return (
            <div>
                Contracts
            </div>
        )
    }
}

export default Contracts;