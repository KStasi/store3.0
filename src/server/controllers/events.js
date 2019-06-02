const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const sqlite3 = require('sqlite3').verbose();
const createTableString = 'CREATE TABLE IF NOT EXISTS events (\n' +
    '    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\n' +
    '    name TEXT NOT NULL,\n' +
    '    type INTEGER NOT NULL,\n' +
    '    start INTEGER,\n' +
    '    end INTEGER,\n' +
    '    topic TEXT NOT NULL,\n' +
    '    tutor TEXT NOT NULL,\n' +
    '    description TEXT NOT NULL,\n' +
    '    price REAL NOT NULL);';

module.exports.create = (req, res) => {
    let db = createDB();
    db.serialize(function() {
        db.run(createTableString);
        let columns = `name, type, ${get_date_string(req.body.start, "start", false)} ${get_date_string(req.body.end, "end", false)} topic, tutor, description, price`;
        let values = "\"" + req.body.name + "\","
            + "\"" + req.body.type + "\","
            + get_date_string(req.body.start, "start", true)
            + get_date_string(req.body.end, "end", true)
            + "\"" + req.body.topic + "\","
            + "\"" + req.body.tutor + "\","
            + "\"" + req.body.description + "\","
            + "\"" + req.body.price + "\"";
        db.run("INSERT INTO events ("+ columns +") VALUES ("+ values+");");
    });
    closeDB(db);
    res.json({ result: 'success'});
};

module.exports.update = (req, res) => {
    let db = createDB();
    db.serialize(function() {
        db.run(createTableString);
        let columns = "name = \"" + req.body.name + "\", "
            + "type = \"" + req.body.type + "\", "
            + "start = " + get_date_string(req.body.start, "start", true)
            + "end = " + get_date_string(req.body.end, "end", true)
            + "topic = \"" + req.body.topic + "\", "
            + "tutor = \"" + req.body.tutor + "\", "
            + "description = \"" + req.body.description + "\", "
            + "price = \"" + req.body.price + "\"";
        db.run(`UPDATE events SET ${columns} WHERE id=${req.params.id};`);
    });
    closeDB(db);
    res.json({ result: 'success'});
};

module.exports.show = (req, res) => {
    let db = createDB();
    db.serialize(function() {
        let eventsRequests = [];
        db.run(createTableString);
        db.each("SELECT * FROM events;", (err, row) => {
            rowsToObjectsArray(eventsRequests, row, err);
        }, () => {
            res.json({requests: eventsRequests});
        });
    });
    closeDB(db);
};

module.exports.showSingle = (req, res) => {
    let db = createDB();
    db.serialize(function() {
        let eventsRequests = [];
        db.run(createTableString);
        db.each(`SELECT * FROM events WHERE id=${req.params.id}`, (err, row) => {
            rowsToObjectsArray(eventsRequests, row, err);
        }, () => {
            res.json({requests: eventsRequests});
        });
    });
    closeDB(db);
};

module.exports.filter = (req, res) => {
    let db = createDB();
    db.serialize(function() {
        let eventsRequests = [];
        db.run(createTableString);

        let keys = Object.keys(req.body);
        let keysCounter = keys.length;
        let betweenValue = ["start","end","price"];
        let filterString = (keysCounter > 0) ? "SELECT * FROM events WHERE" : "SELECT * FROM events ";

        keys.forEach((key) => {
            let filterStringPart = getFilter(req.body[key], key);
            if (filterStringPart.length > 0) {
                filterString += " " + key +  filterStringPart + " AND";
                keysCounter--;
            }
        });

        if (keys.length > 0 && keysCounter === 0) {
            filterString = filterString.slice(0, -3);
        }

        if (keysCounter > 0) {
            let filterStringPart = setType(keys);
            keysCounter -= parseInt(filterStringPart.length / 8);
            filterString += filterStringPart;
        }

        if (keysCounter > 0) {
            betweenValue.forEach((key) => {
                let filterStringPart = setBetweenValues(req.body, key);
                if (filterStringPart.length > 0) {
                    if (keys.length !== keysCounter && filterString.slice(filterString.length - 4, -1) !== "AND") {
                        filterString += " AND ";
                    } else {
                        filterString += " ";
                    }
                    keysCounter -= filterStringPart.includes("BETWEEN") ? 2 : 1;
                    filterString += filterStringPart;
                }
            });
        }

        db.each(filterString, (err, row) => {
            rowsToObjectsArray(eventsRequests, row, err);
        }, () => {
            res.json({requests: eventsRequests});
        });
    });
    closeDB(db);
};

module.exports.destroy = (req, res) => {
    let db = createDB();
    db.serialize(function() {
        db.run(createTableString);
        db.run(`DELETE FROM events WHERE id=${req.params.id}`, (err, row) => {
            if (!err) {
                res.json({ result: 'success'});
            } else {
                res.json({ result: 'fail'});
            }
            res.end();
        });
    });
    closeDB(db);
};

function createDB() {
    return new sqlite3.Database('./public/db/events-forms.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
    });
}

function closeDB(db) {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

function getFilter(value, key) {
    let stringsValue = ["name", "topic", "tutor", "description"];
    let numValue = ["id"];
    if (stringsValue.includes(key) && value.toString().length > 0) {
        return " LIKE \"%" + value + "%\"";
    } else if (numValue.includes(key) && value.toString().length > 0) {
        return "=" + value;
    } else {
        return "";
    }
}

function rowsToObjectsArray(requests, row, err) {
    if (!err) {
        requests.push({
            id: row.id,
            name: row.name,
            type: getType(row.type),
            start: formatDate(row.start),
            end: formatDate(row.end),
            topic: row.topic,
            tutor: row.tutor,
            description: row.description,
            price: row.price,
            url: `https://www.gravatar.com/avatar/${crypto.createHash('md5').update(row.id + row.name)
                .digest("hex")}.jpg?s=200&d=identicon`
        })
    }
}

function setType(keys) {
    let rangeValue = ["type_1", "type_2", "type_3"];
    let orCounter = keys.filter((key) => rangeValue.includes(key)).length - 1;
    let parenthesis = orCounter > 0;
    let typeString = (parenthesis)? " (" : " ";
    //let typeString = " ";
    if (keys.includes("type_1")) {
        typeString += "type = 1" + ((orCounter-- > 0) ? " OR " : "");
    }
    if (keys.includes("type_2")) {
        typeString += "type = 2" + ((orCounter-- > 0) ? " OR " : "");
    }
    if (keys.includes("type_3")) {
        typeString += "type = 3";
    }
    typeString += (parenthesis)? ")" : "";
    return typeString;
}

function setBetweenValues(dictionary, key) {
    let keys = Object.keys(dictionary);
    if (keys.includes(key + "_1")
        && keys.includes(key + "_2")
        && dictionary[key + "_1"].toString().length > 0
        && dictionary[key + "_2"].toString().length > 0) {
        return `${key} BETWEEN ${dictionary[key + "_1"]} AND ${dictionary[key + "_2"]}`
    }
    if (keys.includes(key + "_1")
        && dictionary[key + "_1"].toString().length > 0) {
        return `${key} >= ${dictionary[key + "_1"]}`
    }
    if (keys.includes(key + "_2")
        && dictionary[key + "_2"].toString().length > 0) {
        return `${key} <= ${dictionary[key + "_2"]}`
    }
    return "";
}

function get_date_string(data, type, specify) {
    if (data) {
        return (specify) ? ('\"' + dateToTimestamp(data) + "\", ") : (type + ', ');
    }
    return '';
}

function dateToTimestamp(date) {
    date = date.split("-");
    var dateFormat = date[1]+"/"+date[2]+"/"+date[0];
    return new Date(dateFormat).getTime();
}

function getType(type) {
    var events = ["Course", "Meeting", "Consultation", "Miscellaneous"];
    return events[type - 1];
}

function formatDate(date) {
    try {
        date = new Date(date);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!

        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return  dd + '/' + mm + '/' + yyyy;
    } catch(e) {
        return "type-error";
    }
}