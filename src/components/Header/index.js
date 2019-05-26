import React, { Component } from 'react'
import NavBar from '../NavBar'
import Banner from '../Banner'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasBanner: this.props.hasBanner,
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.hasBanner !== this.state.hasBanner)
    }

    render() {
        this.setState({hasBanner : this.props.hasBanner});
        const banner = this.state.hasBanner && <Banner/>;
        const sectionClass = (this.state.hasBanner)? "main-banner" : "innerbanner";
        return (
            <section className={sectionClass}>
                <div className="nav-sec position-relative">
                    <NavBar/>
                </div>
                {banner}
            </section>
        )
    }
}

export default Header;