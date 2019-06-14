import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'

class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = (props.state) ? props.state : {name: '', start: '', end: '', topic: '', tutor: '', type: '', price: '', description: ''};
        this.setSendForm = props.setSendForm;
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeStart = this.onChangeStart.bind(this);
        this.onChangeTopic = this.onChangeTopic.bind(this);
        this.onChangeEnd = this.onChangeEnd.bind(this);
        this.onChangeTutor = this.onChangeTutor.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(event){
        event.preventDefault();
        const xhr = new XMLHttpRequest();
        var eventLabel = this.state;
        if (this.state._id) {
            xhr.open('PUT', `http://localhost:8080/events/edit/${this.state._id}`, true);
        } else {
            xhr.open('POST', 'http://localhost:8080/events/create', true);
        }
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var data = new URLSearchParams();
        for (var key in eventLabel) {
            data.append(key, eventLabel[key]);
        }
        if (this.state._id) {
            data.append("id", this.state._id);
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
                this.setSendForm();
                this.setState({
                    data: JSON.parse(xhr.response).result,
                    isLoading: false,
                })
            }
        };
        return false;
    }

    onChangeStart(event){
        this.setState({start: event.target.value});
    }

    onChangeName(event) {
        this.setState({name: event.target.value});
    }

    onChangeEnd(event) {
        this.setState({end: event.target.value});
    }

    onChangeTutor(event){
        this.setState({tutor: event.target.value});
    }

    onChangeType(event){
        this.setState({type: this.getType(event.target.value)});
    }

    onChangeTopic(event){
        this.setState({topic: event.target.value});
    }

    onChangePrice(event){
        this.setState({price: event.target.value});
    }

    onChangeDescription(event){
        this.setState({description: event.target.value});
    }

    getType(type) {
        var types = {
            "1": "Course",
            "2": "Meeting",
            "3": "Consultation",
            "4": "Miscellaneous"
        };
      return types[type];
    };

    render() {
        return (
            <form id="contact-form" name="myForm" className="form" onSubmit={this.onSubmit}
                  method="POST">
                <div className="form-group">
                    <label className="form-label" id="nameLabel" htmlFor="name"></label>
                    <input type="text" className="form-control" id="name" name="name"
                           placeholder="Event name" tabIndex="1"  value={this.state.name}
                           onChange={this.onChangeName} required/>
                </div>
                <div className="form-group">
                    <label className="form-label" id="startLabel" htmlFor="start"></label>
                    <input type="date" className="form-control" id="start" name="start"
                           placeholder="Start date" tabIndex="1" value={this.state.start}
                           onChange={this.onChangeStart} required/>
                </div>
                <div className="form-group">
                    <label className="form-label" id="endLabel" htmlFor="name"></label>
                    <input type="date" className="form-control" id="end" name="end"
                           placeholder="End date" tabIndex="1" value={this.state.end}
                           onChange={this.onChangeEnd} required/>
                </div>
                <div className="form-group">
                    <label className="form-label" id="topicLabel" htmlFor="topic"></label>
                    <input type="text" className="form-control" id="topic" name="topic"
                           placeholder="Topic" tabIndex="2" value={this.state.topic}
                           onChange={this.onChangeTopic} required/>
                </div>
                <div className="form-group">
                    <label className="form-label" id="tutorLabel" htmlFor="tutor"></label>
                    <input type="text" className="form-control" id="tutor" name="tutor"
                           placeholder="Tutor" tabIndex="2" value={this.state.tutor}
                           onChange={this.onChangeTutor} required/>
                </div>
                <div className="form-group">
                    <label className="form-label" id="typeLabel" htmlFor="type"></label>
                    <select name="type" className="form-control" id="type" title="type" tabIndex="3"
                            value={this.state.type} onChange={this.onChangeType} required>
                        <option value="1">Course</option>
                        <option value="2">Event</option>
                        <option value="3">Consultation</option>
                        <option value="4">Miscellaneous</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label" id="descriptionLabel" htmlFor="description"></label>
                    <textarea rows="6" cols="60" name="description" className="form-control"
                              id="description" placeholder="Description" tabIndex="4"
                              value={this.state.description} onChange={this.onChangeDescription} required></textarea>
                </div>
                <div className="form-group">
                    <label className="form-label" id="priceLabel" htmlFor="price"></label>
                    <input type="number" className="form-control" id="price" name="price"
                           placeholder="Price in y.e." tabIndex="2" value={this.state.price}
                           onChange={this.onChangePrice} required/>
                </div>
                <div className="text-center mt-5">
                    <button type="submit" className="serv_bottom btn btn-border btn-lg w-100">Add
                    </button>
                </div>
            </form>
        )
    }
}

export default EventForm;