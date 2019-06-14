import React, { Component } from 'react';
import FilterBlock from "../FilterBlock";
import Goods from "../Goods";

class Events extends Component {
    constructor(props) {
        super(props);
        props.changeHasBannerState();
        this.state = {
            data: [],
            isLoading: false
        };
        this.changeEventsState = this.changeEventsState.bind(this);
        this.setRender = this.setRender.bind(this);
    }

    changeEventsState() {
        this.setState({
            data: [],
            isLoading: false
        });

        var filter = {
            name: document.getElementById('name').value,
            type_1: document.getElementById('course').checked ? "Course" : null,
            type_2: document.getElementById('meeting').checked ? "Meeting" : null,
            type_3: document.getElementById('consultation').checked ? "Consultation" : null,
            type_4: document.getElementById('miscellaneous').checked ? "Miscellaneous" : null,
            start_1: document.getElementById('start_1').value,
            start_2: document.getElementById('start_2').value,
            end_1: document.getElementById('end_1').value,
            end_2: document.getElementById('end_2').value,
            topic: document.getElementById('topic').value,
            tutor: document.getElementById('tutor').value,
            description: document.getElementById('description').value,
            price_1: document.getElementById('price_1').value,
            price_2: document.getElementById('price_2').value,
        };
        this.setFilter(filter);
        return false;
    }

    setFilter(filter) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/events/filter', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var data = new URLSearchParams();
        for (var key in filter) {
            data.append(key, filter[key]);
        }
        xhr.send(data);
        this.setState({ isLoading: true });

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return false
            }

            if (xhr.status !== 200) {
                console.log(xhr.status + ': ' + xhr.statusText)
            } else {
                this.setState({
                    data: JSON.parse(xhr.response).result,
                    isLoading: false,
                })
            }
        }
    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/events/', true);
        xhr.send();
        this.setState({ isLoading: true });

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return false
            }

            if (xhr.status !== 200) {
                console.log(xhr.status + ': ' + xhr.statusText)
            } else {
                this.setState({
                    data: JSON.parse(xhr.response).result,
                    isLoading: false,
                })
            }
        };
    }

    setRender() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/events/', true);
        xhr.send();
        this.setState({ isLoading: true });

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return false
            }

            if (xhr.status !== 200) {
                console.log(xhr.status + ': ' + xhr.statusText)
            } else {
                this.setState({
                    data: JSON.parse(xhr.response).result,
                    isLoading: false,
                })
            }
        };
    }

    renderCourses() {
        const { data, isLoading } = this.state;
        if (isLoading) {
            return (
                <div className="course-w3ls py-5">
                    <div className="container py-xl-5 py-lg-3">
                        <div> Nothing found...</div>
                    </div>
                </div>
            );
        } else {
            return <Goods requests={data} setRender={this.setRender}/>;
        }
    }

    render() {
        return (
            <section className="cont_w3">
                <div>
                    <FilterBlock changeEventsState={this.changeEventsState}/>
                    {this.renderCourses()}
                </div>
            </section>
        )
    }
}

export default Events;