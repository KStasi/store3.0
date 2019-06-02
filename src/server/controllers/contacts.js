const path = require("path");
const fs = require("fs");
var sqlite3 = require('sqlite3').verbose();
const createTableString = 'CREATE TABLE IF NOT EXISTS issues (\n' +
    '    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\n' +
    '    name TEXT NOT NULL,\n' +
    '    organization TEXT,\n' +
    '    type INTEGER NOT NULL,\n' +
    '    issue TEXT NOT NULL,\n' +
    '    file TEXT);';

module.exports.index = (req, res) => {
    let filePath = path.normalize(__dirname + "/../public/contact.html");
    res.sendFile(filePath);
};

module.exports.create = (req, res) => {
    if (req.file) {
        var tmp_path = req.file.path;
        var extention = req.file.originalname.substring(req.file.originalname.indexOf('.'));
        var file_name = Date.now();
        var target_path = './db/' + file_name + extention;
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);
        src.pipe(dest);
    }
    let db = createDB();
    db.serialize(function() {
        db.run(createTableString);
        let columns = 'name'
            + get_organization_string(req.body.organization, false)
            + ', type' + ', issue'
            + get_attachment_string(file_name, false);
        let values ="\"" + req.body.name + "\""
            + get_organization_string(req.body.organization, true)
            + get_type_string(req.body.type)
            + ', "' + req.body.issue  + "\""
            + get_attachment_string(file_name, true);
        db.run("INSERT INTO issues ("+ columns +") VALUES ("+ values+");");
    });

    closeDB(db);
    res.json({ result: 'success' });
};

function get_type_string(type) {
    switch (type)
    {
        case 'partnership':
            return ', ' + 1;
        case 'media':
            return ', ' + 2;
        default:
            return ', ' + 3;
    }
}

function get_organization_string(organization, specify) {
    if (organization.length > 0) {
        return (specify) ? (', \"' + organization + "\"") : ', organization';
    }
    return '';
}

function get_attachment_string(attachment, specify) {
    if (attachment) {
        return (specify) ? ', \"' + attachment + "\"" : ', file';
    }
    return '';
}

module.exports.update = (req, res) => {
    if (req.file) {
        var tmp_path = req.file.path;
        var extention = req.file.originalname.substring(req.file.originalname.indexOf('.'));
        var file_name = Date.now();
        var target_path = './db/' + file_name + extention;
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);
        src.pipe(dest);
    }
    let db = createDB();
    db.serialize(function() {
        db.run(createTableString);
        let columns = "name = \"" + req.body.name + "\""
            + get_organization_string(req.body.organization, false) + " = "
            + get_organization_string(req.body.organization, true).slice(1)
            + ', type = ' + get_type_string(req.body.type).slice(1)
            + ', issue = "' + req.body.issue  + "\"";
        db.run(`UPDATE issues SET ${columns} WHERE id=${req.params.id};`);
    });
    closeDB(db);
    res.json({ result: 'success'});
};

module.exports.show = (req, res) => {
    let db = createDB();
    db.serialize(function() {
        let contactRequests = [];
        db.run(createTableString);
        db.each("SELECT * FROM issues;", (err, row) => {
            contactRequests.push({id: row.id,
                name: row.name,
                type: row.type,
                organization: row.organization,
                issue: row.issue,
                file: row.file
            });
        }, () => {
            res.json({requests: contactRequests});
        });
    });
    closeDB(db);
};


module.exports.showSingle = (req, res) => {
    let db = createDB();
    db.serialize(function() {
        let contactRequests = [];
        db.run(createTableString);
        db.each(`SELECT * FROM issues WHERE id=${req.params.id}`, (err, row) => {
            contactRequests.push({id: row.id,
                name: row.name,
                type: row.type,
                organization: row.organization,
                issue: row.issue,
                file: row.file
            });
        }, () => {
            res.json({requests: contactRequests});
        });
    });
    closeDB(db);
};

module.exports.filter = (req, res) => {
    let db = createDB();
    db.serialize(function() {
        let contactRequests = [];
        db.run(createTableString);
        let filterString = (Object.keys(req.body).length > 0) ? "SELECT * FROM events WHERE" : "SELECT * FROM events ";
        Object.keys(req.body).forEach((key) => {
            filterString += " " + key + "=" +  getFilter(req.body[key], key) + " AND";
        });
        filterString = filterString.slice(0, -3);
        db.each(filterString, (err, row) => {
            contactRequests.push({id: row.id,
                name: row.name,
                type: row.type,
                organization: row.organization,
                issue: row.issue,
                file: row.file
            });
        }, () => {
            res.json({requests: contactRequests});
        });
    });
    closeDB(db);
};

module.exports.destroy = (req, res) => {
    let db = createDB();
    db.serialize(function() {
        db.run(createTableString);
        db.run(`DELETE FROM issues WHERE id=${req.params.id}`, (err, row) => {
            res.json({requests: row});
        });
    });
    closeDB(db);
};

function getFilter(value, key) {
    let stringsValue = ["name", "organization", "issue", "file"];
    return (stringsValue.includes(key)) ? "\"" + value + "\"" : value;
}

function createDB() {
    return new sqlite3.Database('./db/contact-forms.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
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