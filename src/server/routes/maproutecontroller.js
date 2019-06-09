var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended: false});
var multer = require('multer');
var upload = multer({ dest: 'db/'});

module.exports.mapRoute = (app, prefix) => {
    prefix = "/" + prefix;

    let prefixObj = require("../controllers" + prefix);

    app.get(prefix + "/", prefixObj.show);

    app.post(prefix + "/show/:id", prefixObj.showSingle);

    app.post(prefix + "/filter", prefixObj.filter);

    app.post(prefix + "/create", urlencodedParser, upload.single('attachment'), prefixObj.create);

    app.put(prefix + "/edit/:id", urlencodedParser, upload.single('attachment'), prefixObj.update);

    app.delete(prefix + "/delete/:id", urlencodedParser, prefixObj.destroy);
};