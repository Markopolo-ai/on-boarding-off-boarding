const cors = require('cors');

exports.handler = async function(event, context, callback) {

    event.use(cors());
    console.log("event: ", event);
    console.log("context: ", context);
    console.log("callback: ", callback);

    callback()
}