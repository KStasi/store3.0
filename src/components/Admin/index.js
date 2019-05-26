import React, { Component } from 'react'

class Admin extends Component {
    constructor(props) {
        super(props);
        props.changeHasBannerState();
    }

    render() {
        return (
            <div>
                Admin
            </div>
        )
    }
}

export default Admin;