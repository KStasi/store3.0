import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'
import './nouislider.css'
import noUiSlider from './nouislider';

var weekdays = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday",
    "Saturday"
];

var months = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

var timeFormat = {
    to: function (value) {
        return formatTimestamp(value);
    },
    from: function (value) {
        return formatDate(new Date(+Number(value).toFixed()));
    }
};

var priceFormat = {
    to: function (value) {
        return parseInt(value);
    },
    from: function (value) {
        return parseInt(value);
    }
};

function changeDate(values, handle, dateValues, placeHolder) {
    dateValues[handle].value = parseInt(values[handle]);
    placeHolder.innerHTML = values.map((date) => {return formatDate(new Date(+Number(date).toFixed()))}).join(' - ');
}

function timestamp(str) {
    return new Date(str).getTime();
}

function nth(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

function formatDate(date) {
    return weekdays[date.getDay()] + ", " +
        date.getDate() + nth(date.getDate()) + " " +
        months[date.getMonth()] + " " +
        date.getFullYear();
}

function formatTimestamp(date) {
    let dateArray = date.split(" ");
    return Date.setFullYear(dateArray[3], months.indexOf(dateArray[2]), parseInt(dateArray[1].slice(0, -2)));
}

class FilterBlock extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            changeEventsState: this.props.changeEventsState
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        this.state.changeEventsState();
    }

    componentDidMount() {
        var start = document.getElementById('start');
        var end = document.getElementById('end');
        var price = document.getElementById('price');
        var startPlaceholder = document.getElementById('startdate-value');
        var endPlaceholder = document.getElementById('enddate-value');
        var pricePlaceholder = document.getElementById('price-value');
        var startValues = [
            document.getElementById('start_1'),
            document.getElementById('start_2')
        ];

        var endValues = [
            document.getElementById('end_1'),
            document.getElementById('end_2')
        ];

        var priceValues = [
            document.getElementById('price_1'),
            document.getElementById('price_2')
        ];
        noUiSlider.create(start, {
            range: {
                min:  new Date().getTime(),
                max: timestamp('2020')
            },
            behaviour: 'drag-tap',
            connect: true,
            step: 7 * 24 * 60 * 60 * 1000,
            start: [new Date().getTime(), timestamp('2020')],
        });

        noUiSlider.create(end, {
            range: {
                min:  new Date().getTime(),
                max: timestamp('2020')
            },
            behaviour: 'drag-tap',
            connect: true,
            step: 7 * 24 * 60 * 60 * 1000,
            start: [new Date().getTime(), timestamp('2020')],
        });

        noUiSlider.create(price, {
            start: [10, 400],
            connect: true,
            behaviour: 'drag-tap',
            format: priceFormat,
            range: {
                'min': 0,
                'max': 1000
            }
        });

        start.noUiSlider.on('update', (values, handle) => {changeDate(values, handle, startValues, startPlaceholder);});
        end.noUiSlider.on('update', (values, handle) => {changeDate(values, handle, endValues, endPlaceholder);});
        price.noUiSlider.on('update', (values, handle) => {
            priceValues[handle].value = parseInt(values[handle]);
            pricePlaceholder.innerHTML = values.join(' - ');
        });
    }

    render() {
        return (
            <div className="container py-lg-5 mt-sm-5 mt-3 filter-container">
                <form id="filter-form" onSubmit={this.handleSubmit} name="filter-form" method="post" className="px-4">
                    <div className="filter-block">
                        <div className="filter-box filter-group inline right">
                            <div className="filter-box">
                                <input type="text" id="name" name="name"/>
                                <label htmlFor="name">Search by name</label>
                            </div>
                            <div className="filter-box">
                                <input type="text" id="topic" name="topic"/>
                                <label htmlFor="topic">Search by topic</label>
                            </div>
                            <div className="filter-box">
                                <input type="text" id="tutor" name="tutor"/>
                                <label htmlFor="tutor">Search by tutor</label>
                            </div>
                            <div className="filter-box">
                                <input type="text" id="description" name="description"/>
                                <label htmlFor="description">Search by description</label>
                            </div>
                        </div>
                        <div className="filter-group inline">
                            <label>Choose type</label>
                            <div>
                                <input type="checkbox" id="course" name="type_1" defaultChecked/>
                                <label htmlFor="course">Courses</label>
                            </div>
                            <div>
                                <input type="checkbox" id="meeting" name="type_2"/>
                                <label htmlFor="meeting">Meeting</label>
                            </div>
                            <div>
                                <input type="checkbox" id="consultation" name="type_3"/>
                                <label htmlFor="consultation">Consultations</label>
                            </div>
                            <div>
                                <input type="checkbox" id="miscellaneous" name="type_4"/>
                                <label htmlFor="miscellaneous">Miscellaneous</label>
                            </div>
                        </div>
                    </div>
                    <div className="filter-block">
                        <div className="filter-group">
                            <div className="filter-box">
                                <div id="start" className="noUi-horizontal"></div>
                                <input id="start_1" type="text" className="time display-none" name="start_1"/>
                                <input id="start_2" type="text" className="time display-none" name="start_2"/>
                                <br/>
                                <label htmlFor="start">
                                    <div>Start date: <span id="startdate-value"></span></div>
                                </label>
                            </div>
                            <div className="filter-box">
                                <div id="end" className="noUi-horizontal"></div>
                                <input id="end_1" type="text" className="time display-none" name="end_1"/>
                                <input id="end_2" type="text" className="time display-none" name="end_2"/>
                                <br/>
                                <label htmlFor="end">
                                    <div>End date: <span id="enddate-value"></span></div>
                                </label>
                            </div>
                            <div className="filter-box">
                                <div id="price" className="noUi-horizontal"></div>
                                <input id="price_1" type="number" className="price display-none" name="price_1"/>
                                <input id="price_2" type="number" className="price display-none" name="price_2"/>
                                <br/>
                                <label htmlFor="price">
                                    <div>Price: <span id="price-value"></span></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <input className="small-button" type="submit" name="button" value="Ok"/>
                </form>
            </div>
        )
    }
}

export default FilterBlock;