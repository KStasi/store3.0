const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://admin:admin@store3-uuoxs.mongodb.net/store?retryWrites=true&w=majority";
const url = "mongodb://localhost:27017";
const client = new MongoClient(url, {useNewUrlParser: true});
const dbName = "store";

async function getNextId(db, idValue){
    const collName = "counters";
    const collections = await db.collections();

    if (collections === [] || !collections.map(c => c.s.name).includes(collName)) {
        await db.createCollection(collName);
    }
    if (await db.collection(collName).findOne({_id: idValue}) === null) {
        await db.collection(collName).insertOne({_id: idValue, id:0});
    }

    var doc = await db.collection(collName).findOneAndUpdate(
        {_id: idValue },
        {$inc: {id:1}}
        );

    return doc.value.id;
}

module.exports.create = async (req, res) => {
    await client.connect();
    let events = client.db(dbName).collection("events");
    let event = {
        _id: await getNextId(client.db(dbName), 'events'),
        name: req.body.name,
        type: req.body.type,
        start: get_date_string(req.body.start, "start", true),
        end: get_date_string(req.body.end, "end", true),
        topic: req.body.topic,
        tutor: req.body.tutor,
        description: req.body.description,
        price: req.body.price,
    };
    let result = await events.insertOne(event);
    // console.log(result);
    res.json({ result: result['ops']});
};

module.exports.update = async (req, res) => {
    let event = {
        name: req.body.name,
        type: req.body.type,
        start: get_date_string(req.body.start, "start", true),
        end: get_date_string(req.body.end, "end", true),
        topic: req.body.topic,
        tutor: req.body.tutor,
        description: req.body.description,
        price: req.body.price,
    };
    await client.connect();
    let events = client.db(dbName).collection("events");
    let result = await events.findOneAndUpdate({_id: parseInt(req.body.id.toString())}, {$set: event});
    res.json({ result: result});
};

module.exports.show = async (req, res) => {
    await client.connect();
    const events = await client.db(dbName).collection("events");
    let result = await events.find({}).toArray();
    res.json({ result: result});
};

module.exports.showSingle = async (req, res) => {
    await client.connect();
    const events = await client.db(dbName).collection("events");
    let result = await events.findOne({_id: parseInt(req.body.id.toString())});
    res.json({ result: result});
};

function getFilter(req) {
    let event = {
        $and : []};
    if (req.body.name) {
        event.$and.push({ name: { $regex: `.*${req.body.name}.*` } });
    }
    if (req.body.type_1 || req.body.type_2 || req.body.type_3) {
        event.$and.push({ type: { $in: [req.body.type_1, req.body.type_2, req.body.type_3] } });
    }
    if (req.body.start_1 && req.body.start_2) {
        event.$and.push({ $and: [ { start: { $gre: req.body.start_1 } }, { start: { $lse: req.body.start_2 } } ] });
    }
    if (req.body.end_1 && req.body.end_2) {
        event.$and.push({ $and: [ { end: { $gre: req.body.end_1 } }, { end: { $lse: req.body.end_2 } } ] });
    }
    if (req.body.topic) {
        event.$and.push({ topic: { $regex: `.*${req.body.topic}.*` } });
    }
    if (req.body.tutor) {
        event.$and.push({ tutor: { $regex: `.*${req.body.tutor}.*` } });
    }
    if (req.body.description) {
        event.$and.push({ description: { $regex: `.*${req.body.description}.*` } });
    }
    if (req.body.price_1 && req.body.price_2) {
        event.$and.push({ $and: [ { price: { $gre: req.body.price_1 } }, { price: { $lse: req.body.price_2 } } ] });
    }
    return event;
}

module.exports.filter = async (req, res) => {
    await client.connect();
    const events = await client.db(dbName).collection("events");
    let filter = getFilter(req);
    let result = await events.find(filter).toArray();
    res.json({ result: result});
};

module.exports.destroy = async (req, res) => {
    await client.connect();
    const events = await client.db(dbName).collection("events");
    let result = await events.findOneAndDelete({_id: parseInt(req.body.id.toString())});
    res.json({ result: result});
};

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
